from django.urls import path
from .views import (CreateRoomAPIView, RegisterView,ProfileView, EmailTokenObtainPairView,)
from rest_framework_simplejwt.views import  TokenRefreshView


urlpatterns = [
    path('create/', CreateRoomAPIView.as_view()),
    path('register/', RegisterView.as_view(), name='register'),  
    path('profile/', ProfileView.as_view(), name='profile'),     
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
]