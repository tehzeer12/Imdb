from django.urls import path
from base.views import review_views as views

urlpatterns=[
    path('add/',views.addReview,name='add-review'),
    path('<str:pk>/',views.getReviews,name='reviews'),
    path('delete/<str:pk>/',views.delReview,name='delete-review'),
    path('edit/<str:pk>/',views.editReview,name='edit-review'),
]