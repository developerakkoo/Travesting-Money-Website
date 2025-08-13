// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeTradingDashboard();
    initializeFormHandling();
    initializeScrollEffects();
    initializeMarketTime();
    initializeResponsiveFeatures();
    initializeServicesSlider();
    initializeQA();
    
    // Initialize stock trading
    initStockTrading();
    
    // Initialize market indicators
    initMarketIndicators();
    
    // Initialize blogs if on homepage (blogs.js handles this now)
    console.log('Checking for blogs grid...');
    if (document.querySelector('#blogs-grid')) {
        console.log('Blogs grid found, blogs.js will handle initialization');
    }
    
    // Ensure hero section is visible
    ensureHeroVisibility();
    
    // Ensure mentorship section is visible after all GSAP animations are set up
    setTimeout(() => {
        ensureMentorshipVisibility();
    }, 200);
});

// Initialize responsive features
function initializeResponsiveFeatures() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Add mobile-specific classes
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Handle viewport changes
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleViewportChange();
        }, 250);
    });
    
    // Touch event optimizations for mobile
    if (isMobile) {
        // Add touch feedback to buttons
        const touchElements = document.querySelectorAll('.btn, .nav-link, .trade-btn, .contact-item, .course-card, .mentor-card, .resource-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            handleViewportChange();
        }, 100);
    });
}

// Ensure hero section is visible
function ensureHeroVisibility() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Force hero elements to be visible on mobile
        gsap.set('.hero-badge', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-title', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-description', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-cta', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-stats', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.trading-dashboard', { opacity: 1, x: 0, clearProps: 'all' });
        gsap.set('.market-indicators', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-visual', { opacity: 1, x: 0, clearProps: 'all' });
        gsap.set('.hero-content', { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set('.hero-container', { opacity: 1, clearProps: 'all' });
        gsap.set('.hero', { opacity: 1, clearProps: 'all' });
    }
    
    // Double-check visibility after a short delay
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-stats, .trading-dashboard, .market-indicators, .hero-visual, .hero-content');
        heroElements.forEach(element => {
            if (element.style.opacity === '0' || getComputedStyle(element).opacity === '0') {
                gsap.set(element, { opacity: 1, clearProps: 'all' });
            }
        });
    }, 100);
}

// Handle viewport changes
function handleViewportChange() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;
    
    // Update body classes
    document.body.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Ensure hero elements are visible on mobile
        gsap.set('.hero-badge', { opacity: 1, y: 0 });
        gsap.set('.hero-title', { opacity: 1, y: 0 });
        gsap.set('.hero-description', { opacity: 1, y: 0 });
        gsap.set('.hero-cta', { opacity: 1, y: 0 });
        gsap.set('.hero-stats', { opacity: 1, y: 0 });
        gsap.set('.trading-dashboard', { opacity: 1, x: 0 });
        gsap.set('.market-indicators', { opacity: 1, y: 0 });
        gsap.set('.hero-visual', { opacity: 1, x: 0 });
        gsap.set('.hero-content', { opacity: 1, y: 0 });
        
        // Reduce animation complexity on mobile
        gsap.set('.floating-particles', { opacity: 0.3 });
        gsap.set('.data-streams', { opacity: 0.2 });
    } else {
        if (isTablet) {
            document.body.classList.add('tablet-device');
        } else {
            document.body.classList.add('desktop-device');
        }
        
        // Restore full animations on desktop
        gsap.set('.floating-particles', { opacity: 1 });
        gsap.set('.data-streams', { opacity: 1 });
    }
    
    // Recalculate GSAP ScrollTrigger
    ScrollTrigger.refresh();
}

