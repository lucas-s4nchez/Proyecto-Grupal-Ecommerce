# Generated by Django 4.2.1 on 2023-05-20 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basededatos', '0002_alter_orden_options_remove_producto_id_stock_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='producto',
            options={'ordering': ['id_producto'], 'verbose_name': 'Producto', 'verbose_name_plural': 'Productos'},
        ),
        migrations.AlterField(
            model_name='detalleorden',
            name='cantidad',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='prod_carrito',
            name='cantidad',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='producto',
            name='cantidad',
            field=models.IntegerField(default=0),
        ),
    ]
