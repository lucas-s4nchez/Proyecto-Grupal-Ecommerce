from apps.products.models import Product
from rest_framework import serializers

from apps.products.api.serializers.general_serializers import CategorySerializer

#definimos que es lo que queremos que se muestre
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('state','created_date','modified_date','deleted_date')


    def to_representation(self, instance):
        return {
            'id': instance.id,
            "name": instance.name,
            "description": instance.description,
            "image": instance.image.url if instance.image and instance.image.url else '', #modifique esta parte, para que en caso de no haber imagen deje una cadena vacia
            "price": instance.price,
            "stock": instance.stock,
            "category_product": instance.category_product.name if instance.category_product is not None else '',
        }
        

class SimpleProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name','price','state','image')
