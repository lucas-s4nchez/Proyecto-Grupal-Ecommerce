from datetime import datetime
from django.contrib.sessions.models import Session
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from apps.users.models import CustomUser
from apps.users.api.serializers import CustomUserSerializer, CustomUserListSerializer, CustomUserTokenSerializer
from apps.users.authentication_mixins import Authentication
from django.shortcuts import get_object_or_404




class UserViewSet(viewsets.GenericViewSet):
    model = CustomUser
    serializer_class = CustomUserSerializer
    list_serializer_class = CustomUserListSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active=True).values('id', 'email','name', 'last_name','password','is_staff','is_active')
        return self.queryset

    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        user_serializer =self.serializer_class(data=request.data)
        print(user_serializer)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario registrado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)
    
    def update(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'Usuario eliminado correctamente'
            })
        return Response({
            'message': 'No existe el usuario que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)
    
class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        login_serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = CustomUserTokenSerializer(user)
                if created:
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesión exitoso'
                    }, status=status.HTTP_201_CREATED)
                else:
                    """
                    #borrar sesiones anteriores
                    all_sessions = Session.objects.filter(
                        expire_date__gte=datetime.now())
                    if all_sessions.exists():
                        for session in all_sessions:
                            session_data = session.get_decoded()
                            if user.id == int(session_data.get('_auth_user_id')):
                                session.delete()
                    #borrar token
                    token.delete()
                    token = Token.objects.create(user=user)
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesión exitoso'
                    }, status=status.HTTP_201_CREATED)
                    """
                    return Response({'message': 'Ya se ha iniciado sesion con este usuario'}, status=status.HTTP_409_CONFLICT)
            else:
                return Response({'message': 'No puedes iniciar sesion.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Email o contraseña incorrectos.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Hola desde response'}, status=status.HTTP_200_OK)


class Logout(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data['token']
            token = Token.objects.filter(key=token).first()
            if token:
                user = token.user

                all_sessions = Session.objects.filter(
                    expire_date__gte=datetime.now())
                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                        if user.id == int(session_data.get('_auth_user_id')):
                            session.delete()
                token.delete()

                session_message = 'Sesiones de usuario eliminadas'
                token_message = 'token eliminado'
                return Response({'token_message': token_message, 'session_message': session_message}, status=status.HTTP_200_OK)
            return Response({'message': 'No se ha encontrado un usuario con estas credenciales'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'No se ha encontrado token en la petición'}, status=status.HTTP_409_CONFLICT)

class UserToken(APIView):
    def get(self,request,*args,**kwargs):
        email = request.GET.get('email')
        try:
            user_token = Token.objects.get(user = CustomUserTokenSerializer().Meta.model.objects.filter(email = email).first())
            return Response({'token':user_token.key})
        except:
            return Response({'error':'Credenciales enviadas incorrectas'}, status=status.HTTP_400_BAD_REQUEST)