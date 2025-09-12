# =============================================================================
# accounts/urls.py
#
# ACTION: Simplified the URLs to use the new unified views.
# =============================================================================
from django.urls import path
from .views import UserRegistrationView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # A single endpoint for registration
    path('register/', UserRegistrationView.as_view(), name='register'),
    
    # Login endpoint that provides access and refresh tokens
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Endpoint to get a new access token using a refresh token
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

