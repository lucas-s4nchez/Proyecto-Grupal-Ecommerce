from django.urls import path

from apps.products.api.views.general_views import CategoryListAPIView

urlpatterns = [
    path('category/', CategoryListAPIView.as_view(), name='category'),

]
