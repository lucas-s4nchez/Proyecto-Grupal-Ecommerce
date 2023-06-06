
from django.urls import path

from .views import Login, Logout,UserToken,Register

urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name='register'),
    path('logout', Logout.as_view(), name='logout'),
    path('refresh-token/', UserToken.as_view(), name='refresh_token'),
]