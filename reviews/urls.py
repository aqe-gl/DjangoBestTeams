from django.urls import path
from . import views

urlpatterns = [
    path('<int:team_id>', views.review_view, name='review_page'),
    path('', views.review_view, name='review_page'),
]