from django.shortcuts import render, get_object_or_404

from core.models import Team


# Create your views here.
def index(request):
    path = request.path
    path = path.replace("/", '')
    if path == '':
        path = 'main'
        print(path)
    teams = Team.objects.all()
    fields = ['name', 'stadium', 'rating', 'trophies', 'league']
    team = ['manutd', 'realmadrid', 'barca', 'liverpool', 'mancity',
            'bayern', 'dortmund', 'inter', 'milan', 'psg']
    return render(request, 'main.html', {'teams': teams, 'fields': fields, 'team': team})

def team_details(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    teams = Team.objects.all()
    return render(request, 'team-details.html', {'team': team, 'teams': teams})
