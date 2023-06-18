from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer,AddCartItemSerializer,UpdateCartItemSerializer
from apps.cart.models import CartItem,Cart

from rest_framework.views import APIView

from rest_framework.response import Response


class CartItemView(APIView):
    model=CartItem

    def get(self, request):
      user = request.user
      cart = Cart.objects.get(user=user)
      cart_items = CartItem.objects.filter(cart_id=cart.id, product__state=True)
      serializer = CartItemSerializer(cart_items, many=True)
      return Response(serializer.data)
    
    def post(self,request):
      serializer = AddCartItemSerializer(data=request.data, context={'request': request})
      if serializer.is_valid():
          cart_item = serializer.save()
          cart_items = CartItem.objects.filter(cart=cart_item.cart, product__state=True)
          serializer = CartItemSerializer(cart_items, many=True)
          return Response(serializer.data)
      else:
          return Response(serializer.errors, status=400)

    def patch(self, request, cart_item_id):
      user = request.user

      try:
          cart_item = CartItem.objects.get(id=cart_item_id, cart__user=user)
      except CartItem.DoesNotExist:
          return Response({'error': 'El producto no existe en el carrito.'}, status=400)

      serializer = UpdateCartItemSerializer(data=request.data)
      if serializer.is_valid():
          quantity = serializer.validated_data['quantity']
          cart_item.quantity = quantity
          cart_item.save()
          return Response({'message': 'La cantidad del producto se actualizó correctamente.'})
      else:
          return Response(serializer.errors, status=400)
      
    def delete(self, request, cart_item_id=None):
        user = request.user

        # Verificar si se proporciona un cart_item_id
        if cart_item_id:
            try:
                cart_item = CartItem.objects.get(id=cart_item_id, cart__user=user)
            except CartItem.DoesNotExist:
                return Response({'error': 'El producto no existe en el carrito.'}, status=400)

            # Eliminar el item específico del carrito
            cart_item.delete()
            return Response({'message': 'El producto se eliminó del carrito correctamente.'})

        # Eliminar todos los items del carrito
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({'error': 'El carrito no existe.'}, status=400)

        cart.items.all().delete()
        return Response({'message': 'Se eliminaron todos los items del carrito correctamente.'})