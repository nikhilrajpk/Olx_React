from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterUserView, LoginView, ProductViewSet, AddProductView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    path('products/', include(router.urls)),
    path('auth/register/', RegisterUserView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('add-product/', AddProductView.as_view(), name='add-product'),
]
