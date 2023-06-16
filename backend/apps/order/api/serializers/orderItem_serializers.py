from apps.order.models import OrderItem
from apps.products.api.serializers.product_serializers import SimpleProductSerializer

from rest_framework import serializers

class OrderItemSerializer(serializers.ModelSerializer):
    product= SimpleProductSerializer()
    total_orden_items = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    sub_total = serializers.SerializerMethodField(read_only=True, method_name="get_sub_total")

    def get_sub_total(self, order_item):
        sub_total= order_item.quantity * order_item.product.price
        return sub_total

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'total_orden_items', 'sub_total',)