from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
import pandas as pd

import os
from ..models import *
from ..serializers import *

from rest_framework import status




# cwd = os.getcwd()  # Get the current working directory (cwd)
# files = os.listdir(cwd)  # Get all the files in that directory
# print("Files in %r: %s" % (cwd, files))


# @api_view(['POST'])
# def read(request):
        
#         df = pd.read_csv('movie_metadata (1).csv')
        

#         final = pd.DataFrame(df, columns = ['actor_2_name', 'genres','actor_1_name','actor_3_name','movie_title','plot_keywords','title_year'])
#         for i in final.iterrows():
                
#                 print('i        ',i[1].actor_2_name)
#                 print()
                
#                 Movie.objects.create(
#                         actors = i[1].actor_1_name,
#                         genre = i[1].genres,
#                         release_date = i[1].title_year,
#                         bio = i[1].plot_keywords,
#                         name = i[1].movie_title
#                 )
#         return Response("read")

        
                
        
@api_view(['GET'])
def getMovies(request,pk):
        if int(pk)>=10:
                print("kaisii")
                Movies=Movie.objects.all().order_by('_id')[int(pk)-10:int(pk)]
                serializer= MovieSerializer(Movies,many=True)
                return Response(serializer.data) 
        else:
                Movies=Movie.objects.all().order_by('_id')[:10]
                serializer= MovieSerializer(Movies,many=True)
                return Response(serializer.data) 

@api_view(['GET'])
def getMovie(request, pk):
        try:
            
                M=Movie.objects.get(_id=pk)

                serializer= MovieSerializer(M,many=False)
                return Response(serializer.data) 
        except:
                return Response("nothing...")
@api_view(['DELETE'])
def delMovies(request):
        M=Movie.objects.all()
        M.delete()
        return Response("deleted") 




