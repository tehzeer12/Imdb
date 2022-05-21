from django.urls import path
from base.views import rating_views as views

urlpatterns=[
    path('add/',views.addRating,name='add-rating'),
    path('<str:pk>/',views.getRating,name='rating'),
    path('delete/<str:pk>/',views.delRating,name='delete-rating'),
    path('edit/<str:pk>/',views.editRating,name='edit-rating'),
    path('average/<str:pk>/',views.getAvgRating,name='avg-rating'),
]