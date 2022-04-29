const tmpl = document.querySelector('.tmpl-movie').cloneNode(true);
tmpl.classList.remove('tmpl');
const store = new Map(); // création d'une librairie
const tmplPlanet = document.querySelector('.tmpl-planet');
tmplPlanet.classList.remove('tmpl');
// Ajout des fonctions aides
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  domForEach(selector, ele => ele.addEventListener(event, callback, options));
}

/** 
 * Effectue plusieurs requêtes HTTP GET afin d'aller charger les URLs pointant
 * sur des données au format JSON. La fonction retourne un tableau contenant tous
 * les résultats ("désérialisés"). 
 * 
 * @param {array} urls Les URLs à charger (dont le contenu est du JSON)
 * @return {array} un tableau contenant les résultats de chaque requête 
 */

//cette fonction prend plusieurs Urls et ne peut pas en recevoir qu'une seule
async function loadJsonUrls(urls) {
  const results = await Promise.all(urls.map(url => fetch(url)));
  const responses = await Promise.all(results.map(result => result.json()));
  return responses;
}
//SW movies
// lien vers les données des films starWars
const URL = 'https://chabloz.eu/sw/films';
// Ne prendre que la partie result des données
// FETCH fonction
async function loadJSON(url) {
  let response = await fetch(url);
  const data = await response.json();
  return data.results; //pour prendre que la partie result
}
const newFilms = []; //pour stocker chaque film dedans
async function loadFilm() {
  const tabFilm = await loadJSON(URL); //attendre la réponse avant de pouvoir passer à l'action suivante
  // Trier le tableau reçu par ordre croissant
  tabFilm.sort((a, b) => a.episode_id - b.episode_id); //Compare tous les éléments du tableau entre eux (mais à chaque fois 2 par 2)
  console.log(tabFilm);
  for (const film of tabFilm) {
    const newFilm = addFilm(film);
    newFilms.push(newFilm);
    store.set(newFilm, { planets: film.planets }); //stock les urls de chaques planètes
  }

  //afficher le tableau de films
  document.getElementById('movies').replaceChildren(...newFilms); //... pour que les éléments soient pris séparément (ou ensemble on sait po)
}
function addFilm(film) {
  const newFilm = tmpl.cloneNode(true); // cloner le clone pour que tout soit safe, repars du dom initial
  newFilm.querySelector('.btn-planets').dataset.movieId = film.episode_id;
  //ajouter l'identifiant du film
  newFilm.setAttribute('data-movie-id', film.episode_id); //va chercher l'id du JSON et le met dans l'attribut spécialement créé data-movie-id
  newFilm.querySelector('.ph-movie-title').textContent = film.title;
  newFilm.querySelector('.ph-movie-episode_id').textContent = film.episode_id;
  return newFilm; //contient le titre et l'id (et ça pour chaque film)
}
loadFilm();
//SW planet
//Gérer les cliks sur le bouton 
domOn('#movies', 'click', async evt => {
  //enregistrer l'endroit du click
  const btn = evt.target;
  if (!btn.classList.contains('btn-planets')) return;
  //regarder si le dom a déjà été chargé ou non
  if (btn.dataset.loaded) { //ne fait pas de requête
    //stocker l'id du film 
    const id = btn.dataset.movieId;
    const planets = document.querySelector(`[data-movie-id='${id}'] .planets`);
    planets.classList.toggle("hidden");
  } else {
    //désactiver le bouton cliqué
    btn.setAttribute('disabled', true);
    const IconeLoad = document.querySelector('#fetch-loader');
    IconeLoad.classList.remove('hidden'); 
    IconeLoad.style.setProperty('display', 'block'); 
    // tmplPlanet.classList.toggle('tmpl');
    await loadPlanet(btn);
    IconeLoad.classList.add('hidden');
    IconeLoad.style.removeProperty('display', 'block');
    btn.dataset.loaded = true; //indique que le dom a été chargé
    //activer le bouton cliqué
    btn.removeAttribute('disabled', true);
  }


})
function addPlanet(Planet) {
  const clone = tmplPlanet.cloneNode(true); //liste de li pour mettre les planètes dedans clonée
  //affecter et lier les valeurs cohérantes entre elles
  clone.querySelector('.ph-planet-name').textContent = Planet.name;
  clone.querySelector('.ph-planet-climate').textContent = Planet.climate;
  clone.querySelector('.ph-planet-diameter').textContent = Planet.diameter;
  return clone;
}
async function loadPlanet(btn) {
  //charger toutes les données des planètes du film dans un tableau 
  const film = btn.parentNode; //le parent du bouton 
  //récupérer l'id du film pour avoir que les données du bouton 
  const URL = store.get(film).planets; //a besoin d'un film pour pouvoir ressortir une URL et pas juste un int
  console.log(URL);
  const Planet = await loadJsonUrls(URL); //prend un tableau d'URL  
  // console.log(Planet);
  //Ordre alphabétique
  Planet.sort((a, b) => {
    const planetA = a.name;
    const planetB = b.name;
    return planetA.localeCompare(planetB);
  });
  const tabPlanet = [];
  for (const planet of Planet) {
    const newPlanet = addPlanet(planet);
    tabPlanet.push(newPlanet);
  }
  const id = film.dataset.movieId;
  document.querySelector(`[data-movie-id='${id}'] .planets`).replaceChildren(...tabPlanet);
}



