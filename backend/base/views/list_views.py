from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response



from ..models import *
from ..serializers import *

from rest_framework import status
from django.db import connection

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getList(request,pk):
      
        lis = List.objects.get(user_id=pk)
        serializer= ListSerializer(lis,many=False)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createList(request):
        user = request.user
        data = request.data
        print("userId",user.id)
        c=0
        
    
        listt = List.objects.all()
    
        for i in listt:
            if i.user_id==user.id:
                i.movies= i.movies+" ,  "+data['movies']
                i.name=user.first_name
                i.save()
                c=1
        if c==0:
            List.objects.create(
                    user_id = user.id,
                    name = user.first_name,
                    movies = data['movies']                                
            )
        
        return Response("Added to List...") 

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deList(request,pk):
        lis = List.objects.get(user_id=pk)
        lis.delete()
        serializer= ListSerializer(lis,many=False)
        return Response("List Deleted...")