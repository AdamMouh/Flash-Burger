document.addEventListener('DOMContentLoaded', () => {
    // SÉLECTION DES ÉLÉMENTS CLÉS
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks'); 
    const hero = document.getElementById('hero');
    const header = document.getElementById('header');
    
    // 1. Gestion du Menu Mobile (Hamburger)
    if (hamburger && navLinks) {
        
        // Toggle la classe 'active' pour ouvrir/fermer la navigation
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active');
        });

        // Fermer le menu après un clic sur un lien (très important pour le mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('is-active');
                }
            });
        });
    }


    // 2. Effet de Parallaxe Simple pour la section Hero et gestion du Header au scroll
    if (hero && header) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Effet Parallax (mouvement de l'image de fond du Hero)
            hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.3}px)`;

            // Ajout/Retrait de la classe 'scrolled' pour le style du header
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Animation d'apparition au scroll (Intersection Observer)
    const elementsToObserve = document.querySelectorAll('.fade-in');
    
    // Création de l'observateur
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe 'visible' qui déclenche la transition CSS
                entry.target.classList.add('visible');
                // Arrête d'observer l'élément après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Regarde le viewport
        rootMargin: '0px',
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });

    // Appliquer l'observateur aux éléments hors du Hero
    elementsToObserve.forEach(element => {
        // Exclure les éléments du Hero qui ont déjà des délais CSS pour éviter la double animation
        if (!element.classList.contains('delay-1') && !element.classList.contains('delay-2') && !element.classList.contains('delay-3')) {
            observer.observe(element);
        }
    });
});
