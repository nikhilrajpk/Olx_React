from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    
class Products(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    price = models.CharField(max_length=10)
    category = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    product_image = models.ImageField(upload_to='product_image')
    created_at = models.DateTimeField(auto_now_add=True)