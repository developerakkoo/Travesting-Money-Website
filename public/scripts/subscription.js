// Subscription Page JavaScript
console.log('=== SUBSCRIPTION.JS LOADED ===');

// Simple test function
function testFunction() {
    console.log('Test function called successfully!');
    return true;
}

// Make it globally available
window.testFunction = testFunction;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    try {
        testFunction();
        console.log('=== TEST FUNCTION WORKED ===');
        initializePricingToggle();
        initializeFinHubPricingToggles();
        initializeFAQ();
        initializePaymentModal();
        initializeAnimations();
        initializeStripe();
        console.log('=== ALL FUNCTIONS INITIALIZED ===');
    } catch (error) {
        console.error('=== ERROR DURING INITIALIZATION ===', error);
    }
});

// Also try immediate execution
console.log('=== IMMEDIATE EXECUTION ===');
console.log('Document ready state:', document.readyState);
console.log('Window loaded:', typeof window !== 'undefined');

// Initialize pricing toggle
function initializePricingToggle() {
    console.log('Initializing pricing toggle...');
    const toggle = document.getElementById('billing-toggle');
    const amounts = document.querySelectorAll('.amount');
    const periods = document.querySelectorAll('.period');
    
    console.log('Toggle element:', toggle);
    console.log('Amount elements found:', amounts.length);
    console.log('Period elements found:', periods.length);
    
    if (!toggle) {
        console.error('Billing toggle not found!');
        return;
    }
    
    console.log('Adding event listener to toggle...');
    
    toggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        console.log('Toggle changed:', isAnnual ? 'Annual' : 'Monthly');
        
        amounts.forEach(amount => {
            const monthlyPrice = amount.getAttribute('data-monthly');
            const annualPrice = amount.getAttribute('data-annual');
            
            console.log('Updating amount:', monthlyPrice, '->', annualPrice);
            
            if (isAnnual) {
                amount.textContent = annualPrice;
                const periodElement = amount.closest('.plan-price').querySelector('.period');
                if (periodElement) {
                    periodElement.textContent = '/month (billed annually)';
                }
            } else {
                amount.textContent = monthlyPrice;
                const periodElement = amount.closest('.plan-price').querySelector('.period');
                if (periodElement) {
                    periodElement.textContent = '/month';
                }
            }
        });
        
        // Update subscribe button prices and text
        const subscribeButtons = document.querySelectorAll('.subscribe-btn');
        subscribeButtons.forEach(button => {
            const plan = button.getAttribute('data-plan');
            const monthlyPrice = button.getAttribute('data-monthly-price') || button.getAttribute('data-price');
            const annualPrice = button.getAttribute('data-annual-price');
            
            if (isAnnual && annualPrice) {
                button.setAttribute('data-price', annualPrice);
                button.textContent = `Subscribe - ₹${annualPrice}/month (billed annually)`;
            } else if (monthlyPrice) {
                button.setAttribute('data-price', monthlyPrice);
                button.textContent = `Subscribe - ₹${monthlyPrice}/month`;
            }
        });
    });
    
    // Initialize with current state
    console.log('Initial toggle state:', toggle.checked);
    
    // Trigger initial update
    toggle.dispatchEvent(new Event('change'));
    
    // Add test button functionality
    const testButton = document.getElementById('test-toggle');
    if (testButton) {
        testButton.addEventListener('click', function() {
            console.log('Test button clicked!');
            console.log('Current toggle state:', toggle.checked);
            
            // Toggle the checkbox manually
            toggle.checked = !toggle.checked;
            console.log('New toggle state:', toggle.checked);
            
            // Trigger the change event
            toggle.dispatchEvent(new Event('change'));
        });
    }
}

// Initialize FinHub pricing toggles
function initializeFinHubPricingToggles() {
    // Wealth Builder Portfolio Toggle
    const wealthToggle = document.getElementById('wealth-toggle');
    if (wealthToggle) {
        console.log('Found wealth toggle:', wealthToggle);
        wealthToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            console.log('Wealth toggle changed:', isAnnual ? 'Annual' : 'Half Year');
            
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
        console.log('Found swing toggle:', swingToggle);
        swingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            console.log('Swing toggle changed:', isAnnual ? 'Annual' : 'Half Year');
            
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
        console.log('Found exclusive toggle:', exclusiveToggle);
        exclusiveToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            console.log('Exclusive toggle changed:', isAnnual ? 'Annual' : 'Half Year');
            
            const halfYearOption = document.getElementById('exclusive-half-year');
            const exclusiveAnnualOption = document.getElementById('exclusive-annual');
            
            if (isAnnual) {
                halfYearOption.classList.remove('active');
                exclusiveAnnualOption.classList.add('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="travesting-exclusive"]');
                if (button) {
                    button.setAttribute('data-price', '12999');
                    button.innerHTML = '<i class="fas fa-crown"></i> Get Exclusive Access - ₹12,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = exclusiveAnnualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹7,999';
                if (annualPrice) annualPrice.textContent = '₹12,999';
            } else {
                halfYearOption.classList.add('active');
                exclusiveAnnualOption.classList.remove('active');
                // Update button price and text
                const button = document.querySelector('[data-plan="travesting-exclusive"]');
                if (button) {
                    button.setAttribute('data-price', '7999');
                    button.innerHTML = '<i class="fas fa-crown"></i> Get Exclusive Access - ₹7,999';
                }
                // Update visible prices
                const halfYearPrice = halfYearOption.querySelector('.price');
                const annualPrice = exclusiveAnnualOption.querySelector('.price');
                if (halfYearPrice) halfYearPrice.textContent = '₹7,999';
                if (annualPrice) annualPrice.textContent = '₹12,999';
            }
        });
    }
}

