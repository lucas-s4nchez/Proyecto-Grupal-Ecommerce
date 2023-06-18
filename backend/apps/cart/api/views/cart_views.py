from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.cart.models import Cart
from apps.cart.api.serializers.cart_serializers import CartSerializer

class CartView(APIView):
    model=Cart

    def get(self, request):
      user = request.user
      try:
        cart = Cart.objects.get(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
      except Cart.DoesNotExist:
          return Response({'error': 'El usuario no tiene un carrito.'}, status=status.HTTP_404_NOT_FOUND)