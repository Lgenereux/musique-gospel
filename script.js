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
