// Firebase Configuration - Using centralized config
let db;

// Initialize Firebase using centralized configuration
function initializeFirebaseForBlogs() {
    if (typeof firebase !== 'undefined') {
        try {
            // Check if Firebase is already initialized
            if (!firebase.apps.length) {
                firebase.initializeApp(window.firebaseConfig || {
                    apiKey: "AIzaSyCV8_CE8XH_OXyIhtUrejvvH4BRFmfpf9Y",
                    authDomain: "travestingmoney-5d9f9.firebaseapp.com",
                    projectId: "travestingmoney-5d9f9",
                    storageBucket: "travestingmoney-5d9f9.firebasestorage.app",
                    messagingSenderId: "896872312270",
                    appId: "1:896872312270:web:7bcc11ffb16ada4c334f9f",
                    measurementId: "G-S4T735QWJD"
                });
                console.log('Firebase initialized successfully for blogs');
            } else {
                console.log('Firebase already initialized');
            }
            
            // Initialize Firestore
            db = firebase.firestore();
            console.log('Firestore initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            // Continue without Firebase for now
        }
    } else {
        console.warn('Firebase SDK not loaded');
    }
}

// Global variables
let allBlogs = [];
let filteredBlogs = [];
let currentPage = 1;
const blogsPerPage = 9;

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blogs.js DOMContentLoaded event fired');
    console.log('Blogs grid element:', document.querySelector('#blogs-grid'));
    console.log('All blogs grid element:', document.querySelector('#all-blogs-grid'));
    
    // Initialize Firebase first
    initializeFirebaseForBlogs();
    
    // Initialize blogs
    initializeBlogs();
    
    // Initialize search, filters, and modal
    initializeSearch();
    initializeFilters();
    initializeModal();
});

// Also try to initialize blogs when the window loads (fallback)
window.addEventListener('load', function() {
    console.log('Window load event fired');
    // Check if blogs were already initialized
    if (allBlogs.length === 0) {
        console.log('Blogs not initialized yet, trying again...');
        initializeBlogs();
    }
});

// Initialize blogs
async function initializeBlogs() {
    console.log('Initializing blogs...');
    console.log('Current page URL:', window.location.href);
    console.log('Blogs grid element:', document.querySelector('#blogs-grid'));
    console.log('All blogs grid element:', document.querySelector('#all-blogs-grid'));
    
    try {
        await loadBlogs();
        
        // Check if we're on the homepage or blogs page
        const isHomepage = document.querySelector('#blogs-grid') !== null;
        const isBlogsPage = document.querySelector('#all-blogs-grid') !== null;
        
        console.log('Homepage:', isHomepage, 'Blogs page:', isBlogsPage);
        
        if (isHomepage) {
            console.log('Calling displayLatestBlogs...');
            displayLatestBlogs();
        } else if (isBlogsPage) {
            console.log('Calling displayAllBlogs...');
            displayAllBlogs();
        } else {
            console.log('Neither homepage nor blogs page detected');
        }
    } catch (error) {
        console.error('Error initializing blogs:', error);
        showBlogError('Failed to load blogs. Please try again later.');
    }
}

// Load blogs from Firestore
async function loadBlogs() {
    console.log('Loading blogs from Firestore...');
    
    // Check if Firebase is available
    if (!db) {
        console.log('Firebase not available, using sample data');
        loadSampleBlogs();
        return;
    }
    
    try {
        // Test Firebase connection first
        console.log('Testing Firebase connection...');
        console.log('Firebase app:', firebase.app());
        console.log('Firestore instance:', db);
        
        const blogsRef = db.collection('blogs');
        console.log('Firestore reference created');
        
        const snapshot = await blogsRef.orderBy('updatedAt', 'desc').get();
        console.log('Snapshot received, docs count:', snapshot.docs.length);
        
        allBlogs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date(doc.data().updatedAt)
        }));
        
        filteredBlogs = [...allBlogs];
        
        console.log('Blogs loaded:', allBlogs.length);
        if (allBlogs.length > 0) {
            console.log('Sample blog:', allBlogs[0]);
        } else {
            console.log('No blogs found in Firestore, using sample data');
            loadSampleBlogs();
        }
    } catch (error) {
        console.error('Error loading blogs from Firestore:', error);
        console.log('Using sample data due to Firebase error');
        loadSampleBlogs();
    }
}

