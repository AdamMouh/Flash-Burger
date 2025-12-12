document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks'); // ID de la navigation
    const hero = document.getElementById('hero'); // ID de la section Hero
    const header = document.getElementById('header'); // ID du header
    
    // 1. Gestion du Menu Mobile (Hamburger)
    if (hamburger && navLinks) {
        // La navigation est maintenant .nav-menu et le bouton est .hamburger
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active');
        });

        // Fermer le menu après un clic sur un lien (sur mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('is-active');
                }
            });
        });
    }


    // 2. Effet de Parallaxe Simple pour la section Hero
    // (Ajoute de la profondeur au fond sans être trop intrusif)
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Décalage du background pour l'effet Parallax
            // (La vitesse de 0.3 est plus subtile et élégante)
            hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.3}px)`;

            // Gestion de l'opacité ou de l'ombre du header au scroll
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Animation d'apparition au scroll (Intersection Observer)
    // Cible tous les éléments qui ont la classe .fade-in mais qui n'ont pas de délai spécifique 
    // (Les éléments dans le Hero ont des délais définis directement dans l'HTML)
    const elementsToObserve = document.querySelectorAll('.fade-in');
    
    // Création de l'observateur
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si l'élément est visible, on lui ajoute la classe 'visible' qui déclenchera l'animation CSS
                entry.target.classList.add('visible');
                // On arrête d'observer cet élément après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Regarde le viewport
        rootMargin: '0px',
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });

    // Appliquer l'observateur à tous les éléments ciblés
    elementsToObserve.forEach(element => {
        // Sauf ceux déjà animés par les délais CSS dans le Hero (pour éviter le double déclenchement)
        if (!element.classList.contains('delay-1') && !element.classList.contains('delay-2') && !element.classList.contains('delay-3')) {
            // Pour les éléments hors du Hero, on applique l'observer
            observer.observe(element);
        }
    });

    // Note : Pour que l'animation au scroll fonctionne correctement, 
    // la classe .fade-in doit être présente dans l'HTML, 
    // et le CSS doit inclure le style initial (opacity: 0, transform) pour ces éléments.
});
