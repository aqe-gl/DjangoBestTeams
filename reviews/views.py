from django.shortcuts import render, redirect
from .models import Review
from .forms import ReviewForm  # Make sure you have a form defined


def review_view(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirect to prevent form resubmission
            return redirect('review_page')
    else:
        form = ReviewForm()

    reviews = Review.objects.all().order_by('-created_at')  # Newest first
    return render(request, 'reviews.html', {'form': form, 'reviews': reviews})