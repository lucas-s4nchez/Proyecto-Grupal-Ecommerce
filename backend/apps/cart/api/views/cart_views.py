from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.cart.api.serializers.cart_serializers import CartSerializer
from apps.cart.models import Cart

class CartViewSets(viewsets.ModelViewSet):
    http_method_names=['get','post','delete', "options", "head"]
    queryset = Cart.objects.all()
    serializer_class= CartSerializer

    # @action(detil = False, methods=['GET'])
    # def user_cart(self, request):
    #     user = request.user
    #     cart = Cart.objects.get(user=user)
    #     serializer = self.get_serializer(cart)
    #     return Response(serializer.data)

    def list(self, request):
        cart_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(cart_serializer.data, status= status.HTTP_200_OK)
    

    def create(self,request):
        user = request.user
        existing_cart = Cart.objects.filter(user=user).first()
        if existing_cart:
            return Response({"error": "Ya tienes un carrito existente"}, status=status.HTTP_400_BAD_REQUEST)
        serializer= self.serializer_class(data= request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Carrito creado"}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk= None):
        cart = self.get_object()
        if cart:
          cart.items.all().delete()
          return Response({'message': 'Carrito vaciado'}, status=status.HTTP_204_NO_CONTENT)
        return Response({"message":"No hay un carrito con ese id" }, status= status.HTTP_400_BAD_REQUEST)

    
