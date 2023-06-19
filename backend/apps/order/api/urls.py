from django.urls import path, include


from apps.order.api.views.order_views import OrderView,mercadopago_webhook,success

urlpatterns = [
    path("order", OrderView.as_view(), name="order"),
    path('order/<int:order_id>/', OrderView.as_view(), name='order_detail'),
    path('payment/webhook', mercadopago_webhook, name='mercadopago_webhook'),
    path('payment/success', success, name='mercadopago_success'),
]