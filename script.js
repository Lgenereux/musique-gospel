document.addEventListener('DOMContentLoaded', () => {
    // --- Gestion du Menu Latéral (Off-canvas) ---
    const openSideMenuBtn = document.getElementById('openSideMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeSideMenuBtn = document.querySelector('.side-menu .close-btn');
    const menuLinks = document.querySelectorAll('.side-menu .menu-link');

    if (openSideMenuBtn && sideMenu && closeSideMenuBtn) {
        openSideMenuBtn.addEventListener('click', () => {
            sideMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Empêche le défilement du body
        });

        closeSideMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Rétablit le défilement
        });

        // Ferme le menu quand un lien est cliqué (utile pour les single-page applications)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                sideMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Gestion des Modales (Vidéo et Artiste) ---
    const openVideoModalBtn = document.getElementById('openVideoModal');
    const maModaleVideo = document.getElementById('maModaleVideo');
    const closeVideoModalBtn = maModaleVideo.querySelector('.fermer-bouton');

    if (openVideoModalBtn && maModaleVideo && closeVideoModalBtn) {
        openVideoModalBtn.addEventListener('click', () => {
            maModaleVideo.style.display = 'flex'; // Utilise flex pour le centrage CSS
        });

        closeVideoModalBtn.addEventListener('click', () => {
            maModaleVideo.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === maModaleVideo) {
                maModaleVideo.style.display = 'none';
            }
        });
    }

    const openArtistModalBtn = document.getElementById('openArtistModal');
    const maModaleArtiste = document.getElementById('maModaleArtiste');
    const closeArtistModalBtn = maModaleArtiste.querySelector('.fermer-bouton');

    if (openArtistModalBtn && maModaleArtiste && closeArtistModalBtn) {
        openArtistModalBtn.addEventListener('click', () => {
            maModaleArtiste.style.display = 'flex'; // Utilise flex pour le centrage CSS
        });

        closeArtistModalBtn.addEventListener('click', () => {
            maModaleArtiste.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === maModaleArtiste) {
                maModaleArtiste.style.display = 'none';
            }
        });
    }

    // --- Gestion de la classe 'active' pour les liens de navigation ---
    const allNavLinks = document.querySelectorAll('.desktop-nav ul li a, .side-menu .menu-link');
    const sections = document.querySelectorAll('main section');

    const updateActiveLink = () => {
        let currentActiveSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajustez ce décalage si votre header est grand
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSection = section.id;
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSection}`) {
                link.classList.add('active');
            }
        });
    };

    // Mettre à jour la classe active au chargement et au défilement
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Appel initial pour définir la classe active au chargement
});
