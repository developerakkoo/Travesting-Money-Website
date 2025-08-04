// Firebase Configuration
const firebaseConfig = {
    // Add your Firebase config here
    // You'll need to replace this with your actual Firebase project configuration
    apiKey: "AIzaSyBZlk1Mxmgc6dtQKvA0KUWZDJO8E3wr8ZM",
  authDomain: "travesting-3a43e.firebaseapp.com",
  projectId: "travesting-3a43e",
  storageBucket: "travesting-3a43e.firebasestorage.app",
  messagingSenderId: "635256034750",
  appId: "1:635256034750:web:81111c90efca12d207d5ef",
  measurementId: "G-K7TX5Q00FM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global variables
let allBlogs = [];
let filteredBlogs = [];
let currentPage = 1;
const blogsPerPage = 9;

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already initialized by main.js
    if (!window.blogScriptLoaded) {
        initializeBlogs();
    }
    initializeSearch();
    initializeFilters();
    initializeModal();
});

// Initialize blogs
async function initializeBlogs() {
    console.log('Initializing blogs...');
    try {
        await loadBlogs();
        
        // Check if we're on the homepage or blogs page
        const isHomepage = document.querySelector('#blogs-grid') !== null;
        const isBlogsPage = document.querySelector('#all-blogs-grid') !== null;
        
        console.log('Homepage:', isHomepage, 'Blogs page:', isBlogsPage);
        
        if (isHomepage) {
            displayLatestBlogs();
        } else if (isBlogsPage) {
            displayAllBlogs();
        }
    } catch (error) {
        console.error('Error initializing blogs:', error);
        showBlogError('Failed to load blogs. Please try again later.');
    }
}

// Load blogs from Firestore
async function loadBlogs() {
    console.log('Loading blogs from Firestore...');
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
            console.log('No blogs found in Firestore, using sample data for testing');
            // Add sample blogs for testing if no blogs are found
            allBlogs = [
                {
                    id: 'sample-1',
                    title: 'Market Analysis: Nifty 50 Outlook',
                    content: '<p>This is a sample blog post about market analysis. The Nifty 50 index has shown strong momentum in recent sessions...</p>',
                    updatedAt: new Date()
                },
                {
                    id: 'sample-2',
                    title: 'Trading Strategies for Beginners',
                    content: '<p>Learn the fundamentals of trading with our comprehensive guide for beginners...</p>',
                    updatedAt: new Date(Date.now() - 86400000) // 1 day ago
                },
                {
                    id: 'sample-3',
                    title: 'Investment Tips for 2024',
                    content: '<p>Discover the top investment strategies and tips for the year 2024...</p>',
                    updatedAt: new Date(Date.now() - 172800000) // 2 days ago
                }
            ];
            filteredBlogs = [...allBlogs];
            console.log('Sample blogs created:', allBlogs.length);
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
        throw error;
    }
}

// Display latest 3 blogs on homepage
function displayLatestBlogs() {
    console.log('Displaying latest blogs...');
    const blogsGrid = document.getElementById('blogs-grid');
    if (!blogsGrid) {
        console.error('Blogs grid not found');
        return;
    }
    
    const latestBlogs = allBlogs.slice(0, 3);
    console.log('Latest blogs:', latestBlogs.length);
    
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
    blogsGrid.innerHTML = latestBlogs.map(blog => createBlogCard(blog)).join('');
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
    const excerpt = extractExcerpt(blog.content);
    const readTime = calculateReadTime(blog.content);
    
    return `
        <div class="blog-card" data-blog-id="${blog.id}">
            <div class="blog-header">
                <h3 class="blog-title">${blog.title}</h3>
            </div>
            <div class="blog-excerpt">${excerpt}</div>
            <div class="blog-meta">
                <div class="blog-date">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${date}</span>
                </div>
                <div class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    <span>${readTime} min read</span>
                </div>
            </div>
            <div class="blog-cta">
                <button class="blog-btn" onclick="openBlogModal('${blog.id}')">
                    Read More
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
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