document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Управление мобильным меню и оверлеем
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        navToggle?.classList.add('active');
        navLinks?.classList.add('active');
        navOverlay?.classList.add('active');
        
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
        navOverlay?.classList.remove('active');
        
        document.body.style.overflow = '';
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.contains('active');
            isOpen ? closeMenu() : openMenu();
        });

        navOverlay?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });

        document.querySelectorAll('.nav-link, .nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }


    /* ==========================================================================
       2. Циклический эффект печатания и стирания (Typewriter Effect)
       ========================================================================== */
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        const TYPING_TIME = 2600;   
        const PAUSE_READ = 3500;    
        const ERASING_TIME = 1800;  
        const PAUSE_EMPTY = 400;    

        function runTypewriterLoop() {
            heroTitle.classList.remove('erasing-active');
            heroTitle.classList.add('typing-active');

            setTimeout(() => {
                heroTitle.classList.remove('typing-active');
                heroTitle.classList.add('erasing-active');

                setTimeout(() => {
                    heroTitle.classList.remove('erasing-active');

                    setTimeout(runTypewriterLoop, PAUSE_EMPTY);
                }, ERASING_TIME);

            }, TYPING_TIME + PAUSE_READ);
        }

        runTypewriterLoop();
    }

    /* ==========================================================================
   3. Появление блоков при скролле (Intersection Observer)
   ========================================================================== */
const fadeInElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
                observer.unobserve(entry.target);   
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));
} else {
    fadeInElements.forEach(el => el.classList.add('show'));
}
});