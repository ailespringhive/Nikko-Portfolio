document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add tiny delay based on element's style attribute if present
                const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Dynamic Typing Effect for Hero Section
    const typeText = document.querySelector('.type-text');
    const words = ['Web design', 'Frontend Development'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster deleting
        } else {
            typeText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word finished typing, pause before deleting
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before typing new word
        }

        // Add a blinking cursor effect using CSS border or simple string append
        // In this implementation, we just update the text content.
        
        setTimeout(type, typingDelay);
    }

    // Start typing effect
    if (typeText) {
        setTimeout(type, 1000);
    }

    // 4. Form Submission Logic using FormSubmit
    // NOTE: Native HTML submission is used here to ensure it works locally (file://).
    // The fetch API method was blocked by CORS/security policies when running locally.
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // e.preventDefault(); // Commented out to allow native form submission
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Redirecting...';
            btn.style.opacity = '0.8';
        });
    }

    // 5. Modal Logic (Exposed to window for inline onclick)
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };
});