// Initialize FAQ accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize payment modal
function initializePaymentModal() {
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.getElementById('modal-close');
    const paymentForm = document.getElementById('payment-form');
    
    // Open modal on subscribe button click
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            const isAnnual = document.getElementById('billing-toggle').checked;
            
            // Update modal content
            document.getElementById('selected-plan').textContent = `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`;
            document.getElementById('selected-price').textContent = `₹${price}/${isAnnual ? 'month (billed annually)' : 'month'}`;
            
            // Store selected plan data
            modal.setAttribute('data-plan', plan);
            modal.setAttribute('data-price', price);
            modal.setAttribute('data-billing', isAnnual ? 'annual' : 'monthly');
            
            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Handle form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Handle payment form submission
async function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(form);
        const plan = document.getElementById('payment-modal').getAttribute('data-plan');
        const price = document.getElementById('payment-modal').getAttribute('data-price');
        const billing = document.getElementById('payment-modal').getAttribute('data-billing');
        
        // Validate form
        if (!validatePaymentForm(formData)) {
            throw new Error('Please fill in all required fields correctly.');
        }
        
        // Simulate payment processing
        await simulatePaymentProcessing();
        
        // Show success message
        showNotification('Payment successful! Welcome to Travesting Money Premium.', 'success');
        
        // Close modal
        closeModal();
        
        // Reset form
        form.reset();
        
        // Redirect to dashboard or show welcome message
        setTimeout(() => {
            window.location.href = 'index.html?subscription=success';
        }, 2000);
        
    } catch (error) {
        console.error('Payment error:', error);
        showNotification(error.message || 'Payment failed. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Validate payment form
function validatePaymentForm(formData) {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCvc = document.getElementById('card-cvc').value.trim();
    const email = document.getElementById('email').value.trim();
    const terms = document.getElementById('terms').checked;
    
    if (!cardName || cardName.length < 2) {
        throw new Error('Please enter a valid cardholder name.');
    }
    
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
        throw new Error('Please enter a valid card number.');
    }
    
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        throw new Error('Please enter expiry date in MM/YY format.');
    }
    
    if (!cardCvc || cardCvc.length < 3 || cardCvc.length > 4) {
        throw new Error('Please enter a valid CVC.');
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
    }
    
    if (!terms) {
        throw new Error('Please accept the terms and conditions.');
    }
    
    return true;
}

// Simulate payment processing
function simulatePaymentProcessing() {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Payment declined. Please check your card details.'));
            }
        }, 2000);
    });
}

// Initialize Stripe (placeholder for real integration)
function initializeStripe() {
    // This would be replaced with actual Stripe integration
    console.log('Stripe integration ready');
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }
    
    // Format expiry date input
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Format CVC input
    const cardCvcInput = document.getElementById('card-cvc');
    if (cardCvcInput) {
        cardCvcInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    }
}

// Initialize animations
function initializeAnimations() {
    // Animate hero section
    gsap.from('.subscription-hero .hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.subscription-hero .hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    });
    
    gsap.from('.subscription-hero .hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4
    });
    
    gsap.from('.subscription-hero .hero-stats', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.6
    });
    
    gsap.from('.subscription-preview', {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
    });
    
    // Animate features
    gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate pricing cards
    gsap.from('.pricing-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate FAQ items
    gsap.from('.faq-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.faq-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Show notification (reuse from main.js if available)
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Create simple notification
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
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// Add hover effects for pricing cards
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Add smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && document.activeElement.classList.contains('subscribe-btn')) {
        document.activeElement.click();
    }
});

// Performance optimization functions are already available from main.js

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #6366f1';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ARIA labels for better accessibility
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    subscribeButtons.forEach((button, index) => {
        const plan = button.getAttribute('data-plan');
        button.setAttribute('aria-label', `Subscribe to ${plan} plan`);
    });
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#pricing';
    skipLink.textContent = 'Skip to pricing';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Export functions for global access
window.closeModal = closeModal;
window.showNotification = showNotification; 