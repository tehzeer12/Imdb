from django.urls import path
from base.views import movie_views as views

urlpatterns=[
    
    # path('read/',views.read,name='movies-read'),
    path('delete/',views.delMovies,name='movies-delete'),
    path('page/<str:pk>/',views.getMovies,name='movies'),
    path('<str:pk>/',views.getMovie,name='movie'),    

    
]