from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.users.models import CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class CustomUserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','name','last_name','is_staff')

class CustomUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'email': instance['email'],
            'name': instance['name'],
            'last_name': instance['last_name'],
            'password': instance['password'],
            'is_staff': instance['is_staff'],
            'is_active': instance['is_active'],
        }
    
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','password','is_staff','is_active','name', 'last_name')
    
    def create(self,validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        updated_user = super().update(instance, validated_data)
        updated_user.set_password(validated_data['password'])
        updated_user.save()
        return updated_user

