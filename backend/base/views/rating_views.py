from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response



from ..models import *
from ..serializers import *

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRating(request):
        try:
            user = request.user
            data =request.data
            
            conv = float(data['rating'])
            rating= Rating.objects.create(
                user_id= user.id,
                movie_id= data['movie_id'],
                name= user.first_name,
                rating = conv
            ) 
            #print("idUser",user.id,"movie",movie_id)
            serializer= RatingSerializer(rating,many=False)
            return Response(serializer.data)    
        except:
            return Response("nothing...")
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRating(request,pk):
        user = request.user
        ratings= Rating.objects.all()
        c=0
        for i in ratings:
            if i.movie_id==int(pk) and i.user_id== user.id:
                serializer= RatingSerializer(i,many=False)
                c=c+1
                break
        if c!=0:
            return Response(serializer.data)
        else:
            return Response(-1)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delRating(request,pk):
        user=request.user
        rating= Rating.objects.get(_id=pk)
        if user.id==rating.user_id:
            rating.delete()
        return Response("Rating Deleted")    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editRating(request,pk):
        user = request.user
        data =request.data
        rating= Rating.objects.get(_id=pk)
        rating.rating =data['rating']

        rating.save()
        serializer= RatingSerializer(rating,many=False)
        return Response(serializer.data) 

@api_view(['GET'])  
def getAvgRating(request,pk):
    ratings = Rating.objects.all()
    sum=0
    total=0
    try:
        for rating in ratings:
            if rating.movie_id == int(pk):
                # print("aaya     ", rating.rating)
                sum= sum + rating.rating
                total= total +1
    
        avg=sum/total
    
        return Response(avg)
    except:
        return Response(0)
 