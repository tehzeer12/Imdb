from django.urls import path
from base.views import moderating_views as views

urlpatterns=[
    path('',views.getScores,name='scores'),    

]