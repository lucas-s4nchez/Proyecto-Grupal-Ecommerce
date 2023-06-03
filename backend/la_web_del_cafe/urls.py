from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.users.api.routers')),
    path('api/v1/auth/', include('apps.users.api.urls')),
]
