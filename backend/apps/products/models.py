from django.db import models


from apps.base.models import BaseModel

# Create your models here.


class Category(BaseModel):
    name = models.CharField(max_length=200, blank=False)
    description = models.TextField(max_length=300, blank=False)

    class Meta:
        db_table = 'Categoria'
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ('id',)

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=150, blank= False, null=False)
    description = models.TextField(max_length=250, blank=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    stock = models.IntegerField(default=0, blank=False)
    category_product = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Categoria de producto')

    class Meta:
        db_table = 'Producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ('id',)

    def __str__(self):
        return self.name