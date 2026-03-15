let panier = JSON.parse(localStorage.getItem('panier')) || [];


function mettreAJourPanier() {
    const compteur = document.getElementById('panier-compteur');
    if (compteur) {
        compteur.textContent = panier.length;
    }
    localStorage.setItem('panier', JSON.stringify(panier));
}


function ajouterAuPanier(nom, prix) {
    panier.push({
        id: Date.now(),
        nom: nom,
        prix: prix
    });
    mettreAJourPanier();
    alert(`✅ ${nom} ajouté au panier !`);
}


function afficherPanier() {
    const modal = document.getElementById('modalPanier');
    const contenu = document.getElementById('panier-contenu');
    
    if (panier.length === 0) {
        contenu.innerHTML = '<p class="panier-vide">Votre panier est vide</p>';
    } else {
        let html = '<ul class="panier-liste">';
        let total = 0;
        
        panier.forEach((item, index) => {
            total += item.prix;
            html += `
                <li class="panier-item">
                    <span>${item.nom}</span>
                    <span>${item.prix} XOF</span>
                    <button onclick="supprimerDuPanier(${index})" class="btn-supprimer">✕</button>
                </li>
            `;
        });
        
        html += `<li class="panier-total"><strong>Total: ${total} XOF</strong></li>`;
        html += '</ul>';
        contenu.innerHTML = html;
    }
    
    modal.style.display = 'block';
}


function supprimerDuPanier(index) {
    panier.splice(index, 1);
    mettreAJourPanier();
    afficherPanier();
}


function viderPanier() {
    if (confirm('Vider le panier ?')) {
        panier = [];
        mettreAJourPanier();
        afficherPanier();
    }
}


function fermerPanier() {
    document.getElementById('modalPanier').style.display = 'none';
}


function payer() {
    if (panier.length === 0) {
        alert('Votre panier est vide');
        return;
    }
    
    const total = panier.reduce((acc, item) => acc + item.prix, 0);
    
    
    const numero = prompt("📱 Votre numéro Orange Money (ex: 781234567) :", "");
    
    if (numero) {
        
        const articles = panier.map(item => `- ${item.nom}: ${item.prix} XOF`).join('\n');
        const message = `🛍️ NOUVELLE COMMANDE\n\nClient: ${numero}\nMontant: ${total} XOF\n\nArticles:\n${articles}`;
        
        
        window.location.href = `https://wa.me/221781234567?text=${encodeURIComponent(message)}`;
        
        
        panier = [];
        mettreAJourPanier();
        fermerPanier();
    }
}


window.onclick = function(event) {
    const modal = document.getElementById('modalPanier');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


mettreAJourPanier();