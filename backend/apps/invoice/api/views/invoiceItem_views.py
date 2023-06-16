from rest_framework import viewsets
from apps.invoice.models import InvoiceItem
from apps.invoice.api.serializer.invoiceItem_serializer import InvoiceItemSerializer


class InvoiceItemViewSet(viewsets.ModelViewSet):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer