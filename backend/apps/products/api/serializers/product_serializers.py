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
            "price": instance.price,
            "stock": instance.stock,
            "category_product": instance.category_product.name if instance.category_product is not None else '',
        }
        

