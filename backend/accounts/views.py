# accounts/views.py
#
# ACTION: Updated to use the new unified serializer and JWT views.
# =============================================================================
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserRegistrationSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class UserRegistrationView(generics.CreateAPIView):
    """
    A single endpoint for registering both Students and Mess Owners.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Prepare a custom success response
        response_data = {
            "message": "User registered successfully!",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "user_type": user.user_type
            }
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Handles user login and returns JWT tokens along with user data.
    """
    serializer_class = MyTokenObtainPairSerializer
