from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Movie,Review,Rating, Moderating, List,Job


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isModerator = serializers.SerializerMethodField(read_only=True)
    isActive = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= User
        fields = ['id','_id', 'username', 'email','name','isAdmin','isModerator','isActive']

    def get_isAdmin(self,obj):
        return obj.is_superuser

    def get__id(self,obj):
        return obj.id
    
    def get_name(self,obj):
        name = obj.first_name    

        if name=='':
            name= obj.email
        return name        

    def get_isModerator(self,obj):
        return obj.is_staff
    def get_isActive(self,obj):
        return obj.is_active    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= User
        fields = ['id','_id', 'username', 'email','name','isAdmin','isModerator','isActive','token']
    
    def get_token(self,obj):
        token =  RefreshToken.for_user(obj)
        return str(token.access_token)  

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        fields='__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rating
        fields='__all__'

class ModeratingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Moderating
        fields='__all__'

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model=List
        fields='__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

       
   
