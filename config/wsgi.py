import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()

# superuser 자동 생성
try:
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username=os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin'),
            email=os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@lunchpick.com'),
            password=os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin1234!')
        )
        print("Superuser created successfully!")
except Exception as e:
    print(f"Superuser creation failed: {e}")