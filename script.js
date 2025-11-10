// Saudi Tourism Website - Complete JavaScript Solution
class SaudiTourismApp {
    constructor() {
        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeMobileMenu();
        this.initializeAnimations();
        this.initializeActiveLinks();
        this.initializePageTransitions();
    }

    // Theme Management with Proper Reset
    initializeTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        if (!themeToggle || !themeIcon) return;

        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('saudi-theme') || 'light';
        this.applyTheme(savedTheme, true);

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme, false);
        });
    }

    applyTheme(theme, isInitial = false) {
        const themeIcon = document.getElementById('theme-icon');

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
            localStorage.setItem('saudi-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
            localStorage.setItem('saudi-theme', 'light');
        }

        if (!isInitial) {
            // Re-apply animations after theme change
            setTimeout(() => {
                this.initializeAnimations();
            }, 300);
        }
    }

    // تم إزالة الدوال التي تضيف أنماط inline لأن CSS يتعامل مع الدارك مود الآن

    // Mobile Menu
    initializeMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Animations
    initializeAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

        // Reset animations first
        animatedElements.forEach(el => {
            el.classList.remove('animate-element');
        });

        // Re-observe elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-element');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
            // Check if element is already in view
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInView) {
                setTimeout(() => {
                    el.classList.add('animate-element');
                }, 100);
            }
        });

        // Initialize stagger animations
        this.initializeStaggerAnimations();

        // Initialize particle effects
        this.initializeParticles();

    // Initialize card animations
        this.initializeCardAnimations();
    }

    // Card Animations
    initializeCardAnimations() {
        const cards = document.querySelectorAll('.card-hover');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px -12px rgba(193, 155, 98, 0.25)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // Stagger Animations
    initializeStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('.stagger-animation');

        staggerContainers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.classList.add('animate-element');
            });
        });
    }

    // Particle Effects
    initializeParticles() {
        const particleContainers = document.querySelectorAll('.particles');

        particleContainers.forEach(container => {
            // Clear existing particles
            container.innerHTML = '';

            // Create particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                container.appendChild(particle);
            }
        });
    }

    // Active Links
    initializeActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Check if this link should be active
            const isActive = this.shouldBeActive(linkHref, currentPage);
            
            if (isActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    shouldBeActive(linkHref, currentPage) {
        // Exact match
        if (linkHref === currentPage) return true;
        
        // Home page special case
        if (currentPage === 'index.html' && linkHref === 'index.html') return true;
        
        // Discover section pages
        if (currentPage.includes('discover-') && linkHref === 'discover.html') return true;
        
        // Places section pages
        if (currentPage.includes('places-') && linkHref === 'places.html') return true;
        
        return false;
    }

    // Page Transitions
    initializePageTransitions() {
        // Add loading animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SaudiTourismApp();
});

// Handle page unloading for smooth transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Global theme control functions
window.saudiApp = {
    toggleTheme: function() {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        const app = new SaudiTourismApp();
        app.applyTheme(newTheme, false);
    },

    forceDarkMode: function() {
        const app = new SaudiTourismApp();
        app.applyTheme('dark', false);
    },

    forceLightMode: function() {
        const app = new SaudiTourismApp();
        app.applyTheme('light', false);
    }
};
function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 20 + 10;
                const animationDelay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${left}%`;
                particle.style.animationDuration = `${animationDuration}s`;
                particle.style.animationDelay = `${animationDelay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
         // Initialize website on load
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            initScrollAnimations();
        });