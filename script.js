// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// Theme Switcher
// ========================================
const themeSwitcher = document.getElementById('theme-switcher');
const themeToggle = document.getElementById('theme-toggle');
const themeDropdown = document.getElementById('theme-dropdown');
const themeOptions = document.querySelectorAll('.theme-option');

// Available themes
const themes = ['dark', 'light', 'cyberpunk', 'ocean', 'forest', 'sunset', 'nord', 'dracula'];

// Get saved theme or default to 'dark'
function getSavedTheme() {
    return localStorage.getItem('portfolio-theme') || 'dark';
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    // Update active state on theme options
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });

    // Update theme toggle icon based on light/dark
    updateThemeIcon(theme);
}

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (theme === 'light') {
        icon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        `;
    } else {
        icon.innerHTML = `
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        `;
    }
}

// Toggle dropdown
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeSwitcher.classList.toggle('active');
});

// Handle theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        applyTheme(theme);
        themeSwitcher.classList.remove('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!themeSwitcher.contains(e.target)) {
        themeSwitcher.classList.remove('active');
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
});

// ========================================
// Typing Effect
// ========================================
const typingText = document.querySelector('.typing-text');
const titles = [
    'Full-Stack Web Developer',
    'Angular Developer',
    'Data Visualization Expert',
    'Dashboard Specialist'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingDelay = 500; // Pause before next word
    }

    setTimeout(typeEffect, typingDelay);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ========================================
// Scroll Reveal Animation
// ========================================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
function initReveal() {
    const elementsToReveal = [
        '.about-content',
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.contact-content'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

document.addEventListener('DOMContentLoaded', initReveal);
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ========================================
// Skills Animation
// ========================================
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');

    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = `${progress}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

document.addEventListener('DOMContentLoaded', animateSkills);

// ========================================
// Counter Animation
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const aboutSection = document.querySelector('.about');

    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        };

        // Show success message (in production, you'd send this to a server)
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Message Sent!
        `;
        btn.disabled = true;
        btn.style.background = '#10b981';

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);

        console.log('Form submitted:', formData);
    });
}

// ========================================
// Project Card 3D Tilt Effect
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// Skill Card Mouse Glow Effect
// ========================================
const skillCards = document.querySelectorAll('.skill-category');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// ========================================
// Cursor Glow Follower
// ========================================
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;
    glowX += (mouseX - glowX) * speed;
    glowY += (mouseY - glowY) * speed;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hide cursor glow on touch devices
if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
}

// ========================================
// Project Modal
// ========================================
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Project data
const projectData = {
    webae: {
        company: 'Supracontrols Private Limited',
        title: 'Web AE Client',
        description: 'Advanced performance analysis platform for plant monitoring systems. This comprehensive solution enables operators to analyze plant performance through intuitive visualizations and interactive dashboards.',
        features: [
            'Radar Plot visualization for multi-parameter analysis',
            'AFM/DAET Charts for comprehensive alarm system evaluation',
            'Easily configurable analysis targets and baselines',
            'Highly interactive trend analysis with drill-down capabilities',
            'PDF/Excel data export functionality',
            'Real-time data monitoring and alerts'
        ],
        tech: ['Angular', 'TypeScript', 'DevExpress', 'REST APIs', 'HTML5', 'CSS3', 'SQL Server']
    },
    sama: {
        company: 'Supracontrols Private Limited',
        title: 'SAMA Mobile App',
        description: 'Mobile monitoring solution designed for on-the-go access to plant operations data. The app provides a mobile-optimized dashboard experience with full functionality available on smartphones and tablets.',
        features: [
            'Historical dashboard views with mobile optimization',
            'Advanced trend analysis capabilities',
            'Real-time and aggregated historical data visualization',
            'KPI monitoring on mobile platforms',
            'PDF/Excel report export for mobile devices',
            'Offline data caching for remote locations'
        ],
        tech: ['Ionic', 'TypeScript', 'DevExpress', 'Cordova', 'REST APIs', 'Mobile UI/UX']
    },
    dashboards: {
        company: 'Supracontrols Private Limited',
        title: 'Web Clients & Dashboards',
        description: 'Enterprise-grade dashboard platform providing comprehensive monitoring and analytics capabilities. The system handles large datasets efficiently while delivering real-time insights to operations teams.',
        features: [
            'Historical dashboard view with timeline-based playback',
            'Advanced trend analysis for real-time and historical data combinations',
            'KPI-based data monitoring and analytics',
            'Web-enabled Excel report integration',
            'Performance optimization for large datasets',
            'Custom report generation and scheduling'
        ],
        tech: ['C#', 'ASP.NET MVC', 'DevExpress', 'SQL Server', 'REST APIs', 'Bootstrap']
    },
    fastdrills: {
        company: 'Viewzource Technologies',
        title: 'Mahanathi FastDrills',
        description: 'Comprehensive borewell inventory management system designed for efficient tracking and management of drilling operations, equipment, and sales processes.',
        features: [
            'Inventory detail storage and management',
            'Stock level tracking and updates',
            'Sales-based inventory reconciliation',
            'Daily and weekly report generation with export options',
            'Multi-location inventory tracking',
            'User role-based access control'
        ],
        tech: ['Ionic', 'Feathers.js', 'JavaScript', 'Cordova', 'REST APIs', 'Mobile Development']
    },
    enruta: {
        company: 'Viewzource Technologies',
        title: 'Enruta Viaporte',
        description: 'Online transport marketplace mobile application connecting truck drivers and transporters. The platform facilitates vehicle location, logistics management, and networking between transportation stakeholders.',
        features: [
            'Real-time truck location tracking',
            'Networking platform for transporters and consignors',
            'Marketplace functionality for transport services',
            'Driver-focused interface and UX',
            'Route optimization suggestions',
            'In-app communication system'
        ],
        tech: ['Ionic', 'Cordova Plugins', 'Feathers.js', 'JavaScript', 'Android', 'Geolocation APIs']
    },
    graciebjj: {
        company: 'Viewzource Technologies',
        title: 'Graciebjj Academy',
        description: 'Self-defense academy management website providing comprehensive tools for managing students, schedules, and activities. The system streamlines daily operations for martial arts academies.',
        features: [
            'Daily attendance tracking system',
            'Timetable management and scheduling',
            'Activity monitoring and reporting',
            'Student progress tracking',
            'Class schedule management',
            'Responsive design for all devices'
        ],
        tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'jQuery', 'Responsive Design']
    }
};

// Open modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Populate modal content
    document.querySelector('.modal-company').textContent = project.company;
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-description').textContent = project.description;

    // Populate features
    const featuresList = document.querySelector('.modal-features-list');
    featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');

    // Populate tech
    const techList = document.querySelector('.modal-tech-list');
    techList.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for project cards
document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = btn.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Also allow clicking anywhere on the card
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close modal events
if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

// ========================================
// Show More Projects
// ========================================
const showMoreBtn = document.getElementById('show-more-projects');
const hiddenProjects = document.querySelectorAll('.project-card.project-hidden');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        const isExpanded = showMoreBtn.classList.contains('expanded');

        if (isExpanded) {
            // Hide projects
            hiddenProjects.forEach(project => {
                project.classList.remove('show');
            });
            showMoreBtn.classList.remove('expanded');
            showMoreBtn.innerHTML = `
                Show More Projects
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            `;
        } else {
            // Show projects
            hiddenProjects.forEach(project => {
                project.classList.add('show');
            });
            showMoreBtn.classList.add('expanded');
            showMoreBtn.innerHTML = `
                Show Less
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            `;
        }
    });
}

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        // Close theme switcher
        if (themeSwitcher.classList.contains('active')) {
            themeSwitcher.classList.remove('active');
        }
        // Close project modal
        if (projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    }
});

// ========================================
// Preloader (optional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c  Hello there! 👋
%c  Thanks for checking out Vinothkumar R's portfolio.
%c  Contact: vinothkumar61r@gmail.com

`,
'color: #10b981; font-size: 20px; font-weight: bold;',
'color: #34d399; font-size: 14px;',
'color: #059669; font-size: 14px;'
);
