from django.db import models
from apps.base.models import BaseModel
from apps.products.models import Product
from django.conf import settings

# Create your models here.
class Order(BaseModel):

    STATUS_PENDING= 'P'
    STATUS_COMPLETED= 'C'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_COMPLETED, 'Completed'),]



    status = models.CharField(max_length=50, choices= STATUS_CHOICES, default= 'STATUS_PENDING')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        verbose_name = "Orden"
        verbose_name_plural = "Ordenes"
        ordering = ('status',)

    def __str__(self):
        return f'{self.get_status_display()} --owner : {self.owner}'
    

class OrderItem(BaseModel):
    order= models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")
    product = models.ForeignKey(Product, on_delete= models.PROTECT)
    quantity= models.IntegerField()
    total_orden_item= models.DecimalField(max_digits=10, decimal_places=2, blank = True, null= True)


    def get_total(self, *args, **kwargs):
        self.total_orden_item = self.quantity * self.product.price


    class Meta:
        verbose_name = "Item en orden"
        verbose_name_plural = "Items en orden"
        ordering = ("id",)

    def __str__(self):
        return f' Orden item: {self.product} - Order: {self.order}'
