from django import views
from django.contrib import admin
from django.urls import path, include
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home-page'),
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
