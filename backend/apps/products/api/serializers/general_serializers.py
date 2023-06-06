from apps.products.models import Category

from rest_framework import serializers

#definimos que es lo que queremos que se muestre 
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        exclude = ('state', 'created_date','modified_date','deleted_date') 


