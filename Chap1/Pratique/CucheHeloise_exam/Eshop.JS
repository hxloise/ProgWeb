// Fonctions aides
function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
    domForEach(selector, ele => ele.addEventListener(event, callback, options));
}
//FETCH au format JSON
async function loadJSON(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data;
}
// FETCH au format XML
async function loadXml(url) {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, 'text/xml');
}

//clone affichage de produit
const tmplProduit = document.querySelector('.tmpl-product').cloneNode(true);
tmplProduit.classList.remove('tmpl');
const tmplNonProduit = document.querySelector('.tmpl-no-result').cloneNode(true);
tmplNonProduit.classList.remove('tmpl');

//URL pour faire les requêtes incomplètes
const URL_produit_inc = 'https://chabloz.eu/eshop/?type='; //ajouter le type [keyboard,mouse,headset]
const URL_recherche_inc = 'https://chabloz.eu/eshop/search/?query=';//ajouter le mot clé cherché par l'utilisateur
const URL_moreInfo_inc = 'https://chabloz.eu/eshop/info/?id=';// ajouter l'id

const map = new Map(); //création de la libraire pour pouvoir stocker l'id du produit

//écoute du click sur les boutons de catégories
domOn('.btn-product', 'click', async evt => {
    const btn = evt.target;
    const btns = document.querySelectorAll('.btn-product');

    for (const bouton of btns) {
        if (bouton == btn) {
            btn.classList.add('selected');
        } else {
            bouton.classList.remove('selected');
        }
    }

    const type_produit = btn.getAttribute('data-product-type');

    const URL_produit_comp = `${URL_produit_inc}${type_produit}`;
    const JSON_produit = await loadJSON(URL_produit_comp);

    JSON_produit.sort((a, b) => {
        const prixA = a.price;
        const prixB = b.price;
        return prixA < (prixB);
    });

    // console.log(JSON_produit);

    const produitDom = [];
    for (const produit of JSON_produit) {
        const produitDiv = addproduit(produit);
        produitDom.push(produitDiv);
    }

    // console.log(produitDom);
    document.querySelector('#results').replaceChildren(...produitDom);

    //validation du champs de recherche
    document.querySelector('#search-product').value = '';

    domOn('.btn-more', 'click', async evt =>{

        document.querySelector('#modal').classList.remove('hidden');
        
        domOn('.btn-close-modal', 'click', evt =>{
            document.querySelector('#modal').classList.add('hidden');
        })
         
    })

})


domOn('#search-product', 'change', async evt => {
    const input = document.querySelector('#search-product').value;

    const URL_recherche_comp = `${URL_recherche_inc}${input}`;
    const JSON_recherche = await loadJSON(URL_recherche_comp);

    //désactiver la couleur des boutons
    const btns = document.querySelectorAll('.btn-product');
    for (const bouton of btns) {
        bouton.classList.remove('selected');
    }

    const rechercheproduit = [];
    for (const produit of JSON_recherche) {
        const produitConstruct = addproduit(produit);
        rechercheproduit.push(produitConstruct);
    }

    document.querySelector('#results').replaceChildren(...rechercheproduit);

    if (rechercheproduit.length == 0) {
        //afficher la div qui contient le texte pas de produit trouvé
        document.querySelector('#results').replaceChildren(tmplNonProduit);
        return;
    }
    domOn('.btn-more', 'click', async evt =>{

        document.querySelector('#modal').classList.remove('hidden');
        
        domOn('.btn-close-modal', 'click', evt =>{
            document.querySelector('#modal').classList.add('hidden');
        })
         
    })

})

function addproduit(produit) { 
    const nom = produit.name;
    const marque = produit.brand;
    const type = produit.type;
    const prix = produit.price;

    map.set(nom, {id: produit.id}); 

    const tmpl = tmplProduit.cloneNode(true);

    tmpl.querySelector('.name').texContent = produit.name;
    tmpl.querySelector('.brand').texContent = marque;
    tmpl.querySelector('.type').texContent = type;
    tmpl.querySelector('.price').texContent = prix;

    // console.log(tmpl);
    return tmpl;
}