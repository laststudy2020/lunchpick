from rest_framework import serializers
from .models import Restaurant, FixedMenu, DailyMenu, AdBanner
from django.utils import timezone


class FixedMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FixedMenu
        fields = ['id', 'name', 'price', 'is_active']


class DailyMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model  = DailyMenu
        fields = ['id', 'date', 'name', 'note']


class RestaurantSerializer(serializers.ModelSerializer):
    fixed_menus = FixedMenuSerializer(many=True, read_only=True)
    daily_menus = serializers.SerializerMethodField()

    class Meta:
        model  = Restaurant
        fields = [
            'id', 'name', 'category', 'address', 'phone',
            'distance', 'price_range', 'is_open', 'is_buffet',
            'fixed_menus', 'daily_menus',
        ]

    def get_daily_menus(self, obj):
        today = timezone.localdate()
        menus = obj.daily_menus.filter(date=today)
        return DailyMenuSerializer(menus, many=True).data


class AdBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AdBanner
        fields = ['id', 'company_name', 'tagline', 'phone', 'url', 'is_active']