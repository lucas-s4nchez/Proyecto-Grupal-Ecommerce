from apps.order.models import Order
from apps.base.models import BaseModel
from apps.order.api.serializers.orderItem_serializers import OrderItemSerializer

from rest_framework import serializers
from decimal import Decimal

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
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