// Load sample blogs for testing
function loadSampleBlogs() {
    allBlogs = [
        {
            id: 'sample-1',
            title: 'Nifty 50 Technical Analysis: Bullish Momentum Continues',
            excerpt: 'Comprehensive analysis of Nifty 50 index performance with key support levels, resistance zones, and future outlook based on technical indicators and market structure.',
            content: '<p>This is a sample blog post about market analysis. The Nifty 50 index has shown strong momentum in recent sessions, with key support levels holding firm. Our analysis suggests continued bullish momentum in the short term.</p><p>Key factors driving the market include strong corporate earnings, positive global cues, and supportive domestic policies. Technical indicators point to sustained upward movement with key resistance levels to watch.</p>',
            category: 'Market Analysis',
            readTime: 5,
            updatedAt: new Date()
        },
        {
            id: 'sample-2',
            title: 'Mastering Risk Management: Essential Trading Principles',
            excerpt: 'Learn the fundamental principles of risk management that every successful trader must understand, including position sizing, stop-loss strategies, and portfolio protection.',
            content: '<p>Learn the fundamentals of trading with our comprehensive guide for beginners. This post covers essential concepts like risk management, position sizing, and basic technical analysis.</p><p>We discuss proven strategies that have worked for successful traders and common pitfalls to avoid. Perfect for anyone starting their trading journey.</p>',
            category: 'Trading Education',
            readTime: 8,
            updatedAt: new Date(Date.now() - 86400000) // 1 day ago
        },
        {
            id: 'sample-3',
            title: 'Sector Rotation Strategy: Maximizing Returns in Volatile Markets',
            excerpt: 'Discover how strategic sector rotation can enhance portfolio performance and reduce risk during different market cycles and economic conditions.',
            content: '<p>Diversification is key to long-term investment success. This post explains how to create a balanced portfolio that can weather market volatility while generating consistent returns.</p><p>We cover asset allocation strategies, sector diversification, and how to rebalance your portfolio effectively.</p>',
            category: 'Investment Strategy',
            readTime: 6,
            updatedAt: new Date(Date.now() - 172800000) // 2 days ago
        }
    ];
    
    filteredBlogs = [...allBlogs];
    console.log('Sample blogs loaded:', allBlogs.length);
}

// Display latest 3 blogs on homepage
function displayLatestBlogs() {
    console.log('Displaying latest blogs...');
    const blogsGrid = document.getElementById('blogs-grid');
    console.log('Blogs grid element:', blogsGrid);
    
    if (!blogsGrid) {
        console.error('Blogs grid not found');
        return;
    }
    
    console.log('All blogs array:', allBlogs);
    console.log('All blogs length:', allBlogs.length);
    
    const latestBlogs = allBlogs.slice(0, 3);
    console.log('Latest blogs:', latestBlogs.length);
    console.log('Latest blogs data:', latestBlogs);
    
    if (latestBlogs.length === 0) {
        console.log('No blogs available, showing empty state');
        blogsGrid.innerHTML = `
            <div class="blog-empty">
                <i class="fas fa-newspaper"></i>
                <h3>No blogs available</h3>
                <p>Check back soon for the latest market insights!</p>
            </div>
        `;
        return;
    }
    
    console.log('Rendering blog cards...');
    const blogCardsHTML = latestBlogs.map(blog => createBlogCard(blog)).join('');
    console.log('Blog cards HTML:', blogCardsHTML);
    blogsGrid.innerHTML = blogCardsHTML;
    console.log('Blog cards rendered');
}

