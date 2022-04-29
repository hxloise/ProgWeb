// Fonctions aides
function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
    domForEach(selector, ele => ele.addEventListener(event, callback, options));
}
//clones du DOM
const tmplFilm = document.querySelector('.template-movie').cloneNode(true);
tmplFilm.classList.remove('template');
const tmplNoFilm = document.querySelector('.template-no-result').cloneNode(true);
tmplNoFilm.classList.remove('template');


//URL de WS
const URLFilm = 'https://chabloz.eu/movies/?query=';
const URLImage = 'https://chabloz.eu/movies/thumb/?id=';
const URLNotation = 'https://chabloz.eu/movies/rating/get/?id=';
const URLNoteUtilisateur = 'https://chabloz.eu/movies/rating/post/?id=';


domOn('#btnSearch', 'click', async evt => {
    //const btn = evt.target;
    //empêcher que le Dom se recharge, car c'est le comportement par défault d'un bouton
    evt.preventDefault();
    let ville = document.querySelector('input').value;
    //création de l'url pour pouvoir utiliser le WS
    const url = `${URLFilm}${ville}`; //syntaxe de concaténation 
    //faire la requête
    const tabFilm = await loadJSON(url);
    tabFilm.sort((m1, m2) => m1.title.localeCompare(m2.title));
    //éviter de cumuler car redéclaré à chaque click
    const newFilms = [];
    for (const film of tabFilm) {
        const newFilm = addFilm(film);
        newFilms.push(newFilm);
    }
    document.querySelector('div#results').replaceChildren(...newFilms);
    if (newFilms.length == 0) {
        //afficher la div qui contient le texte pas de film trouvé
        document.querySelector('div#results').replaceChildren(tmplNoFilm);
        return;
    }

    for (const film of tabFilm) {
        //aller récupérer le XML correspondant à chaque film
        const xmlNotation = await loadXml(URLNotation + film.id);
        addNotation(xmlNotation, film.id);
    }
})

//Gestion de la notation des utilisateurs
//pour sélectionner la classe rate-it seulement
domOn('#results', 'click', async evt => {
    btn = evt.target;
    //utiliser dataset pour pouvoir récupérer ce qu'il y a dans btn
    if(!btn.dataset.rating)return;
    //récupérer la note qu'à choisie l'utilisateur 
    const NoteChoisie = btn.dataset.rating;
    //récupérer l'id du film
    const movieId = btn.dataset.MovieId;
    const xmlNotation = await loadXml(`${URLNoteUtilisateur}${movieId}&rating=${NoteChoisie}`);
    addNotation(xmlNotation, movieId);
})

function addFilm(film) {
    const newFilm = tmplFilm.cloneNode(true);//sorte de sécurité
    //récupérer id pour url
    newFilm.setAttribute('data-movie-id', film.id);
    const idImage = newFilm.getAttribute('data-movie-id');
    const URL = `${URLImage}${idImage}`;
    newFilm.querySelector('.title').textContent = film.title;
    newFilm.querySelector('.description').textContent = film.description;
    newFilm.querySelector('.thumb').setAttribute('src', URL);
    return newFilm;//contient le titre et l'id (et ça pour chaque film)
}

function addNotation(xmlNotation, idFilm){
    //Récupération des notations des films
    const notation = xmlNotation.querySelector('rating > rating').textContent;
    const votes = xmlNotation.querySelector('votes').textContent;
    //créer un template pour chaque film avec l'id du film qui correspond
    const tmpl = document.querySelector(`[data-movie-id ="${idFilm}"]`);
    //arrondir la note lors de l'ajout
    tmpl.querySelector('.rating').textContent = Math.round(notation);
    //ajouter la classe .rating avec le bon nombre d'étoile donc arrondir
    tmpl.querySelector('.rating').classList.add(`rating${Math.round(notation)}`);
    tmpl.querySelector('.votes').textContent = votes;
    //stocker l'id du film 
    tmpl.querySelectorAll('.rate-it').forEach(btn => btn.dataset.MovieId = idFilm);
}

//FETCH au format JSON
async function loadJSON(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data;
}
// FETCH au format XML
async function loadXml(url) {
    const response = await fetch(url); //await n'exécute pas la prochaine commande tant que la dernière n'est pas prête
    const xmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, 'text/xml'); //retourne un arbre avec les valeurs XML. (DOM XML)
}