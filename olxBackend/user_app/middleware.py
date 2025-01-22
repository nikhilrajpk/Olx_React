# user_app/middleware.py
from django.http import JsonResponse
from django.contrib.auth import authenticate

class DebugAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = authenticate(request)
        if user is None:
            return JsonResponse({"error": "Unauthorized"}, status=401)
        return self.get_response(request)
