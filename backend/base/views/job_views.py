from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..models import *
from ..serializers import *
from rest_framework import generics, viewsets



@api_view(['POST'])
def createApplication(request):
    try:
        data = request.data
        job=Job.objects.create(
                job_title = data['title'],
                jd = data['jd'],
                dept_name = data['dpt'],
                location = data['location'],
            )
        serializer= JobSerializer(job,many=False)
        return Response(serializer.data)
    except:
        return Response("Could not add the application") 