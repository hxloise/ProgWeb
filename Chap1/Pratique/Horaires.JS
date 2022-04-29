/**
 * Convertit une string au format ISO 8601 (avec heures UTC) en objet Date
 *
 * @param {string} str La date au format ISO 8601 avec heures UTC
 * @return {Date} en "local timezone"
 */
 function strToDate(str){
    return new Date(Date.UTC(
      str.substr(0, 4),
      str.substr(4, 2) - 1,
      str.substr(6, 2),
      str.substr(9, 2),
      str.substr(11, 2),
      str.substr(13, 2)
    ));
  }
  /**
   * Convertit un objet Date en string au format FR_CH simplifié
   *
   * @param {Date}
   * @return {string} exemple de retour: "Lun 02.11"
   */
  function dateToFrCh(date) {
    let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    let day = date.getDate();
    let dayName = mapDay[date.getDay()];
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${dayName} ${day}.${month}`;
  }
  /**
   * Convertit un objet Date au format heures:minutes en "local timezone"
   *
   * @param {Date}
   * @return {string} exemple de retour: "15:32"
   */
  function dateToHours(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
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
    return data;
}
// FETCH au format XML
async function loadXml(url) {
    const response = await fetch(url); //await n'exécute pas la prochaine commande tant que la dernière n'est pas prête
    const xmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, 'text/xml'); //retourne un arbre avec les valeurs XML. (DOM XML)
}


const URL_inc = " https://chabloz.eu/files/horaires/"; //ajouter 'id.xml'
const TMPL_COURSE = document.querySelector('.template-course').cloneNode(true);
TMPL_COURSE.classList.remove('template'); 

//Gestion des événements et FETCH
domOn('.btn-schedule', 'click', async evt =>{
    //stocker la div du bouton clické
    btn = evt.target;
    //stocker tous les autres boutons dans un tableau d'objets 
    btns = document.querySelectorAll('.btn-schedule');
    const idClasse = btn.getAttribute('data-class-id');
    for (const bouton of btns) {
        if(bouton == btn){
            btn.classList.add('selected');
        }else{
            bouton.classList.remove('selected');
        }
    }
    //création de l'url ou se trouve le xml de l'horaire
    const URL_comp = `${URL_inc}${idClasse}${'.xml'}`;
    console.log(URL_comp);

    //désactiver le bouton
    domForEach('.btn-schedule', el => el.setAttribute('disabled', 'true'));

    //peut-être réaliser avec la fonction loadXML ! 
    const xmlHoraires = await fetch(URL_comp);
    const xmlText = await xmlHoraires.text();
    const parser = new DOMParser();
    const xmlDom = parser.parseFromString(xmlText, 'text/xml');

    //récupérer les VEVENT 
    const Vevent = [...xmlDom.querySelectorAll('VEVENT')];
    const dateJour = new Date(); 
    //créer un tableau qui contient que les données avec une date postérieur à la date courante
    const CoursFuturs = Vevent.filter(evt => checkfutur(evt));
    //Trier par ordre chronologique 
    CoursFuturs.sort(compareEvents);
    
    const CoursDom = [];
    for (const cours of CoursFuturs) {
        CoursDom.push(tmplCourse(cours)); 
    }

    document.querySelector('#schedule').replaceChildren(...CoursDom); 


    //réactiver le bouton
    domForEach('.btn-schedule', el => el.removeAttribute('disabled'));

})

function checkfutur(cours){
  let dateDebut = strToDate(cours.querySelector('DTEND').textContent);
  //retourne seulement les éléments plus grand que la date courante
  return dateDebut > new Date; 
}

function compareEvents(cours1, cours2){
  let date1 = cours1.querySelector('DTEND').textContent;
  let date2 = cours2.querySelector('DTEND').textContent;
  return date1.localeCompare(date2);
}

function tmplCourse(cours){
  const dateDebut = strToDate(cours.querySelector('DTSTART').textContent);
  const dateFin = strToDate(cours.querySelector('DTEND').textContent);
  const HB = dateToHours(dateDebut);
  const HF = dateToHours(dateFin); 
  const nom = cours.querySelector('SUMMARY').textContent;
  const lieu = cours.querySelector('LOCATION').textContent;

  const tmpl = TMPL_COURSE.cloneNode(true);
  tmpl.querySelector('.date').textContent = dateToFrCh(dateDebut);
  tmpl.querySelector('.hours').textContent = `${HB} ${HF}`;
  tmpl.querySelector('.course').textContent = nom; 
  tmpl.querySelector('.room').textContent = lieu; 
  return tmpl; 
}

