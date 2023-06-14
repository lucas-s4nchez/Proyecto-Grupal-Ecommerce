from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers 

from apps.cart.api.views.cart_views import CartViewSets
from apps.cart.api.views.cartItem_views import CartItemViewSet

router = DefaultRouter()

router.register(r'cart', CartViewSets, basename= 'cart')
# router.register(r'cartItem', CartItemViewSet, basename= 'cartItem')

# Ruta anidada
cart_router = routers.NestedDefaultRouter(router, 'cart', lookup='cart')
cart_router.register('items', CartItemViewSet, basename='cart-items')

urlpatterns = [
    path("", include(router.urls)),
    path("", include(cart_router.urls)),
]