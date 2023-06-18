from django.db import models

from apps.base.models import BaseModel
from apps.products.models import Product

from django.conf import settings


# Create your models here.

class Cart(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_items= models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Carrito'
        verbose_name_plural = 'Carritos'
        ordering = ('id',)

    def __str__(self):
        return str(self.user)
    
class CartItem(BaseModel):
    cart= models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product= models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cartItems")
    quantity = models.PositiveSmallIntegerField(default=0)
    sub_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    class Meta:
        verbose_name = 'Item en carrito'
        verbose_name_plural = 'Items en carrito'
        ordering = ('id',)

        


