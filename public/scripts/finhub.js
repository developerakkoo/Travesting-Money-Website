// FinHub Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeFinHub();
});

function initializeFinHub() {
    initializeQA();
    initializeAnimations();
    initializeScrollEffects();
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
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
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
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate roadmap items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    roadmapItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        itemObserver.observe(item);
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

// Form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !service || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you! We will contact you soon.', 'success');
            
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

// Initialize form handling when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandling();
});

// Add floating particles animation
function createFloatingParticles() {
    const heroSection = document.querySelector('.finhub-hero');
    if (!heroSection) return;
    
    const particlesContainer = heroSection.querySelector('.floating-particles');
    
    // Create additional particles
    for (let i = 0; i < 5; i++) {
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

// Add smooth reveal animation for service cards
function revealServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(revealServiceCards, 500);
});

// Add hover effects for mentor card
function initializeMentorCardEffects() {
    const mentorCard = document.querySelector('.mentor-card');
    if (!mentorCard) return;
    
    mentorCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    mentorCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize mentor card effects
document.addEventListener('DOMContentLoaded', function() {
    initializeMentorCardEffects();
});

// Add scroll-triggered animations for roadmap
function initializeRoadmapAnimations() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    const roadmapObserver = new IntersectionObserver((entries) => {
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
    
    roadmapItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        roadmapObserver.observe(item);
    });
}

// Initialize roadmap animations
document.addEventListener('DOMContentLoaded', function() {
    initializeRoadmapAnimations();
});

// Add premium service card effects
function initializePremiumCardEffects() {
    const premiumCard = document.querySelector('.service-card.premium');
    if (!premiumCard) return;
    
    // Add sparkle effect
    const sparkles = document.createElement('div');
    sparkles.className = 'sparkles';
    sparkles.innerHTML = `
        <div class="sparkle sparkle-1"></div>
        <div class="sparkle sparkle-2"></div>
        <div class="sparkle sparkle-3"></div>
        <div class="sparkle sparkle-4"></div>
    `;
    
    premiumCard.appendChild(sparkles);
    
    // Add CSS for sparkles
    const style = document.createElement('style');
    style.textContent = `
        .sparkles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            animation: sparkle 2s ease-in-out infinite;
        }
        
        .sparkle-1 { top: 20%; left: 20%; animation-delay: 0s; }
        .sparkle-2 { top: 30%; right: 30%; animation-delay: 0.5s; }
        .sparkle-3 { top: 70%; left: 40%; animation-delay: 1s; }
        .sparkle-4 { top: 80%; right: 20%; animation-delay: 1.5s; }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize premium card effects
document.addEventListener('DOMContentLoaded', function() {
    initializePremiumCardEffects();
});

// Initialize pricing toggles
function initializePricingToggles() {
    // Wealth Builder Portfolio Toggle
    const wealthToggle = document.getElementById('wealth-toggle');
    if (wealthToggle) {
        wealthToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const halfYearOption = document.getElementById('wealth-half-year');
            const annualOption = document.getElementById('wealth-annual');
            
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
    
    // Swing Trade Ideas Toggle
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
                const button = document.querySelector('[data-plan="swing-trade"]');
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
                const button = document.querySelector('[data-plan="swing-trade"]');
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
    
    // Travesting Exclusive Toggle
    const exclusiveToggle = document.getElementById('exclusive-toggle');
    if (exclusiveToggle) {
        exclusiveToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const halfYearOption = document.getElementById('exclusive-half-year');
            const annualOption = document.getElementById('exclusive-annual');
            
            if (isAnnual) {
                halfYearOption.classList.remove('active');
                annualOption.classList.add('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="travesting-exclusive"]');
                if (button) {
                    button.textContent = 'Get Exclusive Access - ₹12,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹7,999';
                if (annualPrice) annualPrice.textContent = '₹12,999';
            } else {
                halfYearOption.classList.add('active');
                annualOption.classList.remove('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="travesting-exclusive"]');
                if (button) {
                    button.textContent = 'Get Exclusive Access - ₹7,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = annualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹7,999';
                if (annualPrice) annualPrice.textContent = '₹12,999';
            }
        });
    }
} 