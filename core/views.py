from django.shortcuts import render

from core.models import Team


# Create your views here.
def index(request):
    teams = Team.objects.all()
    return render(request, 'main.html')