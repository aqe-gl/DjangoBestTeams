// static/js/main.js

class ReviewsApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupRatingInput();
        this.setupReviewAnimations();
        this.setupLikeButtons();
        this.setupFiltering();
        this.setupThemeToggle();
        this.setupCharacterCounter();
        this.setupFormSubmission();
    }

    setupFormValidation() {
        const form = document.querySelector('.material-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });

            input.addEventListener('input', (e) => {
                this.clearError(e.target);

                // Add floating label effect
                if (e.target.value.trim() !== '') {
                    e.target.classList.add('has-value');
                } else {
                    e.target.classList.remove('has-value');
                }
            });
        });

        // Form submission validation
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
                this.showFormError('Please fix the errors before submitting.');
            } else {
                this.showLoadingState();
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;

            case 'number':
                const numValue = parseInt(value);
                isValid = !isNaN(numValue) && numValue >= 1 && numValue <= 10;
                errorMessage = 'Please enter a rating between 1 and 10';
                break;

            default:
                isValid = value.length > 0;
                if (field.name === 'name') {
                    isValid = value.length >= 2;
                    errorMessage = 'Name must be at least 2 characters';
                } else if (field.name === 'review') {
                    isValid = value.length >= 10;
                    errorMessage = 'Review must be at least 10 characters';
                }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required], input:not([type="submit"]), textarea');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        this.clearError(field);

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #cf6679;
            font-size: 0.75rem;
            margin-top: 4px;
            animation: slideIn 0.3s ease;
        `;

        field.parentNode.appendChild(errorElement);
        field.classList.add('has-error');

        // Add shake animation
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('has-error');
    }

    showFormError(message) {
        // Remove existing form error
        const existingError = document.querySelector('.form-error');
        if (existingError) existingError.remove();

        const form = document.querySelector('.review-form');
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.innerHTML = `
            <span class="material-icons">error</span>
            <span>${message}</span>
        `;

        errorElement.style.cssText = `
            background: rgba(207, 102, 121, 0.1);
            border: 1px solid #cf6679;
            border-radius: 4px;
            padding: 12px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #cf6679;
            animation: slideIn 0.3s ease;
        `;

        form.insertBefore(errorElement, form.querySelector('form'));

        // Scroll to error
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setupRatingInput() {
        const ratingInput = document.getElementById('id_rating');
        if (!ratingInput) return;

        // Create star rating input
        const starContainer = document.createElement('div');
        starContainer.className = 'star-rating-input';
        starContainer.innerHTML = `
            <div class="stars">
                ${Array.from({ length: 10 }, (_, i) => 
                    `<span class="star" data-value="${i + 1}">★</span>`
                ).join('')}
            </div>
            <div class="rating-value">Select rating: <span>0</span>/10</div>
        `;

        ratingInput.parentNode.insertBefore(starContainer, ratingInput);
        ratingInput.style.display = 'none';

        const stars = starContainer.querySelectorAll('.star');
        const ratingValue = starContainer.querySelector('.rating-value span');

        stars.forEach(star => {
            star.addEventListener('mouseover', (e) => {
                const value = parseInt(e.target.dataset.value);
                this.highlightStars(stars, value);
            });

            star.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                ratingInput.value = value;
                ratingValue.textContent = value;
                this.highlightStars(stars, value);

                // Add selection animation
                e.target.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 300);
            });
        });

        starContainer.addEventListener('mouseleave', () => {
            const currentValue = parseInt(ratingInput.value) || 0;
            this.highlightStars(stars, currentValue);
        });
    }

    highlightStars(stars, value) {
        stars.forEach((star, index) => {
            if (index < value) {
                star.style.color = '#ffd700';
                star.style.transform = 'scale(1.1)';
            } else {
                star.style.color = '#e0e0e0';
                star.style.transform = 'scale(1)';
            }
        });
    }

    setupReviewAnimations() {
        // Animate review items on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.review-item').forEach(item => {
            observer.observe(item);
        });
    }

    setupLikeButtons() {
        // Add like functionality to reviews
        document.querySelectorAll('.review-item').forEach(item => {
            const likeButton = document.createElement('button');
            likeButton.className = 'like-button';
            likeButton.innerHTML = `
                <span class="material-icons">thumb_up</span>
                <span class="like-count">0</span>
            `;

            likeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleLike(likeButton);
            });

            const reviewFooter = item.querySelector('.review-footer');
            if (reviewFooter) {
                reviewFooter.appendChild(likeButton);
            }
        });
    }

    handleLike(button) {
        const icon = button.querySelector('.material-icons');
        const countSpan = button.querySelector('.like-count');
        let count = parseInt(countSpan.textContent);
        let isLiked = button.classList.contains('liked');

        if (isLiked) {
            count--;
            button.classList.remove('liked');
            icon.textContent = 'thumb_up';
            icon.style.color = '';
        } else {
            count++;
            button.classList.add('liked');
            icon.textContent = 'thumb_up_alt';
            icon.style.color = '#6200ee';
        }

        countSpan.textContent = count;

        // Animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
    }

    setupFiltering() {
        // Add rating filter
        const reviewsSection = document.querySelector('.reviews');
        if (!reviewsSection) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.innerHTML = `
            <div class="filter-header">
                <span class="material-icons">filter_list</span>
                Filter by rating:
            </div>
            <div class="filter-options">
                <button class="filter-btn active" data-rating="all">All</button>
                ${Array.from({ length: 10 }, (_, i) => 
                    `<button class="filter-btn" data-rating="${10 - i}">${10 - i}+</button>`
                ).join('')}
            </div>
        `;

        reviewsSection.insertBefore(filterContainer, reviewsSection.querySelector('.review-item') || reviewsSection);

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter reviews
                const rating = btn.dataset.rating;
                this.filterReviews(rating);
            });
        });
    }

    filterReviews(minRating) {
        const reviews = document.querySelectorAll('.review-item');

        reviews.forEach(review => {
            const ratingElement = review.querySelector('.ratings');
            if (ratingElement) {
                const ratingText = ratingElement.textContent;
                const rating = parseInt(ratingText.match(/\d+/)[0]);

                if (minRating === 'all' || rating >= minRating) {
                    review.style.display = 'block';
                    setTimeout(() => {
                        review.style.opacity = '1';
                        review.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    review.style.opacity = '0';
                    review.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        review.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    setupThemeToggle() {
        // Add theme toggle button
        const header = document.querySelector('.header-container');
        if (!header) return;

        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<span class="material-icons">dark_mode</span>';
        themeToggle.title = 'Toggle dark mode';

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('.material-icons');
            icon.textContent = document.body.classList.contains('dark-theme')
                ? 'light_mode'
                : 'dark_mode';

            // Save preference to localStorage
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Check saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('.material-icons').textContent = 'light_mode';
        }

        header.appendChild(themeToggle);
    }

    setupCharacterCounter() {
        const reviewTextarea = document.querySelector('textarea[name="review"]');
        if (!reviewTextarea) return;

        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500';

        reviewTextarea.parentNode.appendChild(counter);

        reviewTextarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            counter.textContent = `${length}/500`;

            if (length > 500) {
                counter.style.color = '#cf6679';
            } else if (length > 400) {
                counter.style.color = '#ff9800';
            } else {
                counter.style.color = 'var(--on-surface-lighter)';
            }
        });
    }

    setupFormSubmission() {
        const form = document.querySelector('.material-form');
        if (!form) return;

        // Handle successful submission (you'll need to adapt this based on your backend)
        form.addEventListener('submit', async (e) => {
            // If validation passes, we show loading state
            const submitBtn = form.querySelector('input[type="submit"]');
            const originalText = submitBtn.value;

            submitBtn.value = 'Submitting...';
            submitBtn.disabled = true;

            // Simulate API call (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset button state (in real app, this would be in your response handler)
            setTimeout(() => {
                submitBtn.value = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    showLoadingState() {
        const submitBtn = document.querySelector('input[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';
            submitBtn.disabled = true;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .review-item {
        transition: all 0.3s ease;
    }
    
    .review-item.animate-in {
        animation: slideIn 0.6s ease forwards;
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);