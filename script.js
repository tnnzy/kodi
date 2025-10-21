// script.js - Funcționalități pentru Kodi Downloads

document.addEventListener('DOMContentLoaded', function() {
    // Initializează aplicația
    initApp();
});

function initApp() {
    setupSmoothScroll();
    setupScrollAnimations();
    setupDownloadTracking();
    setupHeaderEffects();
    setupFileCards();
    
    console.log('🚀 Kodi Downloads website loaded successfully!');
}

// Smooth scroll pentru navigație
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Animări la scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observează elementele pentru animație
    const animatedElements = document.querySelectorAll('.file-card, .category, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Tracking pentru descărcări
function setupDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const fileName = this.getAttribute('href').split('/').pop();
            const fileTitle = this.parentElement.querySelector('h4').textContent;
            
            // Track download (poți integra cu Google Analytics aici)
            trackDownload(fileTitle, fileName);
            
            // Efect visual pentru download
            showDownloadFeedback(this, fileTitle);
        });
    });
}

function trackDownload(title, filename) {
    console.log(`📥 Download started: ${title} (${filename})`);
    
    // Aici poți adăuga Google Analytics sau alt tracking
    // gtag('event', 'download', { 'file_name': filename });
}

function showDownloadFeedback(button, title) {
    const originalText = button.innerHTML;
    
    // Schimbă textul butonului temporar
    button.innerHTML = '<i class="fas fa-check"></i> Descărcat!';
    button.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
    
    // Mesaj de succes
    showNotification(`Descărcare începută: ${title}`);
    
    // Revino la starea inițială după 2 secunde
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }, 2000);
}

function showNotification(message) {
    // Creează un element de notificare
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #48bb78, #38a169);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animație intrare
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Șterge după 4 secunde
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Efecte header la scroll
function setupHeaderEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            header.style.backdropFilter = 'none';
            header.style.padding = '1rem 0';
        }
    });
}

// Efecte speciale pentru file cards
function setupFileCards() {
    const fileCards = document.querySelectorAll('.file-card');
    
    fileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Funcție pentru search (poți extinde mai târziu)
function searchFiles(query) {
    const fileCards = document.querySelectorAll('.file-card');
    let results = 0;
    
    fileCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = 'flex';
            results++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return results;
}

// Adaugă acest cod dacă vrei să adaugi search mai târziu
console.log(`
⭐ Kodi Downloads Features:
✅ Smooth scrolling navigation
✅ Scroll animations
✅ Download tracking
✅ Visual feedback
✅ Responsive design
✅ Modern UI/UX
`);
