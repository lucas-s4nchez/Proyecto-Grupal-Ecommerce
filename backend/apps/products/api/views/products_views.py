from apps.products.api.serializers.product_serializers import ProductSerializer
from apps.base.api import GeneralListApiView

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets

# class ProductListApiView(GeneralListApiView):
#     serializer_class = ProductSerializer



class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self , pk= None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state= True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()
    
    def list(self , request):
        product_serializer = self.get_serializer(self.get_queryset(), many = True)
        return Response( product_serializer.data, status= status.HTTP_200_OK)
    
    def create(self , request):
        serializer= self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Producto creado'}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk= None):
        if self.get_queryset(pk):
            product_serializer = self.serializer_class(self.get_queryset(pk), data= request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(product_serializer.data, status= status.HTTP_200_OK)
            
            return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'mensaje': 'No hay un producto con ese id'})
    def destroy(self, request, pk= None):
        product = self.get_queryset().filter(id=pk).first()
        if product:
            product.state = False
            product.save()
            return Response({'mensaje': 'Producto eliminado'}, status=status.HTTP_200_OK)
        
        return Response({'mensaje': 'No hay un producto con ese id'}, status= status.HTTP_400_BAD_REQUEST)


















# class ProductViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductSerializer
#     queryset = ProductSerializer.Meta.model.objects.filter(status=True)

#     def get_queryset(self):
#         model = self.get_serializer().Meta.model
#         return model.objects.filter(status=True)
    
#     def create(self, request):
#         product_serializer = self.get_serializer(data= request.data)

#         if product_serializer.is_valid():
#             product_serializer.save()
#             return Response({'message': 'Producto creado correctamente'}, status= status.HTTP_201_CREATED)
#         return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

#     def update(self, request, pk=None):
#         product = self.get_queryset().filter(id=pk).first()
#         if product:
#             product_serializer = self.serializer_class(
#                 product, data=request.data)
#             if product_serializer.is_valid():
#                 product_serializer.save()
#                 return Response(product_serializer.data, status=status.HTTP_200_OK)
#             return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'message': 'No hay un producto con ese id'})

#     def destroy(self, request, pk=None):
#         product = self.get_queryset().filter(id=pk).first()
#         if product:
#             product.state = False
#             product.save()
#             return Response({'message': 'Producto eliminado correctamente'}, status= status.HTTP_200_ok)
#         return Response({'message': 'No existe un producto con este id'}) 

