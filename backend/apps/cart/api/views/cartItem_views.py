from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer
from apps.cart.models import CartItem

from rest_framework import viewsets, status

from rest_framework.response import Response





class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    

    def create(self, request, *args, **kwargs):
        serializers= self.get_serializer(data= request.data)
        serializers.is_valid(raise_exception=True)

        product = serializers.validated_data['product']
        quantity = serializers.validated_data['stock']

        if product.stock < quantity:
            return Response({"errors": "no hay stock suficiente"}, status= status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializers)

        product.stock -= quantity
        product.save()

        headers = self.get_success_headers(serializers.data)
        return Response(serializers.data, status= status.HTTP_200_OK, headers= headers)
    
    def destroy(self, request, *args, **kwargs):
        instance= self.get_object()
        product= instance.product
        quantity= instance.quantity

        self.perform_destroy(instance)

        product.stock += quantity
        product.save()

        return Response(status = status.HTTP_204_NO_CONTENT)