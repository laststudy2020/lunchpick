from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'restaurants', views.RestaurantViewSet, basename='restaurant')
router.register(r'daily-menus', views.DailyMenuViewSet,  basename='dailymenu')
router.register(r'banners',     views.AdBannerViewSet,   basename='banner')

urlpatterns = [
    path('', include(router.urls)),
    path('today/', views.today_summary),
]