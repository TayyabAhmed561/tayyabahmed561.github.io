// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const cosmicBurst = document.getElementById('cosmic-burst');
const sections = document.querySelectorAll('.section');

// Custom Star Cursor
let cursorTrails = [];
let isCursorVisible = true;

function updateCursor(e) {
    const cursor = document.getElementById('custom-cursor');
    if (cursor && isCursorVisible) {
        // Use clientX/clientY for viewport-relative positioning
        const x = e.clientX - 4;
        const y = e.clientY - 4;
        
        // Ensure cursor stays within viewport bounds
        const maxX = window.innerWidth - 8;
        const maxY = window.innerHeight - 8;
        
        const clampedX = Math.max(0, Math.min(x, maxX));
        const clampedY = Math.max(0, Math.min(y, maxY));
        
        cursor.style.left = clampedX + 'px';
        cursor.style.top = clampedY + 'px';
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
        
        // Create trail effect
        createCursorTrail(e.clientX, e.clientY);
    }
}

function createCursorTrail(x, y) {
    if (!isCursorVisible) return;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = (x - 3) + 'px';
    trail.style.top = (y - 3) + 'px';
    
    document.body.appendChild(trail);
    cursorTrails.push(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
        cursorTrails = cursorTrails.filter(t => t !== trail);
    }, 1200);
}

// Cosmic Burst Effect
function createCosmicParticle() {
    const particle = document.createElement('div');
    particle.className = 'cosmic-particle';
    
    // Get button position
    const button = document.getElementById('cosmic-burst');
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Random position around the button
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const startX = buttonCenterX + Math.cos(angle) * distance;
    const startY = buttonCenterY + Math.sin(angle) * distance;
    
    // Random end position (further away)
    const endDistance = 100 + Math.random() * 150;
    const endX = buttonCenterX + Math.cos(angle) * endDistance;
    const endY = buttonCenterY + Math.sin(angle) * endDistance;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.setProperty('--end-x', (endX - startX) + 'px');
    particle.style.setProperty('--end-y', (endY - startY) + 'px');
    
    // Random color for variety
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

function triggerCosmicBurst() {
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createCosmicParticle();
        }, i * 50);
    }
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Active section highlighting
function updateActiveSection() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
}

// Update cosmic background based on scroll position
function updateCosmicBackground() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollProgress = scrollTop / (documentHeight - windowHeight);
    
    console.log('Scroll progress:', scrollProgress); // Debug log
    
    const cosmicBg = document.querySelector('.cosmic-bg');
    if (cosmicBg) {
        // Smooth transition from blue to orange throughout the entire scroll
        const blueToOrange = scrollProgress; // 0 to 1
        
        // Ensure we get pure blue when at the top (scrollProgress = 0)
        if (scrollProgress <= 0.15) {
            // At the very top, force pure blue (first 15% of scroll)
            cosmicBg.style.background = `linear-gradient(
                180deg,
                rgba(0, 20, 60, 0.9) 0%,
                rgba(0, 40, 100, 0.7) 25%,
                rgba(0, 60, 120, 0.5) 50%,
                rgba(0, 100, 80, 0.4) 75%,
                rgba(0, 120, 100, 0.5) 100%
            )`;
        } else {
            // Start fading to orange after 15% scroll progress
            const fadeProgress = (scrollProgress - 0.15) / 0.85; // 0 to 1 for the fade portion
            cosmicBg.style.background = `linear-gradient(
                180deg,
                rgba(0, 20, 60, 0.9) 0%,
                rgba(0, 40, 100, 0.7) 25%,
                rgba(0, 60, 120, 0.5) 50%,
                rgba(${Math.round(0 + 200 * fadeProgress)}, ${Math.round(100 + 50 * fadeProgress)}, ${Math.round(50 + 30 * fadeProgress)}, ${0.4 + 0.3 * fadeProgress}) 75%,
                rgba(${Math.round(0 + 255 * fadeProgress)}, ${Math.round(120 + 50 * fadeProgress)}, ${Math.round(60 + 40 * fadeProgress)}, ${0.5 + 0.3 * fadeProgress}) 100%
            )`;
        }
    }
}

// Typing effect function
function typeWriter(element, text, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
    
    // Create a temporary element to work with
    const tempElement = element.cloneNode(true);
    tempElement.innerHTML = '';
    
    // Extract just the text content, preserving HTML structure
    const textContent = element.textContent || element.innerText;
    
    let i = 0;
    
    function type() {
        if (i < textContent.length) {
            tempElement.innerHTML += textContent.charAt(i);
            element.innerHTML = tempElement.innerHTML;
            i++;
            setTimeout(type, speed);
        } else {
            // Restore the original HTML with proper highlighting
            element.innerHTML = originalHTML;
        }
    }
    
    type();
}

// Initialize typing effect when page loads
function initTypingEffect() {
    // Disabled typing effect to preserve HTML structure
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.innerHTML;
    //     setTimeout(() => {
    //         typeWriter(heroTitle, originalText, 50);
    //         }, 500);
    // }
}

