
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import Login, Logout,Register

urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name='register'),
    path('logout', Logout.as_view(), name='logout'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh_token'),
]