
from django.urls import path

from .views import Login, Logout,UserToken

urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('logout', Logout.as_view(), name='logout'),
    path('refresh-token/', UserToken.as_view(), name='refresh_token'),
]