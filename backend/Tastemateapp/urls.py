# Tastemateapp/urls.py

from rest_framework.routers import DefaultRouter
from .views import MessessViewSet

router = DefaultRouter()
router.register(r'messes', MessessViewSet)

urlpatterns = router.urls