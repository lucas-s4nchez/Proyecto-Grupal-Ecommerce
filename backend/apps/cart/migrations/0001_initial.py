# Generated by Django 4.2.1 on 2023-06-08 03:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0005_alter_category_modified_date_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='fecha modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='fecha eliminacion')),
                ('total_items', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Carrito',
                'verbose_name_plural': 'Carritos',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='CarItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='fecha modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='fecha eliminacion')),
                ('count', models.IntegerField(default=0)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cart.cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            options={
                'verbose_name': 'Item en carrito',
                'verbose_name_plural': 'Items en carrito',
                'ordering': ('id',),
            },
        ),
    ]
