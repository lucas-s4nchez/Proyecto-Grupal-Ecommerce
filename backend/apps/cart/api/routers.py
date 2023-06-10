from rest_framework.routers import DefaultRouter

from apps.cart.api.views.cart_views import CartViewSets
from apps.cart.api.views.cartItem_views import CartItemViewSet

router = DefaultRouter()

router.register(r'cart', CartViewSets, basename= 'cart')
router.register(r'cartItem', CartItemViewSet, basename= 'cartItem')

urlpatterns = router.urls