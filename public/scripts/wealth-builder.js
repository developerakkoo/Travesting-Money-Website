// Wealth Builder Portfolios Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeWealthBuilder();
});

function initializeWealthBuilder() {
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
    // Animate category cards on scroll
    const categoryCards = document.querySelectorAll('.category-card');
    
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
    
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate include cards
    const includeCards = document.querySelectorAll('.include-card');
    
    includeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
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
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
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
            const investmentAmount = this.querySelector('select[aria-label="Select investment amount"]').value;
            const riskProfile = this.querySelector('select[aria-label="Select risk profile"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !investmentAmount || !riskProfile || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you! We will contact you soon with portfolio recommendations.', 'success');
            
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
    const heroSection = document.querySelector('.wealth-hero');
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

// Add smooth reveal animation for category cards
function revealCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(revealCategoryCards, 500);
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

// Add scroll-triggered animations for include cards
function initializeIncludeCardAnimations() {
    const includeCards = document.querySelectorAll('.include-card');
    
    const includeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    includeCards.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        includeObserver.observe(item);
    });
}

// Initialize include card animations
document.addEventListener('DOMContentLoaded', function() {
    initializeIncludeCardAnimations();
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
    // Portfolio Access Toggle
    const portfolioToggle = document.getElementById('portfolio-toggle');
    if (portfolioToggle) {
        portfolioToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const halfYearOption = document.getElementById('portfolio-half-year');
            const annualOption = document.getElementById('portfolio-annual');
            
            if (isAnnual) {
                halfYearOption.classList.remove('active');
                annualOption.classList.add('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="wealth-builder"]');
                if (button) {
                    button.setAttribute('data-price', '15000');
                    button.textContent = 'Get Portfolio Access - ₹15,000';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹20,000';
                if (annualPrice) annualPrice.textContent = '₹15,000';
            } else {
                halfYearOption.classList.add('active');
                annualOption.classList.remove('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="wealth-builder"]');
                if (button) {
                    button.setAttribute('data-price', '20000');
                    button.textContent = 'Get Portfolio Access - ₹20,000';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹20,000';
                if (annualPrice) annualPrice.textContent = '₹15,000';
            }
        });
    }
    
    // Rebalancing Toggle
    const rebalancingToggle = document.getElementById('rebalancing-toggle');
    if (rebalancingToggle) {
        rebalancingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const halfYearOption = document.getElementById('rebalancing-half-year');
            const annualOption = document.getElementById('rebalancing-annual');
            
            if (isAnnual) {
                halfYearOption.classList.remove('active');
                annualOption.classList.add('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="wealth-builder"]');
                if (button) {
                    button.setAttribute('data-price', '3999');
                    button.textContent = 'Get Rebalancing - ₹3,999';
                }
                // Update pricing display
                const priceDisplay = document.querySelector('.rebalancing-price-display');
                if (priceDisplay) {
                    priceDisplay.textContent = '₹3,999 (33% off)';
                }
            } else {
                halfYearOption.classList.add('active');
                annualOption.classList.remove('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="wealth-builder"]');
                if (button) {
                    button.setAttribute('data-price', '2499');
                    button.textContent = 'Get Rebalancing - ₹2,499';
                }
                // Update pricing display
                const priceDisplay = document.querySelector('.rebalancing-price-display');
                if (priceDisplay) {
                    priceDisplay.textContent = '₹2,499';
                }
            }
        });
    }
} 