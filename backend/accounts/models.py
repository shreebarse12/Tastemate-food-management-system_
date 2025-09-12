from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ("STUDENT", "Student"),
        ("MESS_OWNER", "Mess Owner"),
    )
    user_type = models.CharField(
        max_length=50, choices=USER_TYPE_CHOICES, default="STUDENT"
    )
    # By default, AbstractUser uses 'username'. We will log in with email,
    # but keep the username field for display purposes.
    email = models.EmailField(unique=True)

    # This tells Django's authentication system to use the email field
    # as the unique identifier instead of the username.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] # 'username' is still required for user creation

    def __str__(self):
        return self.email

class MessOwner(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name='mess_owner_profile'
    )
    mess_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name='student_profile'
    )
    enrollment_number = models.CharField(max_length=255, unique=True)
    college = models.CharField(max_length=255)
