from django.contrib import admin
from basededatos.models import Usuario, Categoria, Stock, Producto, Carrito, MetodoPago, Prod_carrito, Orden, DetalleOrden

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Categoria)
#admin.site.register(Stock)
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(MetodoPago)
admin.site.register(Prod_carrito)
admin.site.register(Orden)
admin.site.register(DetalleOrden)
