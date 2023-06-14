from apps.cart.models import CartItem
from apps.products.models import Product

from rest_framework import serializers
from rest_framework.response import Response
from apps.products.api.serializers.product_serializers import ProductSerializer, SimpleProductSerializer

class CartItemSerializer(serializers.ModelSerializer):

    product = SimpleProductSerializer(many = False)
    sub_total= serializers.SerializerMethodField(method_name="get_sub_total")

    class Meta:
        model = CartItem
        fields = ('id', 'cart', 'product', 'quantity', 'sub_total', )
    
    def get_sub_total(self, cartitem:CartItem):
        return cartitem.quantity * cartitem.product.price
    

class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value, state=True).exists():
            raise serializers.ValidationError("No hay ningún producto con este id")
        return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']

        try:
            cartitem= CartItem.objects.get(product_id=product_id, cart_id=cart_id)
            cartitem.quantity += quantity
            cartitem.save()

            self.instance = cartitem
        except:
            
            self.instance = CartItem.objects.create(cart_id=cart_id, **self.validated_data)

        return self.instance


    class Meta:
        model = CartItem
        fields = ('id','product_id','quantity')
    
class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields=('quantity',)