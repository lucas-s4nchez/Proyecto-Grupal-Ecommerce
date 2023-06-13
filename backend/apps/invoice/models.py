from django.db import models
from apps.users.models import CustomUser
from apps.products.models import Product
from apps.order.models import Order
from apps.base.models import BaseModel
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.db.models.signals import pre_save

from django.db.models import Sum

class Invoice(BaseModel):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, default=1)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Invoice ID: {self.id}"
    
    class Meta:
        verbose_name = ("Factura")
        verbose_name_plural = ("Facturas")

    def calculate_total_amount(self):
        total_amount = self.items.aggregate(total=Sum(models.F('price') * models.F('quantity')))['total']
        self.total_amount = total_amount if total_amount is not None else 0
        self.save()




class InvoiceItem(BaseModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"InvoiceItem ID: {self.id}"
    
    class Meta:
        verbose_name = ("Item Factura")
        verbose_name_plural = ("Items Facturas")

    def save(self, *args, **kwargs):
        if not self.price:  # Solo establece el precio si aún no está establecido
            self.price = self.product.price
        super().save(*args, **kwargs)


@receiver(post_save, sender=InvoiceItem)
def update_invoice_total(sender, instance, **kwargs):
    instance.invoice.calculate_total_amount()

@receiver(pre_save, sender=InvoiceItem)
def set_product_price(sender, instance, **kwargs):
    instance.price = instance.product.price