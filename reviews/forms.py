from django import forms

from reviews.models import Review


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'email', 'review', 'rating']
        widgets = {
            'rating': forms.NumberInput(attrs={
                'min': 1,
                'max': 10,
                'placeholder': ' '
            }),
            'name': forms.TextInput(attrs={'placeholder': ' '}),
            'email': forms.EmailInput(attrs={'placeholder': ' '}),
            'review': forms.Textarea(attrs={
                'placeholder': ' ',
                'rows': 4
            }),
        }