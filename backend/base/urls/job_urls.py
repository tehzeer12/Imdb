from django.urls import path
from base.views import job_views as views

urlpatterns = [
    path('create/',views.createApplication,name="application"),
]