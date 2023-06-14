from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer,AddCartItemSerializer,UpdateCartItemSerializer
from apps.cart.models import CartItem

from rest_framework import viewsets, status

from rest_framework.response import Response





class CartItemViewSet(viewsets.ModelViewSet):
    
    http_method_names=['get','post','patch','delete']

    def get_queryset(self):
      return CartItem.objects.filter(cart_id=self.kwargs["cart_pk"], product__state=True)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        elif self.request.method == "PATCH":
            return UpdateCartItemSerializer
        return CartItemSerializer
    
    def get_serializer_context(self):
        return {"cart_id": self.kwargs["cart_pk"]}
    

    # def create(self, request, *args, **kwargs):
    #     serializers= self.get_serializer(data= request.data)
    #     serializers.is_valid(raise_exception=True)

    #     product = serializers.validated_data['product']
    #     quantity = serializers.validated_data['stock']

    #     if product.stock < quantity:
    #         return Response({"errors": "no hay stock suficiente"}, status= status.HTTP_400_BAD_REQUEST)
        
    #     self.perform_create(serializers)

    #     product.stock -= quantity
    #     product.save()

    #     headers = self.get_success_headers(serializers.data)
    #     return Response(serializers.data, status= status.HTTP_200_OK, headers= headers)
    
    # def destroy(self, request, *args, **kwargs):
    #     instance= self.get_object()
    #     product= instance.product
    #     quantity= instance.quantity

    #     self.perform_destroy(instance)

    #     product.stock += quantity
    #     product.save()

    #     return Response(status = status.HTTP_204_NO_CONTENT)