/* 
=========================================================
  EKKO ELECTRIC - INTERACTIVITY SIGNALS
=========================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE NAVIGATION --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- STICKY HEADER SCROLL EFFECT --- */
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- SCROLL ANIMATIONS (Intersection Observer) --- */
    // Only apply animations if user prefers motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% visible
        };

        const fadeUpElements = document.querySelectorAll('.glass-card, .section-title, .about-text');
        
        // Setup initial state for elements to fade
        fadeUpElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeUpElements.forEach(el => sectionObserver.observe(el));
    }

    /* --- ACTIVE NAV LINK HIGHLIGHTING --- */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    /* --- CONTACT FORM SUBMISSION MOCK --- */
    const contactForm = document.getElementById('cyberForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'TRANSMITTING...';
            btn.style.opacity = '0.7';
            
            // Simulate network request
            setTimeout(() => {
                btn.textContent = 'DATA SENT SUCCESSFULLY';
                btn.style.background = 'linear-gradient(135deg, #00FFCC, #00AEEF)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // reset to class styling
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
