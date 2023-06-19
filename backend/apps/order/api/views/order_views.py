from django.conf import settings
from apps.order.api.serializers.order_serializers import OrderSerializer, UpdateOrderStatusSerializer
from apps.order.models import Order, OrderItem
from apps.cart.models import CartItem, Cart
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt

import mercadopago


class OrderView(APIView):
    Model = Order

    def get(self, request, order_id=None):
        user = request.user
        if user.is_staff:
            # Si el usuario es administrador y se proporciona un order_id, obtener la orden específica
            if order_id is not None:
                order = get_object_or_404(Order, id=order_id)
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            # Si el usuario es administrador, y no se proporciona un order_id, obtener todas las órdenes
            orders = Order.objects.all()
        else:
            # Si el usuario es normal y se proporciona un order_id, obtener la orden específica del usuario
            if order_id is not None:
                order = get_object_or_404(Order, id=order_id, owner=user)
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            # Si el usuario es normal y no se proporciona un order_id, obtener solo sus órdenes
            orders = Order.objects.filter(owner=user)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        cart_id = request.data.get('cart_id')

        # Verificar si el carrito existe
        cart = get_object_or_404(Cart, id=cart_id)

        # Verificar si hay ítems en el carrito
        cart_items_exist = CartItem.objects.filter(cart_id=cart_id).exists()
        if not cart_items_exist:
            return Response({'error': 'No hay ítems en el carrito para generar la orden.'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear una nueva orden
        order = Order.objects.create(owner=request.user)

        # Crear instancias de OrderItem para cada item en el carrito
        cartitems = CartItem.objects.filter(cart_id=cart_id)
        orderitems = [OrderItem(
            order=order, product=item.product, quantity=item.quantity)for item in cartitems]
        OrderItem.objects.bulk_create(orderitems)

        # Generar la preferencia de pago con Mercado Pago
        sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
        preference_data = {
            "items": [],
            # Referencia personalizada, en este caso el ID de la orden y el carrito
            'external_reference':  f'order_id: {str(order.id)}, cart_id: {str(cart_id)}',
            'back_urls': {
                'success': 'http://localhost:4200/payment/success',
                'failure': 'http://localhost:4200/payment/failure',
                'pending': 'http://localhost:4200/payment/pending',
            },
            'notification_url': 'https://6981-168-196-24-185.sa.ngrok.io/api/v1/order/payment/webhook',
            'installments': 1,  # Configuración para el pago de una sola cuota
        }

        # Agregar los items del carrito a la preferencia de pago
        for item in cartitems:
            preference_data["items"].append({
                "title": item.product.name,
                "quantity": item.quantity,
                # Moneda (puedes ajustarlo según tu caso)
                "currency_id": "ARS",
                "unit_price": float(item.product.price),  # Precio unitario
            })

        try:
            # Crea la preferencia de pago
            preference_response = sdk.preference().create(preference_data)
            preference = preference_response["response"]

            # Serializar y devolver la orden y la url de mercado pago
            data = {
                'order': OrderSerializer(order).data,
                'init_point': preference['init_point'],
            }

            return Response(data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': 'Ocurrió un error al generar la preferencia de pago.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'La orden no existe.'}, status=400)

        serializer = UpdateOrderStatusSerializer(
            order, data=request.data, partial=True)
        if serializer.is_valid():
            status = serializer.validated_data.get('status')
            if status is not None:
                order.status = status
                order.save()
                return Response({'message': f'El estado de la orden se actualizó correctamente.'})
            else:
                return Response({'error': 'El campo "status" es requerido.'}, status=400)
        else:
            return Response(serializer.errors, status=400)


@csrf_exempt
def mercadopago_webhook(request):
    # Procesa los datos del webhook
    payment_type = request.GET.get('type')
    # si el parametro de la url "type=payment" existe
    if payment_type == 'payment':
        try:
            # obtengo el id del pago desde el parametro de la url "data.id"
            payment_id = request.GET.get('data.id')
            mp = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
            # mediante el id del pago obtengo toda la información de pago
            data = mp.payment().get(payment_id=payment_id)
            # si el ststus del pago fue '200' y tambien fue aprobado
            if data['status'] == 200 and data['response']['status'] == 'approved':
                # 'external_reference' contiene el id de la orden y el carrito
                external_reference = data['response']['external_reference']
                # Buscar el índice de inicio y fin de order_id y cart_id
                start_order_id = external_reference.find(
                    'order_id:') + len('order_id:')
                end_order_id = external_reference.find(',', start_order_id)
                start_cart_id = external_reference.find(
                    'cart_id:') + len('cart_id:')
                end_cart_id = len(external_reference)
                # Extraer los valores de order_id y cart_id
                order_id = external_reference[start_order_id:end_order_id].strip(
                )
                cart_id = external_reference[start_cart_id:end_cart_id].strip()
                try:
                    # Actualizar el estado de pago de la orden
                    orden = Order.objects.get(id=order_id)
                    orden.paid = True
                    orden.save()
                    # Eliminar los items del carrito
                    cartitems = CartItem.objects.filter(cart_id=cart_id)
                    cartitems.delete()
                except Order.DoesNotExist:
                    print('La orden no existe')
                    return HttpResponseNotFound('La orden no existe')
            return HttpResponse(status=200)
        except Exception as e:
            # Maneja otras excepciones
            print('Error:', e)
            return HttpResponse(status=400)
    return HttpResponse()


def success(request):
    print('success')
    return HttpResponse({'message': 'success'}, status=200)
