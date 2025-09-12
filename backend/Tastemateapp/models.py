from django.db import models
from accounts.models import MessOwner

class Messess(models.Model):
    user = models.ForeignKey(MessOwner, on_delete=models.CASCADE, related_name='messes')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    rating = models.FloatField()
    reviews = models.PositiveIntegerField(default=0)
    specialties = models.JSONField(default=list) # A JSONField is perfect for storing a list of strings
    openingHours = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2) # Use DecimalField for price to avoid floating-point issues
    recommended = models.BooleanField(default=False)
    likes = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='static/images', null=True, blank=True)
    tags = models.JSONField(default=list) # Another JSONField for a list of tags
    _id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return self.name