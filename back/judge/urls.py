from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as authtoken_views

from judge import views

router = DefaultRouter(trailing_slash=False)
router.register(r'competitions', views.CompetitionViewSet)
router.register(r'instances', views.InstanceViewSet)
router.register(r'submissions', views.SubmissionViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', authtoken_views.obtain_auth_token)
]
