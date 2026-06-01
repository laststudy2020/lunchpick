from django.contrib import admin
from .models import Restaurant, FixedMenu, DailyMenu, AdBanner


class FixedMenuInline(admin.TabularInline):
    model   = FixedMenu
    extra   = 3


class DailyMenuInline(admin.TabularInline):
    model   = DailyMenu
    extra   = 1


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display   = ('name', 'category', 'price_range', 'is_open', 'is_buffet')
    list_filter    = ('category', 'is_open', 'is_buffet')
    search_fields  = ('name', 'address')
    inlines        = [FixedMenuInline, DailyMenuInline]


@admin.register(DailyMenu)
class DailyMenuAdmin(admin.ModelAdmin):
    list_display  = ('restaurant', 'date', 'name', 'note')
    list_filter   = ('date', 'restaurant')
    search_fields = ('name', 'restaurant__name')


@admin.register(AdBanner)
class AdBannerAdmin(admin.ModelAdmin):
    list_display  = ('company_name', 'tagline', 'phone', 'is_active')
    list_filter   = ('is_active',)