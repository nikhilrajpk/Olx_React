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
        fields = '__all__'

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
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise serializers.ValidationError("User must be authenticated to create a product.")
        print(f"request.user: {self.request.user}")
        serializer.save(user=self.request.user)
        
class AddProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(f"Request user: {request.user}")
        print(f"Is authenticated: {request.user.is_authenticated}")
        data = request.data
        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)