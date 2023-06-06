from django.contrib import admin
from .models import Usuario, Categoria, Stock, Producto, Carrito, MetodoPago, ProdCarrito, Orden,DetalleOrden

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(Stock)
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(MetodoPago)
admin.site.register(ProdCarrito)
admin.site.register(Orden)
admin.site.register(DetalleOrden)
