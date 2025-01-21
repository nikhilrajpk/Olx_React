from django.contrib import admin
from .models import CustomUser, Products
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Products)