// Parallax effect for background elements
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Mobile menu toggle (for smaller screens)
function initMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.style.display = 'none';
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuButton);
    
    // Show mobile menu button on small screens
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
            navLinks.forEach(link => link.style.display = 'none');
        } else {
            mobileMenuButton.style.display = 'none';
            navLinks.forEach(link => link.style.display = 'flex');
        }
    }
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        navLinks.forEach(link => {
            link.style.display = link.style.display === 'none' ? 'flex' : 'none';
        });
    });
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
}

// Add fade-in class to elements for scroll animations
function addFadeInClass() {
    const elementsToAnimate = document.querySelectorAll('.timeline-content, .skill-category, .project-card, .info-item');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });
}

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

// Initialize all functionality
function init() {
    // Add fade-in classes
    addFadeInClass();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Event listeners
    cosmicBurst.addEventListener('click', triggerCosmicBurst);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Custom cursor events - use throttled mousemove for better performance
    document.addEventListener('mousemove', throttle(updateCursor, 16)); // 60fps
    document.addEventListener('mouseenter', () => {
        isCursorVisible = true;
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.opacity = '1';
            cursor.style.visibility = 'visible';
        }
    });
    document.addEventListener('mouseleave', () => {
        isCursorVisible = false;
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            cursor.style.display = 'none';
        }
    });
    
    // Ensure cursor is visible and properly positioned
    window.addEventListener('scroll', () => {
        if (isCursorVisible) {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.style.opacity = '1';
                cursor.style.visibility = 'visible';
                cursor.style.display = 'block';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (isCursorVisible) {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.style.display = 'block';
                cursor.style.opacity = '1';
                cursor.style.visibility = 'visible';
            }
        }
    });
    
    // Throttled scroll events for performance
    window.addEventListener('scroll', throttle(() => {
        updateActiveSection();
        updateNavbar();
        handleScrollAnimations();
        handleParallax();
        updateCosmicBackground();
    }, 16));
    
    // Initial calls
    updateActiveSection();
    updateNavbar();
    handleScrollAnimations();
    updateCosmicBackground(); // Ensure correct initial background
}

// Add some interactive elements
function addInteractiveElements() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add smooth reveal animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Add CSS for light theme
function addLightThemeCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .light-theme {
            --bg-primary: #ffffff;
            --bg-secondary: #f8f9fa;
            --bg-tertiary: #e9ecef;
            --text-primary: #212529;
            --text-secondary: #495057;
            --text-muted: #6c757d;
            --border-color: #dee2e6;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }
        
        .light-theme .navbar {
            background: rgba(255, 255, 255, 0.95) !important;
            border-bottom-color: #dee2e6;
        }
        
        .light-theme .nav-link {
            background: #f8f9fa;
            color: #495057;
        }
        
        .light-theme .nav-link:hover {
            background: var(--primary-color);
            color: var(--bg-primary);
        }
        
        .light-theme .theme-toggle {
            background: #f8f9fa;
            color: #495057;
        }
        
        .light-theme .section {
            background: #ffffff;
        }
        
        .light-theme .timeline-content,
        .light-theme .skill-category,
        .light-theme .project-card,
        .light-theme .info-item,
        .light-theme .contact-method {
            background: #f8f9fa;
            border-color: #dee2e6;
        }
        
        .light-theme .skill-tag {
            background: #e9ecef;
            color: #495057;
            border-color: #dee2e6;
        }
        
        .light-theme .project-tech span {
            background: #e9ecef;
            color: var(--primary-color);
            border-color: #dee2e6;
        }
        
        .light-theme .footer {
            background: #f8f9fa;
            border-top-color: #dee2e6;
        }
    `;
    document.head.appendChild(style);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add light theme CSS
    addLightThemeCSS();
    
    // Initialize all functionality
    init();
    
    // Add interactive elements
    addInteractiveElements();
    
    // Add some additional animations
setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
}, 100);

// Shooting stars functionality
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Start above the screen and end below it for seamless effect
    const startX = Math.random() * window.innerWidth;
    const startY = -100; // Start above the screen
    
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    
    document.body.appendChild(star);
    
    // Remove star after animation completes
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 3000); // Match the CSS animation duration
}

// Create shooting stars occasionally
function startShootingStars() {
    // Create a shooting star every 8-15 seconds
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance
            createShootingStar();
        }
    }, 8000 + Math.random() * 7000);
}

// Start shooting stars after page loads
setTimeout(startShootingStars, 3000);

// Add some CSS animations
const additionalCSS = `
    @keyframes slideInFromLeft {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        0% {
            transform: translateY(30px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .timeline-item:nth-child(odd) .timeline-content {
        animation: slideInFromLeft 0.8s ease-out;
    }
    
    .timeline-item:nth-child(even) .timeline-content {
        animation: slideInFromRight 0.8s ease-out;
    }
    
    .skill-category, .project-card {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .skill-category:nth-child(odd) {
        animation-delay: 0.1s;
    }
    
    .skill-category:nth-child(even) {
        animation-delay: 0.2s;
    }
    
    .project-card:nth-child(odd) {
        animation-delay: 0.1s;
    }
    
    .project-card:nth-child(even) {
        animation-delay: 0.2s;
    }
`;

// Add the additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

}); // Close DOMContentLoaded event listener





