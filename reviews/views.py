from django.shortcuts import render, redirect, get_object_or_404

from core.models import Team
from .models import Review
from .forms import ReviewForm  # Make sure you have a form defined


def review_view(request, team_id=1):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            name = data['name']
            email = data['email']
            review = data['review']
            rating = data['rating']
            team = data['team']

            Review.objects.create(name=name, email=email, review=review, rating=rating, team=team)
            # Redirect to prevent form resubmission
            return redirect('review_page')
    else:
        form = ReviewForm()
    team = get_object_or_404(Team, id=team_id)
    reviews = Review.objects.filter(team=team).order_by('-created_at')  # Newest first
    return render(request, 'reviews.html', {'form': form, 'reviews': reviews, 'team': team})