from django.shortcuts import render

from core.models import Team


# Create your views here.
def index(request):
    teams = Team.objects.all()
    fields = ['name', 'stadium', 'rating', 'trophies', 'league']
    image_map = {
        "Manchester United": "Manchester-United.png",
        "Real Madrid": "Real-Madrid.png",
        "Barcelona": "Barcelona.png",
        "Inter Milan": "Inter-Milan.jpg",
        "Liverpool": "Liverpool.png",
        "Borussia Dortmund": "Borussia-Dortmund.png",
        "Bayern Munich": "Bayern-Munich.png",
        "Paris Saint Germain": "Paris-Saint-Germain.png",
    }
    return render(request, 'main.html', {'teams': teams, 'fields': fields, 'image_map': image_map})