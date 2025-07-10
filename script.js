document.addEventListener('DOMContentLoaded', () => {
    // --- Gestion du Menu Latéral (Off-canvas) ---
    const openSideMenuBtn = document.getElementById('openSideMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeSideMenuBtn = document.querySelector('.side-menu .close-btn');
    const menuLinks = document.querySelectorAll('.side-menu .menu-link, .desktop-nav ul li a'); // Inclure les liens desktop pour la classe active

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
        document.querySelectorAll('.side-menu .menu-link').forEach(link => { // Cibler uniquement les liens du menu latéral
            link.addEventListener('click', () => {
                sideMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Gestion Générique des Modales ---
    const maModaleVideo = document.getElementById('maModaleVideo');
    const maModaleArtiste = document.getElementById('maModaleArtiste');

    // Contenu des artistes (vous pouvez le charger depuis une API ou un fichier JSON plus tard)
    const artistesData = {
        'mahalia': {
            nom: 'Mahalia Jackson',
            bio: 'Mahalia Jackson (1911-1972) était une chanteuse américaine de gospel, largement reconnue comme la "Reine du Gospel". Avec sa voix puissante et expressive, elle a joué un rôle majeur dans la popularisation de la musique gospel à travers le monde. Elle a également été une figure importante du mouvement des droits civiques.'
        },
        'kirk': {
            nom: 'Kirk Franklin',
            bio: 'Kirk Franklin (né en 1970) est un musicien, compositeur et producteur de gospel américain primé aux Grammy Awards. Il est connu pour son approche innovante, fusionnant le gospel avec des éléments de hip-hop, R&B et pop, attirant un public jeune et diversifié.'
        }
        // Ajoutez d'autres artistes ici
    };

    // Fonction pour ouvrir une modale
    const openModal = (modalElement) => {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer une modale
    const closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        document.body.style.overflow = 'auto';

        // Spécifique pour la modale vidéo : arrêter la lecture
        const videoIframe = modalElement.querySelector('iframe');
        if (videoIframe) {
            const currentSrc = videoIframe.src;
            videoIframe.src = ''; // Vide le src pour arrêter la vidéo
            videoIframe.src = currentSrc; // Réinitialise le src pour qu'elle puisse rejouer
        }
    };

    // Délégation d'événements pour les boutons d'ouverture de modale (chants et artistes)
    document.addEventListener('click', (event) => {
        // Boutons "Regarder la vidéo"
        if (event.target.classList.contains('open-video-modal')) {
            const videoUrl = event.target.dataset.videoUrl;
            const videoTitle = event.target.closest('.chant-item').querySelector('h3').textContent; // Récupère le titre du chant
            maModaleVideo.querySelector('h2').textContent = videoTitle;
            maModaleVideo.querySelector('iframe').src = videoUrl;
            openModal(maModaleVideo);
        }

        // Boutons "Lire la biographie"
        if (event.target.classList.contains('open-artist-modal')) {
            const artistId = event.target.dataset.artistId;
            const artist = artistesData[artistId];
            if (artist) {
                maModaleArtiste.querySelector('h2').textContent = artist.nom;
                maModaleArtiste.querySelector('.artiste-bio').textContent = artist.bio;
                openModal(maModaleArtiste);
            }
        }

        // Boutons de fermeture des modales
        if (event.target.classList.contains('fermer-bouton') && event.target.closest('.modale')) {
            closeModal(event.target.closest('.modale'));
        }

        // Fermeture des modales en cliquant en dehors
        if (event.target.classList.contains('modale')) {
            closeModal(event.target);
        }
    });

    // Fermeture des modales/menu avec la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (maModaleVideo.classList.contains('show')) {
                closeModal(maModaleVideo);
            }
            if (maModaleArtiste.classList.contains('show')) {
                closeModal(maModaleArtiste);
            }
            if (sideMenu.classList.contains('open')) {
                sideMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // --- Gestion de la classe 'active' pour les liens de navigation ---
    const sections = document.querySelectorAll('main section');

    const updateActiveLink = () => {
        let currentActiveSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Ajustez ce décalage si votre header est grand
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSection = section.id;
            }
        });

        menuLinks.forEach(link => {
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
