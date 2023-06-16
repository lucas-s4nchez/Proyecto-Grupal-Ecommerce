from rest_framework import serializers
from apps.invoice.models import Invoice
from apps.users.api.serializers import CustomUserSerializer
from apps.invoice.api.serializer.invoiceItem_serializer import InvoiceItemSerializer


class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        exclude = ('state','created_date','modified_date','deleted_date')

  
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = instance.user.name
        representation['items'] = InvoiceItemSerializer(instance.items.all(), many=True).data
        return representation