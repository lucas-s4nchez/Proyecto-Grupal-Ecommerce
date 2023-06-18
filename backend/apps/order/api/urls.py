from django.urls import path, include


from apps.order.api.views.order_views import OrderView

urlpatterns = [
    path("order", OrderView.as_view(), name="order"),
    path('order/<int:order_id>/', OrderView.as_view(), name='order_detail'),
]