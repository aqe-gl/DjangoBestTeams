from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
class Team(models.Model):
    image = models.ImageField('COVER', upload_to='team_image', blank=True)
    name = models.CharField(max_length=30)
    stadium = models.CharField(max_length=50)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    trophies = models.IntegerField()
    league = models.TextField(max_length=50, blank=True)

    def __str__(self):
        return self.name
