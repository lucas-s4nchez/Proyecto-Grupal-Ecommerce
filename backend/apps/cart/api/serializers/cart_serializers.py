from apps.cart.models import Cart, CartItem

from rest_framework import serializers
from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer
from apps.users.api.serializers import CustomUserTokenSerializer

class CartSerializer(serializers.ModelSerializer):
    user = CustomUserTokenSerializer(many=False, read_only=True)
    items = serializers.SerializerMethodField(method_name="get_filtered_items")
    total_items = serializers.SerializerMethodField(method_name="get_total_items")
    total = serializers.SerializerMethodField(method_name="get_total")
    


    class Meta:
        model = Cart
        fields = ("id",'user','items','total_items','total',)

    def get_filtered_items(self, obj):
        items_queryset = obj.items.filter(product__state=True)
        items_data = CartItemSerializer(items_queryset, many=True).data
        return items_data

    def get_total_items(self, obj):
        return obj.items.filter(product__state=True).count()

    def get_total(self, obj):
        items_queryset = obj.items.filter(product__state=True)
        items_data = CartItemSerializer(items_queryset, many=True).data
        total = sum(float(item['product']['price']) * item['quantity'] for item in items_data)
        return total