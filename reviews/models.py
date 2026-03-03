from django.db import models

from core.models import Team


class Review(models.Model):
    objects = None
    name = models.CharField(max_length=100)
    email = models.EmailField()
    review = models.TextField()
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])  # 1-10 rating
    created_at = models.DateTimeField(auto_now_add=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='reviews', blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.rating}/10 {self.team.name}"