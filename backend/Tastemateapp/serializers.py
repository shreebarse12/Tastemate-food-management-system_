from rest_framework import serializers
from .models import Messess

class MessessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messess
        fields = '__all__'
        # The '__all__' shortcut includes all fields from the model.
        # Alternatively, you can list the fields explicitly for better control:
        # fields = ['_id', 'user', 'name', 'location', 'rating', 'reviews', 'specialties', 
        #           'openingHours', 'price', 'recommended', 'likes', 'image', 'tags']