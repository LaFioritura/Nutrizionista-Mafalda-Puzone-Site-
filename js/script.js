// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const menu = document.querySelector('.menu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
                resetHamburger();
            }
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            resetHamburger();
        }
    });
}

function resetHamburger() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menu && menuToggle) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            resetHamburger();
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.service-card, .competenza-card, .methodology-step, .credential-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Active menu item on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

console.log('✨ Sito Dott.ssa Mafalda Puzone caricato con successo!');
console.log('📍 Mappa Google Maps integrata');
console.log('📱 Design responsive attivo');
console.log('🎨 Animazioni attive');