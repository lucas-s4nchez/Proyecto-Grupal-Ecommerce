from apps.cart.models import CartItem,Cart
from apps.products.models import Product

from rest_framework import serializers
from apps.products.api.serializers.product_serializers import  SimpleProductSerializer

class CartItemSerializer(serializers.ModelSerializer):

    product = SimpleProductSerializer(many = False)
    sub_total= serializers.SerializerMethodField(method_name="get_sub_total")

    class Meta:
        model = CartItem
        fields = ('id', 'cart', 'product', 'quantity', 'sub_total', )
    
    def get_sub_total(self, cartitem:CartItem):
        return cartitem.quantity * cartitem.product.price
    

class AddCartItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_product_id(self, value):
        try:
            product = Product.objects.get(id=value)
            if not product.state:
                raise serializers.ValidationError("El producto no está disponible.")
        except Product.DoesNotExist:
            raise serializers.ValidationError("El producto no existe.")

        return value

    def create(self, validated_data):
        user = self.context['request'].user
        cart = Cart.objects.get(user=user)
        product_id = validated_data['product_id']
        quantity = validated_data['quantity']

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id, defaults={'quantity': quantity})

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)