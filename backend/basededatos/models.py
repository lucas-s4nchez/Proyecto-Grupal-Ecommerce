from django.db import models

# Create your models here.

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank= False, null=False)
    apellido = models.CharField(max_length=45, blank= False, null=False)
    dni = models.IntegerField()
    email = models.EmailField(max_length=30, blank= False, null=False)
    password = models.CharField(max_length=10, blank= False, null=False)
    tipo_usuario = models.CharField(max_length=15, blank= False, null=False)

    class Meta:
        db_table = 'Usuario'
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ("id_usuario",)

    def __str__(self):
        return "{}--{}".format(self.id_usuario, self.nombre)


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45, blank= False, null=False)

    class Meta:
        db_table = 'Categoria'
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return "{}-{}".format(self.id_categoria, self.descripcion)


class Stock(models.Model):
    id_stock = models.AutoField(primary_key=True)
    stock = models.SmallIntegerField()

    class Meta:
        db_table = "Stock"
        verbose_name = "Stock"
        verbose_name_plural = "Stock"

    def __str__(self):
        return "{}".format(self.id_stock)


class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    precio_producto = models.DecimalField(max_digits=10, decimal_places=2)
    nombre = models.CharField(max_length=100, blank= False, null=False, unique=True)
    carritos = models.ManyToManyField('Carrito', through='ProdCarrito')

    class Meta:
        db_table = "Producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ("id_producto",)

    def __str__(self):
        return "{}-{}".format(self.id_producto, self.nombre)


class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_productos = models.ManyToManyField(Producto, through='ProdCarrito')
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"

    def __str__(self):
        return "{}".format(self.id_carrito)


class MetodoPago(models.Model):
    id_metodoPago = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=20, blank= False, null=False)

    class Meta:
        db_table = "Metodo de pago"
        verbose_name = "Metodo de pago"
        verbose_name_plural = "Metodos de pago"


    def __str__(self):
        return "{}--{}".format(self.id_metodoPago, self.descripcion)


class ProdCarrito(models.Model):
    id_prodCarrito = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    id_carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    class Meta:
        db_table = "Productos en Carrito"
        verbose_name = "Producto en Carrito"
        verbose_name_plural = "Productos en Carrito"
        ordering = ("id_producto",)


    def __str__(self):
        return "Carrito nro: {}--id Producto: {}-- Cantidad: {}".format(self.id_prodCarrito,self.id_prodCarrito, self.cantidad)


class Orden(models.Model):
    id_orden = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE)
    suma_total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=15, blank= False, null=False)
    productos = models.ManyToManyField(Producto, through='DetalleOrden')

    class Meta:
        db_table = "Orden"
        verbose_name = "Orden"
        verbose_name_plural = "Ordenes"

    def __str__(self):
        return "{}".format(self.id_orden)


class DetalleOrden(models.Model):
    id_detalleOrden = models.AutoField(primary_key=True)
    id_orden = models.ForeignKey(Orden, on_delete=models.CASCADE, )
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "Detalle de la orden"
        verbose_name = "Detalle de la orden"
        verbose_name_plural = "Detalle de ordenes"

    def __str__(self):
        return "{}".format(self.id_detalleOrden)
