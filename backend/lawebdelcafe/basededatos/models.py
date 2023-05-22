from datetime import datetime
from django.db import models

# Create your models here.

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=False,)
    apellido = models.CharField(max_length=30, blank=False)
    dni= models.IntegerField(blank=False)
    email = models.CharField(max_length= 30, blank=False)
    password = models.CharField(max_length= 15, blank=False)
    tipo_usuario = models.CharField(max_length=15, blank=False)

    class Meta:
        db_table = 'Usuario'
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return "{}-{}: {} {}".format(self.id_usuario, self.tipo_usuario, self.apellido, self.nombre)
    
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    descripcion = models.TextField(max_length=2000, blank=False)

    class Meta:
        db_table = 'Categoria'
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return "{}".format(self.descripcion)
    
"""class Stock(models.Model):
    id_stock = models.AutoField(primary_key=True)
    stock = models.BooleanField(default=True)

    class Meta:
        db_table = "Stock"
        verbose_name = "Stock"

    def __str__(self):
        return "{} {}".format(self.stock)"""

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    precio_producto = models.DecimalField(decimal_places=2, blank=False, max_digits=10)
    nombre = models.CharField(max_length=40, blank=False)
    stock = models.BooleanField(default=True, blank=False)
    cantidad = models.IntegerField(blank=False, default=0)
    id_categoria = models.ForeignKey(Categoria, to_field="id_categoria", on_delete=models.CASCADE)
    

    class Meta:
        db_table = "Producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["id_producto"]
    
    def __str__(self):
        return "{} {} {} {}".format(self.id_producto, self.nombre, self.precio_producto, self.cantidad)
    
class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, to_field="id_usuario", on_delete=models.CASCADE)

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"

    def __str__(self):
        return "{}-{}".format(self.id_carrito, self.id_usuario)

class MetodoPago(models.Model):
    id_metodoPago = models.AutoField(primary_key=True)
    descripcion = models.TextField(max_length=100, blank=False)

    class Meta:
        db_table = "Metodo de pago"
        verbose_name = "Metodo de pago"

    def __str__(self):
        return "{}".format(self.descripcion)

class Prod_carrito(models.Model):
    id_prod_carrito = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False, default=0)
    id_producto = models.ForeignKey(Producto, to_field="id_producto", on_delete=models.CASCADE)
    id_carrito = models.ForeignKey(Carrito, to_field="id_carrito", on_delete=models.CASCADE)

    class Meta:
        db_table = "Productos en Carrito"
        verbose_name = "Productos en Carrito"

    def __str__(self):
        return "{}, cantidad: {}".format(self.id_prod_carrito, self.cantidad)

class Orden(models.Model):
    id_orden = models.AutoField(primary_key=True)
    suma_total= models.DecimalField(blank=False, decimal_places=2, max_digits=10)
    fecha = models.DateField(default=datetime.now)
    estado = models.CharField(blank=False, max_length=30)
    id_usuario = models.ForeignKey(Usuario, to_field="id_usuario", on_delete=models.CASCADE)
    id_metodoPago = models.ForeignKey(MetodoPago, to_field="id_metodoPago", on_delete=models.CASCADE)
    id_prod_carrito = models.ForeignKey(Prod_carrito, to_field="id_prod_carrito", on_delete=models.CASCADE)

    class Meta:
        db_table = "Orden"
        verbose_name = "Orden"
        verbose_name_plural = "Ordenes"

    def __str__(self):
        return "{} {} {}".format(self.id_orden, self.id_metodoPago,self.suma_total)

class DetalleOrden(models.Model):
    id_detalleOrden = models.AutoField(primary_key=True)
    precio_producto = models.DecimalField(blank=False, decimal_places=2, max_digits=10)
    cantidad = models.IntegerField(blank=False, default=0)
    subTotal = models.DecimalField(blank=False, max_digits=10, decimal_places=2)
    id_orden = models.ForeignKey(Orden, to_field="id_orden", on_delete=models.CASCADE) 

    class Meta:
        db_table = "Detalle de la orden"
        verbose_name = "Detalle de la orden"

    def __str__(self):
        return "{} {}".format(self.id_detalleOrden, self.subTotal)   
