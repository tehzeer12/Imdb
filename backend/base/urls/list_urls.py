from django.urls import path
from base.views import list_views as views

urlpatterns=[
    path('create/',views.createList,name='list-create'),    
    path('<str:pk>/',views.getList,name='list'),  
    path('delete/<str:pk>/',views.deList,name='list-delete'),  
]