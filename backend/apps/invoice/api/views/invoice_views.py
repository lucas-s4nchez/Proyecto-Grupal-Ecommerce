
from rest_framework import viewsets
from apps.invoice.models import Invoice
from apps.invoice.api.serializer.invoice_serializer import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()