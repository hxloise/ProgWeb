const URL_film = 'https://chabloz.eu/sw/films';
const tmplFilm = document.querySelector('.tmpl-movie').cloneNode(true);
tmplFilm.classList.remove('tmpl');
const planetMap = new Map();

loadFilm();

async function loadFilm() {
    const jsonFilm = await loadJSON(URL_film);
    jsonFilm.sort((id1, id2) => id1.episode_id - id2.episode_id);
    console.log(jsonFilm);

    const templateFilms = [];
    for (const film of jsonFilm) {
        const newtemplateFilm = FilmDom(film);
        
        planetMap.set(templateFilms, { URLS: film.planets});
        templateFilms.push(newtemplateFilm);
        console.log(templateFilms); 
        
    }
    // planetMap.set(templateFilms, { URLS: URLS_planets });

    document.querySelector('#movies').replaceChildren(...templateFilms);



}
function PlanetDom(film) {
    //click sur le bouton Show planets
    domOn('.btn-planets', 'click', async evt => {
        const btn = evt.target;
        btn.setAttribute('disabled', 'true');
        const FilmDiv = btn.parentNode;
        const id = FilmDiv.querySelector('.ph-movie-episode_id').textContent
        console.log(id);
        const tab = [planetMap.get(`${id}`).URLS];
        console.log(tab);
        //réactiver le bouton
        // btn.removeAttribute('disabled', 'true');
    })

}

function FilmDom(json) {
    const tmpl = tmplFilm.cloneNode(true);
    const titre = json.title;
    const idFilm = json.episode_id;
    tmpl.querySelector('.ph-movie-episode_id').textContent = idFilm;
    tmpl.querySelector('.ph-movie-title').textContent = titre;
    URLS_planets = [...json.planets];

    return tmpl;
}

/** 
 * Effectue plusieurs requêtes HTTP GET afin d'aller charger les URLs pointant
 * sur des données au format JSON. La fonction retourne un tableau contenant tous
 * les résultats ("désérialisés"). 
 * 
 * @param {array} urls Les URLs à charger (dont le contenu est du JSON)
 * @return {array} un tableau contenant les résultats de chaque requête 
 */
async function loadJsonUrls(urls) {
    const results = await Promise.all(urls.map(url => fetch(url)));
    const responses = await Promise.all(results.map(result => result.json()));
    return responses;
}

//Fonctions aides
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
    return data.results;
}