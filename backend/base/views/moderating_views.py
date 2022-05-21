from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response



from ..models import *
from ..serializers import *

from rest_framework import status

@api_view(['GET'])
def getScores(request):
        mods=Moderating.objects.all()
        serializer= ModeratingSerializer(mods,many=True)
        return Response(serializer.data) 