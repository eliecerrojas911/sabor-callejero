// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('a[href^="#"]');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Mobile menu toggle functionality
menuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('show');
    
    // Animate hamburger menu
    const hamburgers = menuToggle.querySelectorAll('.hamburger');
    hamburgers.forEach((hamburger, index) => {
        if (mobileNav.classList.contains('show')) {
            if (index === 0) {
                hamburger.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            } else if (index === 1) {
                hamburger.style.opacity = '0';
            } else {
                hamburger.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            }
        } else {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        const hamburgers = menuToggle.querySelectorAll('.hamburger');
        hamburgers.forEach(hamburger => {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the menu item details
        const menuItem = this.closest('.menu-item');
        const itemName = menuItem.querySelector('.menu-item-title').textContent;
        const itemPrice = menuItem.querySelector('.menu-item-price').textContent;
        
        // Create WhatsApp message
        const message = encodeURIComponent(`¡Hola! Quiero pedir: ${itemName} - ${itemPrice}`);
        const whatsappUrl = `https://wa.me/584124548507?text=${message}`;
        
        // Add visual feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }, 150);
        
        // Open WhatsApp after animation
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 300);
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver();

// Observe menu items for animation
document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe info items for animation
document.querySelectorAll('.info-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// WhatsApp floating button enhanced functionality
const whatsappFloat = document.querySelector('.whatsapp-btn-float');

whatsappFloat.addEventListener('click', function(e) {
    // Add click animation
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1.1)';
    }, 100);
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// Show/hide WhatsApp button based on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 300) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.transform = 'scale(1)';
    } else {
        whatsappFloat.style.opacity = '0.7';
        whatsappFloat.style.transform = 'scale(0.8)';
    }
});

// Enhanced WhatsApp button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add pulsing effect to WhatsApp button periodically
    setInterval(function() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'bounce 1s infinite';
            }, 100);
        }
    }, 10000); // Every 10 seconds

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const newImg = new Image();
                newImg.onload = function() {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Contact form functionality (if needed in future)
function sendWhatsAppMessage(customMessage = '') {
    const defaultMessage = '¡Hola! Quiero hacer un pedido';
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584125458507?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Add click handlers for all WhatsApp links
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for CSS animations
    document.body.classList.add('loaded');
    
    // Set initial header position
    header.style.transition = 'transform 0.3s ease';
    
    console.log('Sabor Callejero - Website loaded successfully! 🍔');
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.backgroundColor = '#f3f4f6';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Imagen no disponible';
        });
    });
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Batch scroll-related updates here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});