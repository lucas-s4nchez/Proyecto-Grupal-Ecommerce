from apps.order.api.serializers.order_serializers import OrderSerializer
from apps.order.models import Order

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class OrderViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    # def get_queryset(self):
    #     user = self.request.user
    #     if user.is_staff:
    #         return Order.objects.all()
    #     return Order.objects.filter(owner=user)
    
