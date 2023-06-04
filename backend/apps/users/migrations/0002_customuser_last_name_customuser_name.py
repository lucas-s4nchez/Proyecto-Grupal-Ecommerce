# Generated by Django 4.2.1 on 2023-06-04 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(default='default_value', max_length=200, verbose_name='last_name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='default_value', max_length=200, verbose_name='name'),
            preserve_default=False,
        ),
    ]