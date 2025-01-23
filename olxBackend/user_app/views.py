from django.shortcuts import render

from rest_framework import serializers, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Products
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.db import transaction
import logging


logger = logging.getLogger(__name__)

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'phone', 'address', 'password']
        
    def create(self, validated_data):
        password = validated_data.pop('password') 
        user = get_user_model().objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Products
        # fields = '__all__'
        fields = ['product_name', 'price', 'category', 'description', 'product_image', 'user', 'id', 'created_at']
        read_only_fields = ['user']
    
    # def validate_price(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError("Price must be greater than zero")
    #     return value
        
    def validate_product_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Product name cannot be empty")
        return value.strip()

# User Registration View
class RegisterUserView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'})
        return Response(serializer.errors, status=400)

# JWT Token View (Login)
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        print(f"Username: {username}, Password: {password}")
        
        # Check if the user exists
        user = get_user_model().objects.filter(username=username).first()
        if user:
            print(f"User found: {user.username}, Password correct: {user.check_password(password)}")
        else:
            print("User not found")

        user = authenticate(username=username, password=password)

        if user:
            userDetails = get_user_model().objects.get(username=user.username)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data,
                'userDetails': UserSerializer(userDetails).data,
            })
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_403_FORBIDDEN)

# Product ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [JWTAuthentication]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Allow anyone to view or retrieve products
            permission_classes = [permissions.AllowAny]
        else:  # Require authentication for create, update, or delete
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        print(f"request.user: {self.request.user}")
        if not self.request.user.is_authenticated:
            raise serializers.ValidationError("User must be authenticated to create a product.")
        serializer.save(user=self.request.user)
        
class AddProductView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        logger.info(f"Request META: {request.META.get('CONTENT_TYPE')}")
        logger.info(f"Request Files: {request.FILES}")
        logger.info(f"Request Data: {request.data}")
        logger.info(f"Authenticated User: {request.user.id}")
        
        try:
            data = request.data.copy()
            
            data['user'] = request.user.id
            
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                # Pass the user instance directly during save
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Error processing product upload: {str(e)}")
            return Response(
                {"error": "Failed to process product upload"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
class UpdateProductView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk, *args, **kwargs):
        try:
            # Retrieve the product
            product = Products.objects.get(pk=pk, user=request.user)
            
            # Create a mutable copy of the request data
            data = request.data.copy()
            
            # If no new image is provided, keep the existing image
            if 'product_image' not in data or data['product_image'] == 'null':
                data['product_image'] = product.product_image
            
            # Use partial=True to allow partial updates
            serializer = ProductSerializer(product, data=data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Products.DoesNotExist:
            return Response(
                {"error": "Product not found or you do not have permission to edit this product"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error updating product: {str(e)}")
            return Response(
                {"error": "Failed to update product"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    
    
    
    
    
    
    # def post(self, request, *args, **kwargs):
    #     logger.debug(f"Authorization Header: {request.headers.get('Authorization')}")
    #     logger.debug(f"Request User: {request.user}")
    #     logger.debug(f"Is Authenticated: {request.user.is_authenticated}")

        
    #     print(f"Request user: {request.user}")
    #     print(f"Is authenticated: {request.user.is_authenticated}")
        
        
    #     # if token:
    #     #     # Manually check the token validity (to test if it's being parsed)
    #     #     auth = JWTAuthentication()
    #     #     try:
    #     #         # Try to decode the token manually for debugging
    #     #         user, _ = auth.authenticate(request)
    #     #         print(f"Authenticated User: {user}")
    #     #     except Exception as e:
    #     #         print(f"Token authentication failed: {e}")
    #     #         return Response({"detail": "Authentication credentials are invalid."}, status=status.HTTP_401_UNAUTHORIZED)
    #     # else:
    #     #     return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        
    #     data = request.data
    #     serializer = ProductSerializer(data=data)

    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

