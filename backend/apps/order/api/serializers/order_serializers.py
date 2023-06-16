from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.order.models import Order,OrderItem
from apps.order.api.serializers.orderItem_serializers import OrderItemSerializer
from apps.users.api.serializers import CustomUserTokenSerializer
from apps.cart.models import CartItem

from rest_framework import serializers
from decimal import Decimal

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    owner=CustomUserTokenSerializer(read_only=True)
    total_items = serializers.SerializerMethodField(read_only=True, method_name="get_total_items")
    total_order = serializers.SerializerMethodField(read_only=True, method_name="get_total_order")

    def get_total_items(self, order):
        return order.items.count()

    def get_total_order(self, order):
        total = sum(item.quantity * Decimal(item.product.price) for item in order.items.all())
        return total

    class Meta:
        model = Order
        fields = ("id", "created_date", "status", "owner", "items", "total_items", "total_order")

class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.IntegerField()

    def save(self, **kwargs):
        cart_id = self.validated_data["cart_id"]
        user_id = self.context["user_id"]
        # Verificar si hay ítems en el carrito
        cart_items_exist = CartItem.objects.filter(cart_id=cart_id).exists()
        if not cart_items_exist:
            raise ValidationError("No hay ítems en el carrito para generar la orden.")
        
        with transaction.atomic():
          order = Order.objects.create(owner_id = user_id)
          cartitems = CartItem.objects.filter(cart_id = cart_id)
          orderitems = [OrderItem(order=order, product=item.product, quantity = item.quantity)for item in cartitems]
          OrderItem.objects.bulk_create(orderitems)
          CartItem.objects.filter(cart_id=cart_id).delete()

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order 
        fields = ["status"]