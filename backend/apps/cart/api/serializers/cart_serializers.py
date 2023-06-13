from apps.cart.models import Cart, CartItem

from rest_framework import serializers
from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer

class CartSerializer(serializers.ModelSerializer):
    
    items = CartItemSerializer(many= True, read_only=True)
    total_items = serializers.SerializerMethodField(method_name="get_total_items")
    total = serializers.SerializerMethodField(method_name="get_total")
    


    class Meta:
        model = Cart
        fields = ("id",'user','items','total_items','total',)

    def get_total_items(self, obj):
        return obj.items.count()

    def get_total(self, obj):
        items_data = CartItemSerializer(obj.items.all(), many=True).data
        total = sum(float(item['product']['price']) * item['quantity'] for item in items_data)

        return total 