// Update scroll effects with performance optimization
function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Optimized navbar scroll effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize all animations
function initializeAnimations() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, ensure hero elements are visible immediately
        gsap.set('.hero-badge', { opacity: 1, y: 0 });
        gsap.set('.hero-title', { opacity: 1, y: 0 });
        gsap.set('.hero-description', { opacity: 1, y: 0 });
        gsap.set('.hero-cta', { opacity: 1, y: 0 });
        gsap.set('.hero-stats', { opacity: 1, y: 0 });
        gsap.set('.trading-dashboard', { opacity: 1, x: 0 });
        gsap.set('.market-indicators', { opacity: 1, y: 0 });
        gsap.set('.hero-visual', { opacity: 1, x: 0 });
        gsap.set('.hero-content', { opacity: 1, y: 0 });
        
        // Disable complex animations on mobile for performance
        return;
    }
    
    // Desktop animations
    const heroTl = gsap.timeline();
    
    heroTl
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.hero-cta', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.trading-dashboard', {
            opacity: 0,
            x: 100,
            duration: 1,
            ease: 'power2.out'
        }, '-=1')
        .from('.market-indicators', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

    // Animate trading dashboard elements
    gsap.from('.chart-line', {
        scaleX: 0,
        duration: 2,
        ease: 'power2.out',
        delay: 1
    });

    gsap.from('.point', {
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 2
    });

    gsap.from('.bar', {
        scaleY: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 2.5
    });

    // Scroll-triggered animations
    gsap.from('.section-header', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Course cards animation
    gsap.from('.course-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.courses-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Mentor cards animation
    // gsap.from('.mentor-card', {
    //     opacity: 0,
    //     y: 50,
    //     duration: 0.8,
    //     stagger: 0.2,
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //         trigger: '.mentorship-grid',
    //         start: 'top 80%',
    //         end: 'bottom 20%',
    //         toggleActions: 'play none none reverse'
    //     }
    // });

    // Resource cards animation
 
    

    // About section animations
    // gsap.from('.about-features .feature', {
    //     opacity: 0,
    //     x: -50,
    //     duration: 0.8,
    //     stagger: 0.2,
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //         trigger: '.about-features',
    //         start: 'top 80%',
    //         end: 'bottom 20%',
    //         toggleActions: 'play none none reverse'
    //     }
    // });

    // gsap.from('.stat-card', {
    //     opacity: 0,
    //     y: 30,
    //     duration: 0.8,
    //     stagger: 0.2,
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //         trigger: '.about-stats',
    //         start: 'top 80%',
    //         end: 'bottom 20%',
    //         toggleActions: 'play none none reverse'
    //     }
    // });

    // Counter animation for stats
    animateCounters();
}

// Initialize navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navClose = document.getElementById('nav-close');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking close button
    if (navClose) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    }

    // Close mobile menu when clicking on any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Always close mobile menu when any nav link is clicked
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Smooth scrolling for navigation links (only internal anchors)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default and smooth scroll for internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // External links (like finhub.html) will navigate normally
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // Navbar background on scroll - Keep light theme
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize trading dashboard
function initializeTradingDashboard() {
    // Simulate real-time price updates
    const stockPrice = document.querySelector('.stock-price');
    const stockChange = document.querySelector('.stock-change');
    const stockSymbol = document.querySelector('.stock-symbol');
    const chartLine = document.querySelector('.chart-line');
    const chartAreaPath = document.querySelector('.chart-area-path');
    const notification = document.getElementById('trade-result-notification');
    const notificationTitle = document.getElementById('notification-title');
    const notificationMessage = document.getElementById('notification-message');
    const notificationIcon = document.querySelector('.notification-icon i');
    
    const stocks = [
        { symbol: 'RELIANCE', basePrice: 2450.75, volatility: 0.02 },
        { symbol: 'TCS', basePrice: 3850.20, volatility: 0.015 },
        { symbol: 'HDFC BANK', basePrice: 1650.45, volatility: 0.025 },
        { symbol: 'INFOSYS', basePrice: 1450.30, volatility: 0.018 },
        { symbol: 'ICICI BANK', basePrice: 950.80, volatility: 0.022 }
    ];

    let currentStockIndex = 0;
    let currentPrice = stocks[0].basePrice;
    let isAnimating = false;

    function updateStockPrice() {
        if (isAnimating) return;
        
        const stock = stocks[currentStockIndex];
        const change = (Math.random() - 0.5) * stock.volatility * currentPrice;
        currentPrice = Math.max(0, currentPrice + change);
        
        const changePercent = (change / (currentPrice - change)) * 100;
        const isPositive = change >= 0;
        
        if (stockPrice) {
            stockPrice.textContent = `₹${currentPrice.toFixed(2)}`;
        }
        
        if (stockChange) {
            stockChange.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`;
            stockChange.className = `stock-change ${isPositive ? 'positive' : 'negative'}`;
        }
        
        if (stockSymbol) {
            stockSymbol.textContent = stock.symbol;
        }
        
        // Update chart animation
        if (chartLine && chartAreaPath) {
            chartLine.className = `chart-line ${isPositive ? 'profit' : 'loss'}`;
            chartAreaPath.className = `chart-area-path ${isPositive ? 'profit' : 'loss'}`;
        }
    }

    function showTradeResult(action) {
        if (isAnimating) return;
        isAnimating = true;
        
        const profit = Math.random() > 0.5;
        const amount = (Math.random() * 100 + 10).toFixed(2);
        
        // Update notification content
        if (notificationTitle) {
            notificationTitle.textContent = profit ? 'Trade Successful!' : 'Trade Failed!';
        }
        
        if (notificationMessage) {
            notificationMessage.textContent = profit ? `You made a profit of ₹${amount}` : `You lost ₹${amount}`;
        }
        
        // Update notification icon
        if (notificationIcon) {
            notificationIcon.className = profit ? 'fas fa-check-circle' : 'fas fa-times-circle';
            notificationIcon.parentElement.className = `notification-icon ${profit ? 'success' : 'loss'}`;
        }
        
        // Show notification
        if (notification) {
            notification.style.display = 'block';
        }
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            if (notification) {
                notification.style.display = 'none';
            }
            isAnimating = false;
        }, 3000);
    }

    // Trading buttons interaction
    const tradeButtons = document.querySelectorAll('.trade-btn');
    tradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('buy') ? 'buy' : 'sell';
            showTradeResult(action);
            
            // Add click animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Update price every 3 seconds
    setInterval(updateStockPrice, 3000);

    // Change stock every 10 seconds
    setInterval(() => {
        currentStockIndex = (currentStockIndex + 1) % stocks.length;
        currentPrice = stocks[currentStockIndex].basePrice;
        updateStockPrice();
    }, 10000);

    // Market indicators animation
    const indicators = document.querySelectorAll('.indicator-value');
    indicators.forEach(indicator => {
        gsap.to(indicator, {
            opacity: 0.7,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut'
        });
    });
}

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const program = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !program) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    gsap.to('.market-grid', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Fade in elements on scroll
    // const fadeElements = document.querySelectorAll('.course-card, .resource-card, .stat-card');
    // fadeElements.forEach(element => {
    //     gsap.from(element, {
    //         opacity: 0,
    //         y: 50,
    //         duration: 0.8,
    //         ease: 'power2.out',
    //         scrollTrigger: {
    //             trigger: element,
    //             start: 'top 85%',
    //             end: 'bottom 15%',
    //             toggleActions: 'play none none reverse'
    //         }
    //     });
    // });

    // Stagger animation for grid items - EXCLUDE mentorship grid to prevent visibility issues
    const gridItems = document.querySelectorAll('.courses-grid, .resources-grid');
    gridItems.forEach(grid => {
        const items = grid.children;
        gsap.from(items, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Ensure mentorship section is always visible and not affected by GSAP animations
    const mentorshipSection = document.querySelector('.mentorship');
    const mentorCard = document.querySelector('.mentor-card');
    
    if (mentorshipSection && mentorCard) {
        // Set initial visibility
        gsap.set(mentorshipSection, { opacity: 1, visibility: 'visible' });
        gsap.set(mentorCard, { opacity: 1, visibility: 'visible', y: 0 });
        
        // Prevent any GSAP animations from affecting these elements
        gsap.set('.mentorship-grid', { clearProps: 'all' });
        gsap.set('.mentor-card', { clearProps: 'all' });
    }
}

// Initialize market time
function initializeMarketTime() {
    const timeDisplay = document.getElementById('market-time');
    const chartTimeDisplay = document.getElementById('chart-time');
    
    function updateMarketTime() {
        const now = new Date();
        
        // Update market time (EST)
        if (timeDisplay) {
            const options = {
                timeZone: 'America/New_York',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            };
            
            const marketTime = now.toLocaleTimeString('en-US', options);
            timeDisplay.textContent = marketTime + ' EST';
            
            // Check if market is open (9:30 AM - 4:00 PM EST, Monday-Friday)
            const marketOpen = now.getDay() >= 1 && now.getDay() <= 5; // Monday to Friday
            const marketHour = now.getHours();
            const marketMinute = now.getMinutes();
            
            const isOpen = marketOpen && 
                          ((marketHour === 9 && marketMinute >= 30) || 
                           (marketHour > 9 && marketHour < 16) ||
                           (marketHour === 16 && marketMinute === 0));
            
            const statusIndicator = document.querySelector('.status-indicator');
            const statusText = document.querySelector('.market-status span');
            
            if (statusIndicator && statusText) {
                if (isOpen) {
                    statusIndicator.className = 'status-indicator live';
                    statusText.textContent = 'Market Open';
                } else {
                    statusIndicator.className = 'status-indicator';
                    statusText.textContent = 'Market Closed';
                }
            }
        }
        
        // Update chart time (IST)
        if (chartTimeDisplay) {
            const istOptions = {
                timeZone: 'Asia/Kolkata',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            };
            
            const istTime = now.toLocaleTimeString('en-US', istOptions);
            chartTimeDisplay.textContent = istTime + ' IST';
        }
    }
    
    updateMarketTime();
    setInterval(updateMarketTime, 1000);
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

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d,]/g, '');
        
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            onUpdate: function() {
                const currentValue = Math.floor(this.targets()[0].innerHTML);
                counter.textContent = currentValue.toLocaleString() + suffix;
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.querySelector('.notification-container');
    
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notificationContainer.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    }, 5000);
}

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.course-card, .mentor-card, .resource-card');
    
    cards.forEach(card => {
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

// Add loading animation
window.addEventListener('load', function() {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Add smooth scroll behavior for all internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
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

// Add intersection observer for lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

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
    const socialLinks = document.querySelectorAll('.social-links a');
    const socialPlatforms = ['LinkedIn', 'Twitter', 'YouTube', 'Instagram'];
    
    socialLinks.forEach((link, index) => {
        if (socialPlatforms[index]) {
            link.setAttribute('aria-label', `Follow us on ${socialPlatforms[index]}`);
        }
    });
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
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

// Add main content ID for skip link
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}); 

// Stock Trading Simulation
const stocks = [
    { name: 'RELIANCE', basePrice: 2450, volatility: 0.05 },
    { name: 'TCS', basePrice: 3850, volatility: 0.03 },
    { name: 'HDFC BANK', basePrice: 1650, volatility: 0.04 },
    { name: 'INFOSYS', basePrice: 1450, volatility: 0.03 },
    { name: 'ICICI BANK', basePrice: 950, volatility: 0.06 },
    { name: 'HINDUNILVR', basePrice: 2450, volatility: 0.02 },
    { name: 'ITC', basePrice: 420, volatility: 0.04 },
    { name: 'SBIN', basePrice: 650, volatility: 0.05 },
    { name: 'BHARTIARTL', basePrice: 1150, volatility: 0.04 },
    { name: 'AXIS BANK', basePrice: 1050, volatility: 0.06 }
];

let currentStock = stocks[0];
let currentPrice = 0;
let isTradeResultShowing = false;

// Generate random stock price
function generateStockPrice(stock) {
    const volatility = stock.volatility;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = stock.basePrice * (1 + change);
    return Math.round(newPrice * 100) / 100;
}

// Update stock display
function updateStockDisplay() {
    if (isTradeResultShowing) return;
    
    currentStock = stocks[Math.floor(Math.random() * stocks.length)];
    currentPrice = generateStockPrice(currentStock);
    const previousPrice = currentStock.basePrice;
    const change = currentPrice - previousPrice;
    const changePercent = ((change / previousPrice) * 100).toFixed(2);
    
    // Update TV screen
    document.getElementById('stock-name').textContent = currentStock.name;
    document.getElementById('stock-price').textContent = `₹${currentPrice.toLocaleString()}`;
    
    const stockChangeElement = document.getElementById('stock-change');
    if (change >= 0) {
        stockChangeElement.textContent = `+${change.toFixed(2)} (+${changePercent}%)`;
        stockChangeElement.className = 'stock-change positive';
    } else {
        stockChangeElement.textContent = `${change.toFixed(2)} (${changePercent}%)`;
        stockChangeElement.className = 'stock-change negative';
    }
    
    // Update trading panel
    document.getElementById('panel-symbol').textContent = currentStock.name;
    document.getElementById('panel-price').textContent = `₹${currentPrice.toLocaleString()}`;
    
    const panelChangeElement = document.getElementById('panel-change');
    if (change >= 0) {
        panelChangeElement.textContent = `+${change.toFixed(2)} (+${changePercent}%)`;
        panelChangeElement.className = 'stock-change positive';
    } else {
        panelChangeElement.textContent = `${change.toFixed(2)} (${changePercent}%)`;
        panelChangeElement.className = 'stock-change negative';
    }
}

// Show trade result
function showTradeResult(action) {
    if (isTradeResultShowing) return;
    
    isTradeResultShowing = true;
    const tradeResult = document.getElementById('trade-result');
    const resultMessage = document.getElementById('result-message');
    const resultProfit = document.getElementById('result-profit');
    
    // Generate random profit/loss
    const profitPercent = (Math.random() * 15 + 5).toFixed(2); // 5-20% profit
    const profitAmount = (currentPrice * (profitPercent / 100)).toFixed(2);
    
    if (action === 'buy') {
        resultMessage.textContent = 'BUY ORDER EXECUTED!';
        resultProfit.textContent = `Profit: +₹${profitAmount} (+${profitPercent}%)`;
    } else {
        resultMessage.textContent = 'SELL ORDER EXECUTED!';
        resultProfit.textContent = `Profit: +₹${profitAmount} (+${profitPercent}%)`;
    }
    
    tradeResult.style.display = 'flex';
    
    // Hide result after 3 seconds
    setTimeout(() => {
        tradeResult.style.display = 'none';
        isTradeResultShowing = false;
        updateStockDisplay(); // Update to new stock
    }, 3000);
}

// Initialize stock trading
function initStockTrading() {
    // Initial stock display
    updateStockDisplay();
    
    // Update stock every 5 seconds
    setInterval(() => {
        if (!isTradeResultShowing) {
            updateStockDisplay();
        }
    }, 5000);
    
    // Add event listeners for buy/sell buttons
    document.getElementById('buy-btn').addEventListener('click', () => {
        showTradeResult('buy');
    });
    
    document.getElementById('sell-btn').addEventListener('click', () => {
        showTradeResult('sell');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stock trading
    initStockTrading();
    
    // Initialize market indicators
    initMarketIndicators();
    
    // Ensure mentorship section is visible
    ensureMentorshipVisibility();
    
    // ... existing code ...
});

// Ensure mentorship section visibility
function ensureMentorshipVisibility() {
    const mentorshipSection = document.querySelector('.mentorship');
    const mentorCard = document.querySelector('.mentor-card');
    
    if (mentorshipSection && mentorCard) {
        // Use GSAP to ensure proper visibility
        gsap.set(mentorshipSection, { 
            opacity: 1, 
            visibility: 'visible',
            display: 'flex'
        });
        
        gsap.set(mentorCard, { 
            opacity: 1, 
            visibility: 'visible',
            y: 0,
            clearProps: 'all'
        });
        
        // Force a reflow and ensure visibility
        setTimeout(() => {
            gsap.set(mentorshipSection, { 
                opacity: 1, 
                visibility: 'visible',
                display: 'flex'
            });
            
            gsap.set(mentorCard, { 
                opacity: 1, 
                visibility: 'visible',
                y: 0
            });
        }, 100);
        
        // Additional check after a longer delay
        setTimeout(() => {
            if (mentorshipSection.style.opacity !== '1' || mentorshipSection.style.visibility !== 'visible') {
                gsap.set(mentorshipSection, { 
                    opacity: 1, 
                    visibility: 'visible',
                    display: 'flex'
                });
            }
        }, 500);
    }
}

// Market Indicators Data
const marketIndicators = [
    { name: 'NIFTY 50', baseValue: 22450, volatility: 0.02 },
    { name: 'BANK NIFTY', baseValue: 48234, volatility: 0.025 },
    { name: 'SENSEX', baseValue: 73567, volatility: 0.015 }
];

let currentIndicators = [...marketIndicators];

// Generate random market value
function generateMarketValue(indicator) {
    const volatility = indicator.volatility;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newValue = indicator.baseValue * (1 + change);
    return Math.round(newValue * 100) / 100;
}

// Update market indicators
function updateMarketIndicators() {
    const indicatorElements = document.querySelectorAll('.indicator');
    
    indicatorElements.forEach((element, index) => {
        const indicator = currentIndicators[index];
        const newValue = generateMarketValue(indicator);
        const previousValue = indicator.baseValue;
        const change = newValue - previousValue;
        const changePercent = ((change / previousValue) * 100).toFixed(2);
        
        const valueElement = element.querySelector('.indicator-value');
        const labelElement = element.querySelector('.indicator-label');
        
        // Update value with animation
        valueElement.style.transform = 'scale(1.1)';
        valueElement.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            valueElement.textContent = newValue.toLocaleString();
            
            if (change >= 0) {
                valueElement.className = 'indicator-value positive';
            } else {
                valueElement.className = 'indicator-value negative';
            }
            
            valueElement.style.transform = 'scale(1)';
        }, 150);
        
        // Update base value for next calculation
        indicator.baseValue = newValue;
    });
}

// Initialize market indicators
function initMarketIndicators() {
    // Initial update
    updateMarketIndicators();
    
    // Update every 8 seconds
    setInterval(updateMarketIndicators, 8000);
    
    // Add click effects
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            // Add click animation
            indicator.style.transform = 'scale(0.95)';
            setTimeout(() => {
                indicator.style.transform = 'translateY(-8px)';
            }, 150);
        });
    });
} 

// Testimonials Horizontal Scroll with Arrow Controls
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSection = document.querySelector('.testimonials');
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    if (!testimonialsSection || !testimonialsTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoScrollInterval;
    
    // Initialize testimonials slider
    function initTestimonialsSlider() {
        // Set initial state
        updateNavigationButtons();
        startAutoScroll();
        
        // Add event listeners
        prevBtn.addEventListener('click', () => scrollToPrevious());
        nextBtn.addEventListener('click', () => scrollToNext());
        
        // Pause auto-scroll on hover
        testimonialsSection.addEventListener('mouseenter', pauseAutoScroll);
        testimonialsSection.addEventListener('mouseleave', resumeAutoScroll);
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        
        testimonialsSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            pauseAutoScroll();
        });
        
        testimonialsSection.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        testimonialsSection.addEventListener('touchend', () => {
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    scrollToNext();
                } else {
                    scrollToPrevious();
                }
            }
            resumeAutoScroll();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                scrollToPrevious();
            } else if (e.key === 'ArrowRight') {
                scrollToNext();
            }
        });
    }
    
    function scrollToNext() {
        if (isAnimating) return;
        
        if (currentIndex < testimonialCards.length - 1) {
            currentIndex++;
        } else {
            // Loop back to first card for continuous scrolling
            currentIndex = 0;
        }
        scrollToCard(currentIndex);
    }
    
    function scrollToPrevious() {
        if (isAnimating) return;
        
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop to last card for continuous scrolling
            currentIndex = testimonialCards.length - 1;
        }
        scrollToCard(currentIndex);
    }
    
    function scrollToCard(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Calculate scroll position to center the card
        const containerWidth = testimonialsSection.offsetWidth;
        const cardWidth = testimonialCards[0].offsetWidth;
        const cardGap = 30; // Gap between cards
        const containerPadding = 80; // Left and right padding for arrows
        
        // Calculate the center position
        const centerPosition = (containerWidth - containerPadding) / 2;
        const cardCenter = cardWidth / 2;
        
        // Calculate scroll position to center the current card
        const scrollPosition = -(index * (cardWidth + cardGap)) + centerPosition - cardCenter;
        
        // Smooth scroll animation
        gsap.to(testimonialsTrack, {
            x: scrollPosition,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                isAnimating = false;
                updateNavigationButtons();
            }
        });
        
        // Animate the current card
        animateCardIn(testimonialCards[index]);
        
        // Update dots if they exist
        updateDots(index);
    }
    
    function animateCardIn(card) {
        // Reset all cards
        testimonialCards.forEach(c => {
            c.classList.remove('active');
            gsap.set(c, { opacity: 0.7, scale: 0.95 });
        });
        
        // Set current card as active
        card.classList.add('active');
        
        // Animate current card
        gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
        
        // Animate card elements with stagger
        const avatar = card.querySelector('.testimonial-avatar');
        const name = card.querySelector('.testimonial-name');
        const caption = card.querySelector('.testimonial-caption');
        const review = card.querySelector('.testimonial-review');
        const rating = card.querySelector('.testimonial-rating');
        
        gsap.fromTo([avatar, name, caption, review, rating], 
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            }
        );
        
        // Animate rating stars
        const stars = rating.querySelectorAll('i');
        gsap.fromTo(stars,
            { scale: 0, rotation: -180 },
            {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.6
            }
        );
        
        // Animate avatar with bounce
        gsap.fromTo(avatar,
            { scale: 0.8, rotation: -10 },
            {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.1
            }
        );
    }
    
    function updateNavigationButtons() {
        // Remove disabled state for continuous scrolling
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    
    function updateDots(index) {
        const dots = document.querySelectorAll('.dot');
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isAnimating) {
                scrollToNext();
            }
        }, 5000); // Auto-scroll every 5 seconds
    }
    
    function pauseAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    function resumeAutoScroll() {
        startAutoScroll();
    }
    
    // Add hover effects for testimonial cards
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const avatar = card.querySelector('.testimonial-avatar');
            gsap.to(avatar, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const avatar = card.querySelector('.testimonial-avatar');
            gsap.to(avatar, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initial positioning to center the first card
    setTimeout(() => {
        scrollToCard(currentIndex);
    }, 100);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate scroll position after resize
        setTimeout(() => {
            scrollToCard(currentIndex);
        }, 100);
    });
}); 

// Initialize Services Slider
function initializeServicesSlider() {
    const sliderContainer = document.querySelector('.services-slider-container');
    const sliderTrack = document.querySelector('.services-slider-track');
    
    if (!sliderContainer || !sliderTrack) return;
    
    // Clone cards for seamless loop
    const cards = sliderTrack.querySelectorAll('.service-card');
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    
    // Calculate total width for smooth loop
    const totalWidth = cards.length * (cardWidth + gap);
    sliderTrack.style.width = `${totalWidth * 2}px`;
    
    // Add event listeners for pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        sliderTrack.style.animationPlayState = 'paused';
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        sliderTrack.style.animationPlayState = 'running';
    });
    
    // Add touch support for mobile
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderTrack.scrollLeft;
        sliderTrack.style.animationPlayState = 'paused';
    });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2;
        sliderTrack.scrollLeft = scrollLeft - walk;
    });
    
    sliderContainer.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            sliderTrack.style.animationPlayState = 'running';
        }, 1000);
    });
    
    // Add intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(sliderContainer);
    
    // Add smooth scroll to explore button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#subscription');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add card hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add GSAP animations for cards
    gsap.fromTo(cards, 
        { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sliderContainer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
} 