// Display all blogs on blogs page
function displayAllBlogs() {
    const blogsGrid = document.getElementById('all-blogs-grid');
    if (!blogsGrid) return;
    
    if (filteredBlogs.length === 0) {
        blogsGrid.innerHTML = `
            <div class="blog-empty">
                <i class="fas fa-search"></i>
                <h3>No blogs found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }
    
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    blogsGrid.innerHTML = paginatedBlogs.map(blog => createBlogCard(blog)).join('');
    
    updatePagination();
}

// Create blog card HTML
function createBlogCard(blog) {
    const date = formatDate(blog.updatedAt);
    const excerpt = blog.excerpt || extractExcerpt(blog.content);
    const readTime = blog.readTime || calculateReadTime(blog.content);
    const category = blog.category || 'Market Insights';
    
    // Generate a professional stock market related image based on category
    const imageUrl = getBlogImage(blog.category, blog.title);
    
    return `
        <div class="blog-card" data-blog-id="${blog.id}">
            <div class="blog-image-container">
                <img src="${imageUrl}" alt="${blog.title}" class="blog-image" loading="lazy">
                <div class="blog-category-badge">${category}</div>
                <div class="blog-overlay">
                    <div class="blog-overlay-content">
                        <i class="fas fa-chart-line"></i>
                        <span>Read Analysis</span>
                    </div>
                </div>
            </div>
            
            <div class="blog-content">
                <div class="blog-header">
                    <h3 class="blog-title">${blog.title}</h3>
                </div>
                
                <div class="blog-excerpt">${excerpt}</div>
                
                <div class="blog-meta">
                    <div class="blog-meta-left">
                        <div class="blog-date">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${date}</span>
                        </div>
                        <div class="blog-read-time">
                            <i class="fas fa-clock"></i>
                            <span>${readTime} min read</span>
                        </div>
                    </div>
                    <div class="blog-meta-right">
                        <div class="blog-author">
                            <i class="fas fa-user-tie"></i>
                            <span>Travesting Money</span>
                        </div>
                    </div>
                </div>
                
                <div class="blog-cta">
                    <button class="blog-btn" onclick="openBlogModal('${blog.id}')">
                        <span>Read Full Analysis</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Get appropriate image for blog based on category and title
function getBlogImage(category, title) {
    const baseImages = {
        'Market Analysis': [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'Trading Education': [
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'Investment Strategy': [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    };
    
    // Get images for the category, or use default if category not found
    const categoryImages = baseImages[category] || baseImages['Market Analysis'];
    
    // Use title hash to consistently select image for same blog
    const titleHash = title.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    return categoryImages[Math.abs(titleHash) % categoryImages.length];
}

// Extract excerpt from HTML content
function extractExcerpt(content) {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Get first 150 characters
    const excerpt = plainText.substring(0, 150);
    return excerpt.length === 150 ? excerpt + '...' : excerpt;
}

// Calculate read time
function calculateReadTime(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    const words = plainText.split(/\s+/).length;
    const readTime = Math.ceil(words / 200); // Average reading speed
    return Math.max(1, readTime);
}

// Format date
function formatDate(date) {
    if (!date) return 'Unknown date';
    
    const now = new Date();
    const blogDate = new Date(date);
    const diffTime = Math.abs(now - blogDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
        return blogDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            filterBlogs(searchTerm);
        }, 300);
    });
}

// Initialize filters
function initializeFilters() {
    const sortSelect = document.getElementById('sort-blogs');
    const filterSelect = document.getElementById('filter-blogs');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBlogs(this.value);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterBlogsByCategory(this.value);
        });
    }
}

// Filter blogs by search term
function filterBlogs(searchTerm) {
    if (!searchTerm) {
        filteredBlogs = [...allBlogs];
    } else {
        filteredBlogs = allBlogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm) ||
            extractExcerpt(blog.content).toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayAllBlogs();
}

// Sort blogs
function sortBlogs(sortBy) {
    switch (sortBy) {
        case 'latest':
            filteredBlogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            break;
        case 'oldest':
            filteredBlogs.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            break;
        case 'title':
            filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    currentPage = 1;
    displayAllBlogs();
}

// Filter blogs by category (placeholder for future implementation)
function filterBlogsByCategory(category) {
    if (category === 'all') {
        filteredBlogs = [...allBlogs];
    } else {
        // For now, we'll just show all blogs since we don't have categories yet
        // You can implement category filtering when you add category field to your Firestore documents
        filteredBlogs = [...allBlogs];
    }
    
    currentPage = 1;
    displayAllBlogs();
}

// Update pagination
function updatePagination() {
    const paginationContainer = document.getElementById('blogs-pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayAllBlogs();
    
    // Scroll to top of blogs section
    const blogsSection = document.querySelector('.all-blogs');
    if (blogsSection) {
        blogsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('blog-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBlogModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBlogModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBlogModal();
        }
    });
}

// Open blog modal
async function openBlogModal(blogId) {
    const blog = allBlogs.find(b => b.id === blogId);
    if (!blog) return;
    
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    // Show loading state
    modalTitle.textContent = blog.title;
    modalContent.innerHTML = `
        <div class="blog-loading">
            <div class="loading-spinner"></div>
            <p>Loading blog content...</p>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Load blog content
    try {
        // Add blog content with proper styling
        modalContent.innerHTML = `
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${formatDate(blog.updatedAt)}
                    </span>
                    <span class="blog-read-time">
                        <i class="fas fa-clock"></i>
                        ${calculateReadTime(blog.content)} min read
                    </span>
                </div>
                <div class="blog-body">
                    ${blog.content}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading blog content:', error);
        modalContent.innerHTML = `
            <div class="blog-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading blog</h3>
                <p>Failed to load blog content. Please try again.</p>
            </div>
        `;
    }
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Show blog error
function showBlogError(message) {
    const blogsGrid = document.querySelector('#blogs-grid, #all-blogs-grid');
    if (blogsGrid) {
        blogsGrid.innerHTML = `
            <div class="blog-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Show notification (reuse from main.js if available)
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Export functions for global access
window.openBlogModal = openBlogModal;
window.closeBlogModal = closeBlogModal;
window.changePage = changePage;
window.initializeBlogs = initializeBlogs; 