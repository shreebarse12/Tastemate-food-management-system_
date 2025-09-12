
# =============================================================================
# accounts/admin.py
#
# ACTION: Register your models so you can see and manage them in the
# Django admin interface. This is very helpful for debugging.
# =============================================================================
from django.contrib import admin
from .models import User, MessOwner, Student

admin.site.register(User)
admin.site.register(MessOwner)
admin.site.register(Student)
