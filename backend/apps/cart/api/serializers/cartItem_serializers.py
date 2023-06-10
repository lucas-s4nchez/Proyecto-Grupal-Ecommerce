from apps.cart.models import CartItem
from apps.products.models import Product

from rest_framework import serializers
from rest_framework.response import Response
from apps.products.api.serializers.product_serializers import ProductSerializer, SimpleProductSerializer

class CartItemSerializer(serializers.ModelSerializer):

    product = SimpleProductSerializer(many = False)
    sub_total= serializers.SerializerMethodField(method_name="get_sub_total")

    class Meta:
        model = CartItem
        fields = ('id', 'cart', 'product', 'quantity', 'sub_total', )
    
    def get_sub_total(self, cartitem:CartItem):

        return cartitem.quantity * cartitem.product.price
    


    