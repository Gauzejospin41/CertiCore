// Course data
const courses = [
    {
        id: 1,
        title: "CertiCore A+ Complete Course",
        description: "Master hardware and software fundamentals with hands-on labs and practice exams.",
        category: "certicore",
        badge: "CertiCore A+",
        rating: 4.8,
        reviews: 1250,
        price: "$199",
        icon: "fas fa-desktop"
    },
    {
        id: 2,
        title: "CertiCore Security+ Certification",
        description: "Learn cybersecurity fundamentals and prepare for the SY0-701 exam.",
        category: "certicore",
        badge: "CertiCore Security+",
        rating: 4.9,
        reviews: 980,
        price: "$249",
        icon: "fas fa-shield-alt"
    },
    {
        id: 3,
        title: "Cisco CCNA Routing & Switching",
        description: "Complete networking fundamentals with Packet Tracer simulations.",
        category: "cisco",
        badge: "Cisco CCNA",
        rating: 4.7,
        reviews: 750,
        price: "$299",
        icon: "fas fa-network-wired"
    },
    {
        id: 4,
        title: "Microsoft Azure Fundamentals",
        description: "Introduction to cloud computing concepts and Azure services.",
        category: "microsoft",
        badge: "Azure AZ-900",
        rating: 4.6,
        reviews: 650,
        price: "$179",
        icon: "fab fa-microsoft"
    },
    {
        id: 5,
        title: "AWS Cloud Practitioner",
        description: "Learn AWS cloud fundamentals and prepare for the CLF-C01 exam.",
        category: "aws",
        badge: "AWS CCP",
        rating: 4.8,
        reviews: 890,
        price: "$199",
        icon: "fab fa-aws"
    },
    {
        id: 6,
        title: "CertiCore Network+ Certification",
        description: "Comprehensive networking concepts and troubleshooting skills.",
        category: "certicore",
        badge: "CertiCore Network+",
        rating: 4.7,
        reviews: 560,
        price: "$229",
        icon: "fas fa-wifi"
    }
];

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const coursesGrid = document.getElementById('courses-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
// Only apply smooth scrolling to hash links on the same page
if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation link highlighting
// Only apply scroll highlighting on home page
if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
// Course filtering
function renderCourses(coursesToRender) {
    coursesGrid.innerHTML = '';
    
    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <span class="course-badge">${course.badge}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}
                        </div>
                        <span>${course.rating} (${course.reviews})</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
                <button class="btn btn-primary btn-full">Enroll Now</button>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            renderCourses(courses);
        } else {
            const filteredCourses = courses.filter(course => course.category === filter);
            renderCourses(filteredCourses);
        }
    });
});

// Initialize courses on page load
document.addEventListener('DOMContentLoaded', () => {
    if (coursesGrid) {
        renderCourses(courses);
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .exam-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                animateCounter(stat, number);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Form handling for buttons (placeholder functionality)
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        const buttonText = e.target.textContent;
        
        // Simulate different actions based on button text
        if (buttonText.includes('Start') || buttonText.includes('Get Started')) {
            showNotification('Welcome to CertiCore! Sign up to begin your certification journey.', 'info');
        } else if (buttonText.includes('Enroll')) {
            showNotification('Course enrollment coming soon! Sign up for updates.', 'success');
        } else if (buttonText.includes('Practice Exam')) {
            showNotification('Practice exams will be available after registration.', 'info');
        } else if (buttonText.includes('Sign In')) {
            showNotification('Sign in functionality coming soon!', 'info');
        }
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--primary-color)' : 'var(--accent-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Progress bar animation for hero card
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = '75%';
            }, 500);
        }
    }, 1000);
});