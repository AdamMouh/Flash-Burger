document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. GESTION DU MENU MOBILE (HAMBURGER)
    // ----------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-left');
    const mainNav = document.getElementById('main-nav');

    if (hamburger && navMenu) {
        // Au clic sur le bouton hamburger
        hamburger.addEventListener('click', () => {
            // Basculer l'affichage du menu
            navMenu.classList.toggle('active');
            // Animer le bouton pour le transformer en X
            hamburger.classList.toggle('is-open');

            // Sur mobile, si le menu s'ouvre, cacher le reste de la navigation
            if (navMenu.classList.contains('active')) {
                mainNav.style.backgroundColor = 'var(--color-flash-black)';
                mainNav.style.color = 'var(--color-text-light)';
            } else {
                mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                mainNav.style.color = 'var(--color-flash-black)';
            }
        });

        // Fermer le menu lors du clic sur un lien (pour la navigation sur la même page)
        document.querySelectorAll('.navbar-left a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('is-open');
                mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            });
        });
    }

    // ----------------------------------------------------
    // 2. OBSERVATEUR D'INTERSECTION (ANIMATION AU DÉFILEMENT)
    // ----------------------------------------------------
    const targets = document.querySelectorAll('.product-hp, .offer-card, .review-item, .contact-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Déclenchement à 10% de visibilité
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajout de la classe 'is-visible' pour déclencher l'animation CSS
                entry.target.classList.add('is-visible');
                // Optionnel: Arrêter d'observer une fois l'animation déclenchée
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        // Initialiser les éléments comme non-visibles avant l'observation
        target.style.opacity = 0; 
        target.style.transform = 'translateY(50px)';
        target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Ajout du style d'animation CSS dans le DOM une fois visible (pour plus de simplicité)
        target.classList.add('fade-in-on-scroll');
        
        observer.observe(target);
    });

    // Définir le style de l'animation pour les classes JS
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-on-scroll.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        /* Pour le carrousel d'avis, nous gérons l'animation par défaut via CSS Keyframes
        Si le JS carrousel doit être implémenté, il remplacera cette fonction. */
    `;
    document.head.appendChild(style);


    // ----------------------------------------------------
    // 3. SCROLL DE LA NAVBAR
    // ----------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.style.transform = 'translateY(0)';
            mainNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            mainNav.style.transform = 'translateY(0)';
            mainNav.style.boxShadow = 'none';
        }
    });

});
