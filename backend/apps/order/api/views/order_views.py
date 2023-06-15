from apps.order.api.serializers.order_serializers import OrderSerializer,CreateOrderSerializer, UpdateOrderSerializer
from apps.order.models import Order

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


class OrderViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "patch", "post", "delete", "options", "head"]
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        return OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(owner=user)
    
    def get_serializer_context(self):
        return {"user_id":self.request.user.id}
