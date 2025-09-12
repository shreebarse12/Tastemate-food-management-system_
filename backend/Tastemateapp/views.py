# Tastemateapp/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Messess
from .serializers import MessessSerializer
from accounts.models import MessOwner
# from  import serializers

class MessessViewSet(viewsets.ModelViewSet):
    queryset = Messess.objects.all()
    serializer_class = MessessSerializer
    permission_classes = [IsAuthenticated]

    # This method ensures that a mess is only created for the authenticated mess owner.
    def perform_create(self, serializer):
        user = self.request.user
        try:
            mess_owner_profile = MessOwner.objects.get(user=user)
            serializer.save(user=mess_owner_profile)
        except MessOwner.DoesNotExist:
            raise serializers.ValidationError("Only a Mess Owner can create a mess.")

    # This method ensures a mess owner can only see their own messes.
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'MESS_OWNER':
            try:
                mess_owner_profile = MessOwner.objects.get(user=user)
                return Messess.objects.filter(user=mess_owner_profile)
            except MessOwner.DoesNotExist:
                return Messess.objects.none() # Return empty queryset if no mess owner profile
        # For now, we'll let other users (e.g., students) see all messes.
        # You can add more specific permissions later.
        return Messess.objects.all()