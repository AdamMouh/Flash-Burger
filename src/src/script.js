document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const hero = document.getElementById('hero');
    const header = document.getElementById('header');
    
    // 1. Gestion du Menu Mobile (Hamburger)
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('is-active'); // Si vous voulez animer l'icône hamburger en CSS
    });

    // Fermer le menu après un clic sur un lien (sur mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('is-active');
            }
        });
    });

    // 2. Effet de Parallaxe Simple pour la section Hero
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Effet de décalage pour donner une impression de profondeur au défilement
            hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            
            // Masquer le header si on revient en haut (pour un effet stylé)
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Animation d'apparition au scroll (simple)
    const elementsToAnimate = document.querySelectorAll('.fade-in:not(.delay-1):not(.delay-2):not(.delay-3)');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Pour que l'animation ne se déclenche qu'une seule fois
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        // Initialiser l'état pour les éléments hors-champ
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
});
