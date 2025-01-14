// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.canvas.id = 'particles';
        document.querySelector('#particles').appendChild(this.canvas);
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity += (Math.random() - 0.5) * 0.01;

            if (particle.opacity < 0.4) particle.opacity = 0.4;
            if (particle.opacity > 0.8) particle.opacity = 0.8;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(124, 58, 237, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Particles
const particleSystem = new ParticleSystem();

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});
const mobileMenu = document.getElementById("mobile-menu");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll("#menu li a");

// Toggle menu open/close
mobileMenu.addEventListener("click", () => {
    menu.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

// Close menu after clicking a link
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('span');
    icon.textContent = body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.querySelector('span').textContent = 'dark_mode';
    }
}

// Music Control
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    const icon = musicToggle.querySelector('span');
    if (isMusicPlaying) {
        bgMusic.pause();
        icon.textContent = 'volume_off';
    } else {
        bgMusic.play();
        icon.textContent = 'volume_up';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Submission with Validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name.length < 2) {
        showNotification('Please enter a valid name');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }, 2000);
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

const scrollIndicator = document.getElementById('scrollIndicator');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    // Scrolling up
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
  
  lastScrollY = window.scrollY;
});

// Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observerOption = { threshold: 0.5, rootMargin: '0px' };
    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOption);

    // Observe elements
    document.querySelectorAll('.education-item').forEach((item) => {
        observer1.observe(item);
    });
});

// Typing Animation
const fixedText = "Hello! I'm "; // Fixed text that stays
const animatingText = "Kanishk Gupta"; // Text that animates
let index = 0;
let isErasing = false; // Tracks whether we're erasing or typing
const typingText = document.querySelector('.typing-text');

function type() {
  if (!isErasing && index < animatingText.length) {
    // Typing effect
    typingText.textContent = fixedText + animatingText.slice(0, ++index);
    setTimeout(type, 100);
  } else if (isErasing && index > 0) {
    // Erasing effect
    typingText.textContent = fixedText + animatingText.slice(0, --index);
    setTimeout(type, 50); // Faster erasing
  } else {
    // Switch mode (typing <-> erasing)
    isErasing = !isErasing;
    setTimeout(type, 1000); // Pause before switching
  }
}

// Start typing animation when the page loads
window.addEventListener('load', type);


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
        section.classList.add('animate-in');
    });
});

