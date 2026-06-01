from django.db import models
from django.contrib.auth.models import User


class Restaurant(models.Model):
    CATEGORY_CHOICES = [
        ('korean',   '한식'),
        ('chinese',  '중식'),
        ('japanese', '일식'),
        ('western',  '양식'),
        ('buffet',   '한식뷔페'),
        ('other',    '기타'),
    ]
    owner        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name         = models.CharField(max_length=100)
    category     = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    address      = models.CharField(max_length=200, blank=True)
    phone        = models.CharField(max_length=20, blank=True)
    distance     = models.CharField(max_length=50, blank=True)
    price_range  = models.CharField(max_length=100, blank=True)
    is_open      = models.BooleanField(default=True)
    is_buffet    = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class FixedMenu(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='fixed_menus')
    name       = models.CharField(max_length=100)
    price      = models.CharField(max_length=50, blank=True)
    is_active  = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.restaurant.name} - {self.name}'


class DailyMenu(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='daily_menus')
    date       = models.DateField()
    name       = models.CharField(max_length=100)
    note       = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.restaurant.name} - {self.date} - {self.name}'


class AdBanner(models.Model):
    company_name = models.CharField(max_length=100)
    tagline      = models.CharField(max_length=200, blank=True)
    phone        = models.CharField(max_length=20, blank=True)
    url          = models.URLField(blank=True)
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name