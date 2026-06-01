from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import Restaurant, DailyMenu, AdBanner
from .serializers import RestaurantSerializer, DailyMenuSerializer, AdBannerSerializer


class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class DailyMenuViewSet(viewsets.ModelViewSet):
    serializer_class   = DailyMenuSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return DailyMenu.objects.filter(date=timezone.localdate())


class AdBannerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AdBannerSerializer
    queryset         = AdBanner.objects.filter(is_active=True)


@api_view(['GET'])
def today_summary(request):
    today      = timezone.localdate()
    restaurants = Restaurant.objects.filter(is_open=True)
    return Response({
        'date':        str(today),
        'total':       restaurants.count(),
        'restaurants': RestaurantSerializer(restaurants, many=True).data,
    })