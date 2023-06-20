
from django.urls import path, include
from apps.cart.api.views.cart_views import CartView
from apps.cart.api.views.cartItem_views import CartItemView

urlpatterns = [
    path("cart", CartView.as_view(), name="cart"),
    path("cart/items", CartItemView.as_view(), name="cart-items"),
    path('cart/items/<int:cart_item_id>/',
         CartItemView.as_view(), name='cart-item-detail'),
]
