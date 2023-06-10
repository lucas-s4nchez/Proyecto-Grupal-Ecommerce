from rest_framework.routers import DefaultRouter

from apps.order.api.views.order_views import OrderViewSet
from apps.order.api.views.orderItem_views import OrderItemViewSet

router= DefaultRouter()

router.register(r'order', OrderViewSet, basename='order')
router.register(r'orderItem', OrderItemViewSet, basename='orderItem')


urlpatterns = router.urls 