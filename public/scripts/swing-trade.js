// Swing Trade Ideas Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSwingTrade();
});

function initializeSwingTrade() {
    initializeQA();
    initializeAnimations();
    initializeScrollEffects();
    initializeFormHandling();
    initializePricingToggles();
}

// Initialize Q&A functionality
function initializeQA() {
    const qaItems = document.querySelectorAll('.qa-item');
    
    qaItems.forEach(item => {
        const question = item.querySelector('.qa-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            qaItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate step cards
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        itemObserver.observe(card);
    });
    
    // Animate pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const tradingExperience = this.querySelector('select[aria-label="Select trading experience"]').value;
            const preferredPlan = this.querySelector('select[aria-label="Select preferred plan"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !tradingExperience || !preferredPlan || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you! We will contact you soon to start your swing trading journey.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        z-index: 1000;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add floating particles animation
function createFloatingParticles() {
    const heroSection = document.querySelector('.swing-hero');
    if (!heroSection) return;
    
    const particlesContainer = heroSection.querySelector('.floating-particles');
    
    // Create additional particles
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 4 + 6}s linear infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when page loads
window.addEventListener('load', function() {
    createFloatingParticles();
});

// Add smooth reveal animation for feature cards
function revealFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(revealFeatureCards, 500);
});

// Add hover effects for pricing cards
function initializePricingCardEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Initialize pricing card effects
document.addEventListener('DOMContentLoaded', function() {
    initializePricingCardEffects();
});

// Add scroll-triggered animations for step cards
function initializeStepCardAnimations() {
    const stepCards = document.querySelectorAll('.step-card');
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    stepCards.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        stepObserver.observe(item);
    });
}

// Initialize step card animations
document.addEventListener('DOMContentLoaded', function() {
    initializeStepCardAnimations();
});

// Add premium styling for featured pricing card
function initializeFeaturedCardStyling() {
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (!featuredCard) return;
    
    // Add subtle glow effect
    featuredCard.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15)';
    
    // Add pulse animation for the badge
    const badge = featuredCard.querySelector('.pricing-badge');
    if (badge) {
        badge.style.animation = 'pulse 2s ease-in-out infinite';
    }
}

// Add CSS for pulse animation
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize featured card styling
document.addEventListener('DOMContentLoaded', function() {
    addPulseAnimation();
    initializeFeaturedCardStyling();
});

// Add interactive pricing buttons
function initializePricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            // Show success notification
            showNotification(`Thank you for choosing ${plan}! We will contact you soon.`, 'success');
            
            // Scroll to contact form
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize pricing buttons
document.addEventListener('DOMContentLoaded', function() {
    initializePricingButtons();
});

// Initialize pricing toggles
function initializePricingToggles() {
    // Swing Trade Toggle
    const swingToggle = document.getElementById('swing-toggle');
    if (swingToggle) {
        swingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const halfYearOption = document.getElementById('swing-half-year');
            const annualOption = document.getElementById('swing-annual');
            
            if (isAnnual) {
                halfYearOption.classList.remove('active');
                annualOption.classList.add('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="swing-annual"]');
                if (button) {
                    button.setAttribute('data-price', '9999');
                    button.textContent = 'Start Swing Trading - ₹9,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹5,999';
                if (annualPrice) annualPrice.textContent = '₹9,999';
            } else {
                halfYearOption.classList.add('active');
                annualOption.classList.remove('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="swing-half-year"]');
                if (button) {
                    button.setAttribute('data-price', '5999');
                    button.textContent = 'Start Swing Trading - ₹5,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹5,999';
                if (annualPrice) annualPrice.textContent = '₹9,999';
            }
        });
    }
}

// Add feature card hover effects
function initializeFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize feature card effects
document.addEventListener('DOMContentLoaded', function() {
    initializeFeatureCardEffects();
});

// Add step card number animations
function initializeStepNumberAnimations() {
    const stepNumbers = document.querySelectorAll('.step-number');
    
    stepNumbers.forEach((number, index) => {
        number.style.animation = `bounceIn 0.6s ease ${index * 0.2}s both`;
    });
}

// Add CSS for bounce animation
function addBounceAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { 
                transform: translateX(-50%) scale(0.3);
                opacity: 0;
            }
            50% { 
                transform: translateX(-50%) scale(1.05);
            }
            70% { 
                transform: translateX(-50%) scale(0.9);
            }
            100% { 
                transform: translateX(-50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize step number animations
document.addEventListener('DOMContentLoaded', function() {
    addBounceAnimation();
    initializeStepNumberAnimations();
}); 