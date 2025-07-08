document.addEventListener('DOMContentLoaded', function() {
    // === GESTION DE LA MODALE VIDÉO/CHANT ===
    var modaleVideo = document.getElementById("maModaleVideo"); // La modale elle-même
    var btnOuvrirVideo = document.getElementById("ouvrirModaleVideo"); // Le bouton qui ouvre la modale
    var spanFermerVideo = modaleVideo.querySelector(".fermer-bouton"); // Le bouton "x" pour fermer

    // Lorsque l'utilisateur clique sur le bouton, ouvrir la modale
    if (btnOuvrirVideo) {
        btnOuvrirVideo.onclick = function() {
            modaleVideo.style.display = "flex"; // Affiche la modale (flex pour centrer)
        }
    }

    // Lorsque l'utilisateur clique sur <span> (x), fermer la modale
    if (spanFermerVideo) {
        spanFermerVideo.onclick = function() {
            modaleVideo.style.display = "none"; // Cache la modale
            // Si c'est une vidéo, arrêtez la lecture quand la modale se ferme
            var iframe = modaleVideo.querySelector('iframe');
            if (iframe) {
                var iframeSrc = iframe.src;
                iframe.src = iframeSrc; // Recharge l'iframe pour arrêter la vidéo
            }
        }
    }

    // === GESTION DE LA MODALE ARTISTE ===
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
     document.addEventListener('DOMContentLoaded', function() {
    // ... votre code existant pour les modales ...

    // === GESTION DU MENU LATÉRAL ===
    var menuLateral = document.getElementById("menuLateral");
    var btnOuvrirMenuLateral = document.getElementById("ouvrirMenuLateral");
    var btnFermerMenuLateral = document.querySelector(".fermer-bouton-lateral");

    // Fonction pour ouvrir le menu latéral
    if (btnOuvrirMenuLateral) {
        btnOuvrirMenuLateral.onclick = function() {
            menuLateral.style.width = "250px"; // Définit la largeur d'ouverture
            document.body.classList.add("menu-ouvert"); // Ajoute une classe au body pour décaler le contenu
        }
    }

    // Fonction pour fermer le menu latéral
    if (btnFermerMenuLateral) {
        btnFermerMenuLateral.onclick = function() {
            menuLateral.style.width = "0"; // Réinitialise la largeur à 0 (cache le menu)
            document.body.classList.remove("menu-ouvert"); // Retire la classe pour ramener le contenu
        }
    }

    // Gérer la fermeture du menu si on clique sur un lien à l'intérieur
    var liensMenuLateral = menuLateral.querySelectorAll('a');
    liensMenuLateral.forEach(function(link) {
        link.onclick = function() {
            menuLateral.style.width = "0";
            document.body.classList.remove("menu-ouvert");
        }
    });

    // === MISE À JOUR de la fonction window.onclick pour inclure la fermeture du menu latéral ===
    // Il faut faire attention si vous avez déjà un window.onclick.
    // L'idéal est de regrouper toute la logique de fermeture au clic extérieur ici.

    var oldWindowOnClick = window.onclick; // Sauvegarde la fonction existante si elle existe

    window.onclick = function(event) {
        // Exécute d'abord l'ancienne fonction window.onclick si elle existe
        if (oldWindowOnClick) {
            oldWindowOnClick(event);
        }

        // Fermeture des modales existantes (code déjà présent, assurez-vous qu'il est inclus)
        var modaleVideo = document.getElementById("maModaleVideo");
        var modaleArtiste = document.getElementById("maModaleArtiste");

        if (event.target == modaleVideo) {
            modaleVideo.style.display = "none";
            var iframe = modaleVideo.querySelector('iframe');
            if (iframe) {
                var iframeSrc = iframe.src;
                iframe.src = iframeSrc;
            }
        }
        if (event.target == modaleArtiste) {
            modaleArtiste.style.display = "none";
        }

        // Fermeture du menu latéral si le clic est en dehors et que le menu est ouvert
        if (menuLateral.style.width === "250px" && event.target !== btnOuvrirMenuLateral && !menuLateral.contains(event.target)) {
            menuLateral.style.width = "0";
            document.body.classList.remove("menu-ouvert");
        }
    }

}); // Fin de document.addEventListener('DOMContentLoaded', function()

    // Quand l'utilisateur clique n'importe où en dehors de la modale, la fermer
    window.onclick = function(event) {
        if (event.target == modaleVideo) {
            modaleVideo.style.display = "none";
            // Arrête la vidéo si elle est en cours
            var iframe = modaleVideo.querySelector('iframe');
            if (iframe) {
                var iframeSrc = iframe.src;
                iframe.src = iframeSrc;
            }
        }
        if (event.target == modaleArtiste) {
            modaleArtiste.style.display = "none";
        }
    }
});
