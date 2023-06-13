from rest_framework import serializers
from apps.invoice.models import InvoiceItem
from apps.products.api.serializers.product_serializers import SimpleProductSerializer

class InvoiceItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    class Meta:
        model = InvoiceItem
        fields = ['id', 'invoice', 'product', 'quantity', 'price']