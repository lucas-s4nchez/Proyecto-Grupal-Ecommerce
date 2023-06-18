from rest_framework.routers import DefaultRouter

from apps.users.api.views import UserViewSet

router = DefaultRouter()

router.register(r'users', UserViewSet, basename="users")

urlpatterns = router.urls