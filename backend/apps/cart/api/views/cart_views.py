from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.cart.api.serializers.cart_serializers import CartSerializer
from apps.cart.models import Cart

class CartViewSets(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class= CartSerializer

    # @action(detil = False, methods=['GET'])
    # def user_cart(self, request):
    #     user = request.user
    #     cart = Cart.objects.get(user=user)
    #     serializer = self.get_serializer(cart)
    #     return Response(serializer.data)
    
    # @action(detail=True, methods=['POST'])
    # def clear_cart(self, request, pk= None):
    #     cart = self.get_object()
    #     cart.items.all().delete()
    #     return Response(staus= status.HTTP_204_NO_CONTENT)

    def list(self, request):
        cart_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(cart_serializer.data, status= status.HTTP_200_OK)
    

    def create(self,request):
        serializer= self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Carrito creado"}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        if self.get_queryset(pk):
            cart_serializer= self.serializer_class(self.get_queryset(pk), data=request.data)
            if cart_serializer.is_valid():
                cart_serializer.save()
                return Response(cart_serializer.data, status= status.HTTP_200_OK)
            return Response(cart_serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        return Response({"mensaje": "No hay un carrito con ese nro de identificacion"}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk= None):
        cart = self.get_queryset().filter(id=pk).first()
        if cart:
            cart.delete()
            return Response({"mensaje": "Carrito eliminado correctamente"}, status= status.HTTP_200_OK)
        
        return Response({"mensaje":"No hay un carrito con ese nro de identificacion" }, status= status.HTTP_400_BAD_REQUEST)

    
