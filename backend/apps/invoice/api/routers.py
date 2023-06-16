from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.invoice.api.views.invoice_views import InvoiceViewSet
from .views.invoiceItem_views import InvoiceItemViewSet


router = DefaultRouter()


router.register(r'invoices', InvoiceViewSet, basename="invoice")
router.register(r'invoiceitems', InvoiceItemViewSet, basename="invoiceitems")


urlpatterns = router.urls