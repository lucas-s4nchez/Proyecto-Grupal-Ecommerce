from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status

from apps.order.api.serializers.orderItem_serializers import OrderItemSerializer
from apps.order.models import OrderItem

class OrderItemViewSet(viewsets.ModelViewSet):

    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()

    # permission_classes =[permissions.IsAuthenticated]

    # def get_queryset(self):

    #     if not self.request.user.is_authenticated():
    #         return Response({"mensaje": "debe estar registrado para acceder al detalle de orden"}, status=status.HTTP_401_UNAUTHORIZED )
        
    #     return Response(OrderItem.objects.all(), status= status.HTTP_200_OK)