from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
class Team(models.Model):
    objects = None
    image = models.ImageField('COVER', upload_to='team_image', blank=True)
    name = models.CharField(max_length=30)
    stadium = models.CharField(max_length=50)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    trophies = models.IntegerField()
    league = models.TextField(max_length=50, blank=True)
    link = models.URLField('LINK', blank=True)

    def __str__(self):
        return f"{self.name} | {self.league}"


class Article(models.Model):
    objects = None
    description = models.TextField(max_length=367, blank=True)
    titles = models.IntegerField()
    league_picture = models.ImageField('LEAGUE', upload_to='league_pics', blank=True)
    link_to_site = models.URLField('LINK', blank=True)
    last_five = models.CharField(max_length=90)
    # Needs to be updated every match day
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='articles')  # Add this

    def __str__(self):
        return f"{self.team} | {self.last_five}"