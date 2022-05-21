from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response



from ..models import *
from ..serializers import *

from rest_framework import status





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addReview(request):
        user = request.user
        data =request.data
        review= Review.objects.create(
            user_id= user.id,
            movie_id= data['movie_id'],
            name= user.first_name,
            comment =data['comment']
        ) 
        #print("idUser",user.id,"movie",movie_id)
        serializer= ReviewSerializer(review,many=False)
        return Response(serializer.data)    

@api_view(['GET'])
def getReviews(request,pk):
        reviews= Review.objects.all()
        sendRevs=[]
      
        for i in reviews:
            if i.movie_id==int(pk):
                sendRevs.append(i)
        serializer= ReviewSerializer(sendRevs,many=True)
        return Response(serializer.data)    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delReview(request,pk):
        user=request.user
        review= Review.objects.get(_id=pk)
        if user.is_staff==True or user.id==review.user_id:
            review.delete()
            if user.is_staff == True:
                    try:
                        mod=Moderating.objects.get(user_id=user.id)
                        mod.score= mod.score+10
                        mod.name = user.first_name
                        mod.save()
                    except:
                        Moderating.objects.create(
                                user_id = user.id,
                                name = user.first_name,
                                score = 10                                
                        )

        return Response("Review Deleted")    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editReview(request,pk):
        user = request.user
        data =request.data
        review= Review.objects.get(_id=pk)
        review.comment =data['comment']

        review.save()
        serializer= ReviewSerializer(review,many=False)
        return Response(serializer.data) 


