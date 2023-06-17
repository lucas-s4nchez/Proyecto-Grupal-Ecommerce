from apps.order.api.serializers.order_serializers import OrderSerializer,UpdateOrderStatusSerializer
from apps.order.models import Order,OrderItem
from apps.cart.models import CartItem

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


# class OrderViewSet(viewsets.ModelViewSet):
#     http_method_names = ["get", "patch", "post", "delete", "options", "head"]
#     permission_classes = [IsAuthenticated]
#     serializer_class = OrderSerializer
#     queryset = Order.objects.all()

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return CreateOrderSerializer
#         elif self.request.method == 'PATCH':
#             return UpdateOrderSerializer
#         return OrderSerializer
    
#     def get_queryset(self):
#         user = self.request.user
#         if user.is_staff:
#             return Order.objects.all()
#         return Order.objects.filter(owner=user)
    
#     def get_serializer_context(self):
#         return {"user_id":self.request.user.id}

class OrderView(APIView):
    Model=Order

    def get(self, request):
        user = request.user
        if user.is_staff:
            # Si el usuario es administrador, obtener todas las órdenes
            orders = Order.objects.all()
        else:
            # Si el usuario es normal, obtener solo sus órdenes
            orders = Order.objects.filter(owner=user)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        cart_id = request.data.get('cart_id')

        # Verificar si hay ítems en el carrito
        cart_items_exist = CartItem.objects.filter(cart_id=cart_id).exists()
        if not cart_items_exist:
            return Response({'error': 'No hay ítems en el carrito para generar la orden.'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear una nueva orden
        order = Order.objects.create(owner=request.user)

        # Crear instancias de OrderItem para cada item en el carrito
        cartitems = CartItem.objects.filter(cart_id = cart_id)
        orderitems = [OrderItem(order=order, product=item.product, quantity = item.quantity)for item in cartitems]
        OrderItem.objects.bulk_create(orderitems)

        # Opcionalmente, eliminar los items del carrito
        CartItem.objects.filter(cart_id=cart_id).delete()

        # Serializar y devolver la orden creada
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=201)
    
    def patch(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'La orden no existe.'}, status=400)

        serializer = UpdateOrderStatusSerializer(order, data=request.data, partial=True)
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