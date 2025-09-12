# =============================================================================
# accounts/serializers.py
#
# ACTION: This file is heavily updated.
# - A single, smart UserRegistrationSerializer handles both user types.
# - A custom token serializer adds user data to the login response.
# =============================================================================
from rest_framework import serializers
from .models import User, MessOwner, Student
from django.db import transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserRegistrationSerializer(serializers.ModelSerializer):
    # These fields are for receiving data, but won't be part of the User model itself.
    # They are used to create the Student or MessOwner profile.
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)
    mess_name = serializers.CharField(write_only=True, required=False)
    location = serializers.CharField(write_only=True, required=False)
    enrollment_number = serializers.CharField(write_only=True, required=False)
    college = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'user_type',
            'mess_name', 'location', 'enrollment_number', 'college'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """
        Check that the required fields for the user type are provided.
        """
        user_type = data.get('user_type')
        if user_type == 'MESS_OWNER':
            if not data.get('mess_name') or not data.get('location'):
                raise serializers.ValidationError("Mess owners must provide mess_name and location.")
        elif user_type == 'STUDENT':
            if not data.get('enrollment_number') or not data.get('college'):
                raise serializers.ValidationError("Students must provide enrollment_number and college.")
        return data

    @transaction.atomic # Ensures all database operations succeed or none do.
    def create(self, validated_data):
        user_type = validated_data.pop('user_type')

        # Pop profile data from the validated_data
        mess_name = validated_data.pop('mess_name', None)
        location = validated_data.pop('location', None)
        enrollment_number = validated_data.pop('enrollment_number', None)
        college = validated_data.pop('college', None)

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=user_type
        )

        # Create the corresponding profile
        if user_type == 'MESS_OWNER':
            MessOwner.objects.create(user=user, mess_name=mess_name, location=location)
        elif user_type == 'STUDENT':
            Student.objects.create(user=user, enrollment_number=enrollment_number, college=college)

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customizes the JWT response to include user data.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.user_type
        return token

    def validate(self, attrs):
        # The default result is `{'access': '...', 'refresh': '...'}`
        data = super().validate(attrs)
        # Add user data to the response
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'username': self.user.username,
            'user_type': self.user.user_type
        }
        return data
