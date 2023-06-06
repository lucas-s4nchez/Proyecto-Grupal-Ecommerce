from django.contrib import admin
from apps.products.models import Product, Category

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'description', 'category_product', 'stock')

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
