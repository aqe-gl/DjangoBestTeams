from django.urls import path

from core.views import index
from core.views import team_details

urlpatterns = [
    path('', index, name='index'),
    path('team-details.html/<int:team_id>/', team_details, name='team-details')
]