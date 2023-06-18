from rest_framework.routers import DefaultRouter

from apps.products.api.views.products_views import ProductViewSet
from apps.products.api.views.general_views import CategoryViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet, basename= 'products')
router.register(r'category', CategoryViewSet, basename= 'category')

urlpatterns = router.urls  