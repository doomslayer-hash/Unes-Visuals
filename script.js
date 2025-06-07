
// Google Analytics Enhanced Tracking Functions
function trackButtonClick(buttonName, category = 'engagement') {
    gtag('event', 'click', {
        event_category: category,
        event_label: buttonName,
        value: 1
    });
}

function trackSectionView(sectionName) {
    gtag('event', 'page_view', {
        event_category: 'navigation',
        event_label: `section_${sectionName}`,
        value: 1
    });
}

function trackSocialClick(platform) {
    gtag('event', 'click', {
        event_category: 'social_media',
        event_label: platform,
        value: 1
    });
}

function trackDownload(fileName) {
    gtag('event', 'download', {
        event_category: 'engagement',
        event_label: fileName,
        value: 1
    });
}


// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links and track navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Track navigation clicks
            const sectionName = link.getAttribute('href').replace('#', '');
            gtag('event', 'click', {
                event_category: 'navigation',
                event_label: `nav_${sectionName}`,
                value: 1
            });
            
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Typing animation
const typingText = document.getElementById('typing-text');
const phrases = [
    'Graphic Designer',
    'Visual Artist',
    'Brand Creator',
    'Digital Artist'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const current = phrases[currentPhrase];

    if (!isDeleting) {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing animation
if (typingText) {
    typeEffect();
}

// Hire button effect with analytics tracking
const hireBtn = document.getElementById('hire-btn');
if (hireBtn) {
    hireBtn.addEventListener('click', () => {
        // Track hire button click
        gtag('event', 'click', {
            event_category: 'engagement',
            event_label: 'hire_me_button',
            value: 1
        });
        
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Contact form submission - removed old handler since Formspree is now used

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add special effects for different elements
            if (entry.target.classList.contains('portfolio-item')) {
                entry.target.style.animationDelay = `${Array.from(document.querySelectorAll('.portfolio-item')).indexOf(entry.target) * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Smooth page transitions
function addPageTransitions() {
    // Add transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Show transition
            transitionOverlay.classList.add('active');
            
            setTimeout(() => {
                // Scroll to target
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Hide transition
                setTimeout(() => {
                    transitionOverlay.classList.remove('active');
                }, 500);
            }, 300);
        });
    });
}

// Initialize page transitions
addPageTransitions();

// Track social media clicks
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.querySelector('i').className.includes('instagram') ? 'instagram' :
                        link.querySelector('i').className.includes('behance') ? 'behance' :
                        link.querySelector('i').className.includes('youtube') ? 'youtube' : 'unknown';
        
        trackSocialClick(platform);
    });
});

// Track service card interactions
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '_');
        gtag('event', 'click', {
            event_category: 'services',
            event_label: `service_${serviceName}`,
            value: 1
        });
    });
});

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqTitle = question.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '_');
        gtag('event', 'click', {
            event_category: 'faq',
            event_label: `faq_${faqTitle}`,
            value: 1
        });
    });
});

// Track testimonial interactions
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        gtag('event', 'click', {
            event_category: 'testimonials',
            event_label: `testimonial_${index + 1}`,
            value: 1
        });
    });
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    
    if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `scroll_depth_${scrollPercent}%`,
            value: scrollPercent
        });
    }
});

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .portfolio-grid, .services-grid, .contact-content, .testimonial-slider, .faq-container');

    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('slide-in-left');
        }
        observer.observe(el);
    });

    // Animate individual cards
    const cards = document.querySelectorAll('.portfolio-item, .service-card, .skill-item');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Skills animation
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(easeOutCubic * (end - start) + start);

        element.textContent = currentValue + '%';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');

            skillItems.forEach((item, index) => {
                const progressBar = item.querySelector('.skill-progress');
                const percentage = item.querySelector('.skill-percentage');
                const targetWidth = progressBar.dataset.width;

                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';

                    // Animate the percentage counter
                    animateCounter(percentage, 0, parseInt(targetWidth), 2000);
                }, index * 200);
            });

            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function nextSlide() {
    if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}

// Auto-play testimonials
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Enhanced FAQ with search
function initializeFAQ() {
    // Add search box to FAQ section
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        const searchBox = document.createElement('div');
        searchBox.className = 'faq-search-container';
        searchBox.innerHTML = `
            <div class="faq-search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="faq-search" placeholder="Search frequently asked questions..." />
                <div class="search-suggestions" id="search-suggestions"></div>
            </div>
        `;
        faqContainer.insertBefore(searchBox, faqContainer.firstChild);
        
        // Add search functionality
        const searchInput = document.getElementById('faq-search');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                    item.classList.add('search-highlight');
                } else {
                    item.style.display = query ? 'none' : 'block';
                    item.classList.remove('search-highlight');
                }
            });
            
            // Show suggestions
            if (query.length > 0) {
                const matches = Array.from(faqItems)
                    .filter(item => {
                        const question = item.querySelector('h3').textContent.toLowerCase();
                        return question.includes(query);
                    })
                    .slice(0, 3);
                
                suggestions.innerHTML = matches.map(item => {
                    const question = item.querySelector('h3').textContent;
                    return `<div class="suggestion-item" data-faq="${question}">${question}</div>`;
                }).join('');
                
                suggestions.classList.add('show');
            } else {
                suggestions.classList.remove('show');
            }
        });
        
        // Handle suggestion clicks
        suggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-item')) {
                const questionText = e.target.dataset.faq;
                const faqItem = Array.from(document.querySelectorAll('.faq-item'))
                    .find(item => item.querySelector('h3').textContent === questionText);
                
                if (faqItem) {
                    faqItem.scrollIntoView({ behavior: 'smooth' });
                    faqItem.classList.add('active');
                    searchInput.value = '';
                    suggestions.classList.remove('show');
                }
            }
        });
    }
}

// Enhanced FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        const answer = faqItem.querySelector('.faq-answer');

        // Close all FAQ items with animation
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const itemAnswer = item.querySelector('.faq-answer');
            itemAnswer.style.maxHeight = '0';
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'faq-ripple';
            question.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Initialize FAQ enhancements
initializeFAQ();

// Contact Form with better error handling and analytics tracking
const contactFormElement = document.getElementById('contact-form');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        // Track contact form submission
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            value: 1
        });
        
        const submitBtn = this.querySelector('.submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Reset button after successful submission or timeout
        setTimeout(() => {
            if (submitBtn.disabled) {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                
                // Track successful form submission
                gtag('event', 'form_success', {
                    event_category: 'engagement',
                    event_label: 'contact_form_success',
                    value: 1
                });
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }
        }, 3000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-container');

    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Mouse cursor glow effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const glowCursor = document.createElement('div');
        glowCursor.className = 'cursor-glow';
        glowCursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(glowCursor);
    }

    const glowElement = document.querySelector('.cursor-glow');
    if (glowElement) {
        glowElement.style.left = e.clientX - 10 + 'px';
        glowElement.style.top = e.clientY - 10 + 'px';
    }
});

// Enhanced Portfolio hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.3)';
        
        // Add color pop effect
        const graphic = this.querySelector('.portfolio-graphic');
        if (graphic) {
            graphic.style.filter = 'brightness(1.2) saturate(1.3)';
        }
        
        // Reveal text with animation
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
            overlay.style.background = 'linear-gradient(transparent, rgba(0, 255, 255, 0.1), rgba(0, 0, 0, 0.9))';
        }
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        // Reset effects
        const graphic = this.querySelector('.portfolio-graphic');
        if (graphic) {
            graphic.style.filter = '';
        }
        
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
            overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))';
        }
    });
});

// Service cards glow animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.service-glow');
        if (glow) {
            glow.style.opacity = '0.15';
        }
    });

    card.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.service-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});

// Quick access panel removed by user request

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.contains('light-theme');
    
    if (isLight) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Add loading animation with error checking and deployment fixes
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Force floating features initialization
    setTimeout(() => {
        if (typeof FloatingFeatures !== 'undefined' && !window.floatingFeaturesInitialized) {
            try {
                new FloatingFeatures();
                window.floatingFeaturesInitialized = true;
            } catch (error) {
                console.log('Manual floating features init failed');
            }
        }
    }, 100);

    // Animate hero elements with error checking
    setTimeout(() => {
        const animatedLogo = document.querySelector('.animated-logo');
        if (animatedLogo) {
            animatedLogo.style.opacity = '1';
            animatedLogo.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 400);

    setTimeout(() => {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
    }, 600);

    setTimeout(() => {
        const hireBtn = document.querySelector('.hire-btn');
        if (hireBtn) {
            hireBtn.style.opacity = '1';
            hireBtn.style.transform = 'translateY(0)';
        }
    }, 800);
});

// Project Modal System
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const mainImage = document.getElementById('main-image');
const loadingPlaceholder = document.getElementById('loading-placeholder');
const thumbnailsContainer = document.getElementById('image-thumbnails');
const projectDescription = document.getElementById('project-description');
const projectDetails = document.getElementById('project-details');
const imageCounter = document.getElementById('image-counter');
const closeModal = document.getElementById('close-modal');
const navPrev = document.getElementById('nav-prev');
const navNext = document.getElementById('nav-next');

let currentProject = null;
let currentImageIndex = 0;
let projectImages = [];

// Project data with design-relevant images
const projectsData = {
    'project-1': {
        title: 'Brand Identity Design',
        description: 'A comprehensive brand identity design project featuring logo creation, color palette development, and brand guidelines. This project showcases modern design principles with a focus on versatility and memorability.',
        images: [
            "projects/project-1/images/Haunted Castle.png",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center"
        ],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
        client: 'TechStart Solutions',
        year: '2024',
        category: 'Branding'
    },
    'project-2': {
        title: 'Event Poster Campaign',
        description: 'A vibrant poster design campaign for a music festival featuring dynamic typography, bold colors, and engaging visual elements that capture the energy and excitement of the event.',
        images: [
            'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop&crop=center'
        ],
        tools: ['Adobe Photoshop', 'Adobe Illustrator'],
        client: 'Summer Vibes Festival',
        year: '2024',
        category: 'Poster Design'
    },
    'project-3': {
        title: 'Digital Artwork',
        description: 'An abstract digital artwork exploring color theory and geometric compositions. This piece demonstrates mastery of digital painting techniques and creative expression through modern design elements.',
        images: [
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1569017388730-020b5f80a004?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop&crop=center'
        ],
        tools: ['Adobe Photoshop', 'Procreate', 'Adobe Illustrator'],
        client: 'Personal Project',
        year: '2024',
        category: 'Digital Art'
    },
    'project-4': {
        title: 'Social Media Kit',
        description: 'A comprehensive social media design package featuring Instagram post templates, story designs, and brand-consistent graphics that enhance online presence and engagement.',
        images: [
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center'
        ],
        tools: ['Adobe Photoshop', 'Canva Pro', 'Adobe Illustrator'],
        client: 'BrandLift Agency',
        year: '2024',
        category: 'Social Media Design'
    },
    'project-5': {
        title: 'Business Card Design',
        description: 'Professional business card designs that make a lasting impression. Features modern typography, premium materials, and sophisticated color schemes that reflect corporate identity.',
        images: [
            'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1565022701-3ce8bd5e6fae?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=800&h=600&fit=crop&crop=center'
        ],
        tools: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop'],
        client: 'Corporate Solutions Inc',
        year: '2024',
        category: 'Print Design'
    },
    'project-6': {
        title: 'Website Graphics & UI',
        description: 'Custom web graphics and user interface elements designed to enhance user experience. Includes icons, buttons, banners, and interactive elements with modern design principles.',
        images: [
            'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&crop=center'
        ],
        tools: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Sketch'],
        client: 'Digital Innovations Co',
        year: '2024',
        category: 'UI/UX Design'
    }
};

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    currentProject = project;
    currentImageIndex = 0;
    projectImages = project.images;

    // Set modal content
    modalTitle.textContent = project.title;
    projectDescription.textContent = project.description;

    // Generate project details
    projectDetails.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Client</div>
            <div class="detail-value">${project.client}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Year</div>
            <div class="detail-value">${project.year}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Category</div>
            <div class="detail-value">${project.category}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Tools Used</div>
            <div class="detail-value">
                <div class="tools-list">
                    ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Generate thumbnails
    generateThumbnails();

    // Load first image
    loadImage(0);

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Generate thumbnail navigation with lazy loading
function generateThumbnails() {
    thumbnailsContainer.innerHTML = '';
    projectImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.className = 'thumbnail';
        thumbnail.alt = `Image ${index + 1}`;
        if (index === 0) thumbnail.classList.add('active');

        // Create placeholder while loading
        thumbnail.src = 'data:image/svg+xml;base64,' + btoa(`
            <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#2a2a2a"/>
                <text x="50%" y="50%" fill="#666" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="12">${index + 1}</text>
            </svg>
        `);

        // Load actual thumbnail
        const img = new Image();
        img.onload = () => {
            thumbnail.src = img.src;
        };
        img.onerror = () => {
            thumbnail.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <text x="50%" y="50%" fill="#ff6b6b" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="10">Error</text>
                </svg>
            `);
        };
        img.src = image;

        thumbnail.addEventListener('click', () => loadImage(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Preload first few images for better UX
    preloadImages();
}

// Load specific image with improved error handling and timeout
function loadImage(index) {
    if (index < 0 || index >= projectImages.length) return;

    currentImageIndex = index;

    // Show loading placeholder
    loadingPlaceholder.style.display = 'flex';
    loadingPlaceholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    mainImage.style.display = 'none';

    // Create timeout for loading
    const loadTimeout = setTimeout(() => {
        loadingPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to load image';
        setTimeout(() => {
            loadingPlaceholder.style.display = 'none';
            mainImage.style.display = 'block';
            mainImage.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <text x="50%" y="50%" fill="#00ffff" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24">
                        Image not available
                    </text>
                </svg>
            `);
            updateImageCounter();
            updateActiveThumbnail();
        }, 1500);
    }, 5000);

    // Load image
    const img = new Image();
    img.onload = () => {
        clearTimeout(loadTimeout);
        mainImage.src = img.src;
        mainImage.style.display = 'block';
        loadingPlaceholder.style.display = 'none';
        updateImageCounter();
        updateActiveThumbnail();
    };
    
    img.onerror = () => {
        clearTimeout(loadTimeout);
        loadingPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to load image';
        setTimeout(() => {
            loadingPlaceholder.style.display = 'none';
            mainImage.style.display = 'block';
            mainImage.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <text x="50%" y="50%" fill="#00ffff" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24">
                        Image not available
                    </text>
                </svg>
            `);
            updateImageCounter();
            updateActiveThumbnail();
        }, 1500);
    };
    
    img.src = projectImages[index];
}

// Update image counter
function updateImageCounter() {
    imageCounter.textContent = `${currentImageIndex + 1} / ${projectImages.length}`;
}

// Update active thumbnail
function updateActiveThumbnail() {
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
    currentImageIndex = 0;
    projectImages = [];
}

// Navigation functions
function nextImage() {
    const nextIndex = (currentImageIndex + 1) % projectImages.length;
    loadImage(nextIndex);
}

function prevImage() {
    const prevIndex = currentImageIndex === 0 ? projectImages.length - 1 : currentImageIndex - 1;
    loadImage(prevIndex);
}

// Event listeners for modal
closeModal.addEventListener('click', closeProjectModal);
navNext.addEventListener('click', nextImage);
navPrev.addEventListener('click', prevImage);

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!projectModal.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeProjectModal();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Preload images for better performance
function preloadImages() {
    // Preload first 2 images
    const imagesToPreload = projectImages.slice(0, 2);
    imagesToPreload.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

// Add click event listeners to portfolio items with tracking
document.querySelectorAll('.portfolio-item[data-project]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = item.getAttribute('data-project');
        
        // Track portfolio item clicks
        gtag('event', 'click', {
            event_category: 'portfolio',
            event_label: `portfolio_${projectId}`,
            value: 1
        });
        
        openProjectModal(projectId);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-container');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 16)); // ~60fps