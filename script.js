document.addEventListener('DOMContentLoaded', function() {
    // === GESTION DES MODALES : VIDÉO/CHANT ===
    var modaleVideo = document.getElementById("maModaleVideo");
    var btnOuvrirVideo = document.getElementById("ouvrirModaleVideo");
    var spanFermerVideo = modaleVideo.querySelector(".fermer-bouton");

    if (btnOuvrirVideo) {
        btnOuvrirVideo.onclick = function() {
            modaleVideo.style.display = "flex"; // Affiche la modale en utilisant flex pour le centrage
        }
    }

    if (spanFermerVideo) {
        spanFermerVideo.onclick = function() {
            modaleVideo.style.display = "none"; // Cache la modale
            // Arrête la lecture de la vidéo lorsque la modale se ferme
            var iframe = modaleVideo.querySelector('iframe');
            if (iframe) {
                var iframeSrc = iframe.src;
                iframe.src = iframeSrc; // Recharge l'iframe pour arrêter la vidéo
            }
        }
    }

    // === GESTION DES MODALES : ARTISTE ===
    var modaleArtiste = document.getElementById("maModaleArtiste");
    var btnOuvrirArtiste = document.getElementById("ouvrirModaleArtiste");
    var spanFermerArtiste = modaleArtiste.querySelector(".fermer-bouton");

    if (btnOuvrirArtiste) {
        btnOuvrirArtiste.onclick = function() {
            modaleArtiste.style.display = "flex";
        }
    }

    if (spanFermerArtiste) {
        spanFermerArtiste.onclick = function() {
            modaleArtiste.style.display = "none";
        }
    }

    ---

    // === GESTION DU MENU LATÉRAL ===
    var menuLateral = document.getElementById("menuLateral");
    var btnOuvrirMenuLateral = document.getElementById("ouvrirMenuLateral");
    var btnFermerMenuLateral = document.querySelector(".fermer-bouton-lateral");

    // Fonction pour ouvrir le menu latéral
    if (btnOuvrirMenuLateral) {
        btnOuvrirMenuLateral.onclick = function() {
            menuLateral.style.width = "250px"; // Définit la largeur pour le rendre visible
            document.body.classList.add("menu-ouvert"); // Ajoute une classe au corps pour décaler le contenu
            menuLateral.classList.add("ouvert"); // Ajoute une classe au menu latéral lui-même pour le style CSS
        }
    }

    // Fonction pour fermer le menu latéral
    if (btnFermerMenuLateral) {
        btnFermerMenuLateral.onclick = function() {
            menuLateral.style.width = "0"; // Réinitialise la largeur à 0 (cache le menu)
            document.body.classList.remove("menu-ouvert"); // Retire la classe du corps pour ramener le contenu
            menuLateral.classList.remove("ouvert"); // Retire la classe du menu latéral
        }
    }

    // Gère la fermeture du menu si on clique sur un lien à l'intérieur
    var liensMenuLateral = menuLateral.querySelectorAll('a');
    liensMenuLateral.forEach(function(link) {
        link.onclick = function() {
            menuLateral.style.width = "0";
            document.body.classList.remove("menu-ouvert");
            menuLateral.classList.remove("ouvert");
        }
    });

    ---

    // === GESTION DES CLICS GLOBAUX (pour fermer les modales et le menu latéral) ===
    // Cette fonction gère les clics n'importe où sur la fenêtre.
    // Elle DOIT REMPLACER TOUTE FONCTION window.onclick précédente que vous pourriez avoir.

    window.onclick = function(event) {
        // Logique de fermeture des modales (code existant, assure que les modales se ferment au clic en dehors)
        if (event.target == modaleVideo) {
            modaleVideo.style.display = "none";
            // Arrête la lecture de la vidéo si elle est en cours
            var iframe = modaleVideo.querySelector('iframe');
            if (iframe) {
                var iframeSrc = iframe.src;
                iframe.src = iframeSrc;
            }
        }
        if (event.target == modaleArtiste) {
            modaleArtiste.style.display = "none";
        }

        // Logique de fermeture du menu latéral
        // Vérifie si le menu latéral est ouvert
        // ET si l'élément cliqué N'EST PAS le bouton d'ouverture du menu latéral
        // ET si l'élément cliqué N'EST PAS à l'intérieur du menu latéral lui-même.
        if (menuLateral.style.width === "250px" && event.target !== btnOuvrirMenuLateral && !menuLateral.contains(event.target)) {
            menuLateral.style.width = "0"; // Ferme le menu
            document.body.classList.remove("menu-ouvert"); // Retire la classe de décalage
            menuLateral.classList.remove("ouvert"); // Retire la classe CSS
        }
    }
}); // Fin de document.addEventListener('DOMContentLoaded')
