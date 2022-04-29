//réaliser une apllication Web pour la visualisation des horaires de la filière IM

//Fonctions ajoutées pour gérer les dates
/**
 * Convertit une string au format ISO 8601 (avec heures UTC) en objet Date
 *
 * @param {string} str La date au format ISO 8601 avec heures UTC
 * @return {Date} en "local timezone"
 */
function strToDate(str) {
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

function compareEvents(event1, event2) {
    let date1 = event1.querySelector('DTSTART').textContent;
    let date2 = event2.querySelector('DTSTART').textContent;
    return date1.localeCompare(date2);
  }


const templateCourse = document.querySelector('.template-course').cloneNode(true);
templateCourse.classList.remove('template');

// Ajout des fonctions aides
function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
    domForEach(selector, ele => ele.addEventListener(event, callback, options));
}

// FETCH fonction
async function loadXml(url) {
    const response = await fetch(url); //await n'exécute pas la prochaine commande tant que la dernière n'est pas prête
    const xmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, 'text/xml'); //retourne un arbre avec les valeurs XML. (DOM XML)
}

//clône des balises tr pour pouvoir insérer des données par la suite 

TMPL_COURSE = document.querySelector('.template-course').cloneNode(true);
TMPL_COURSE.classList.remove('template');

//------------------------------------------------------------------------------------------------------------------------------------------------------------
// 01 Gestion des événements
// 01-1 Gérez les clicks sur les boutons possédant la classe css btn-schedule. (oké)
// 01-2 Lors d'un click, vous devez récupérer l'attribut data-class-id contenant l'identifiant de la classe. Utilisez la propriété dataset pour le faire. (oké)
// 01-2-2 Vous devez aussi ajouter la classe css selected bouton cliqué (et la supprimer des autres boutons)

const boutons = document.querySelectorAll('.btn-schedule');
let classe = "M49-1";
let URLparClasse;

for (let bouton of boutons) {
    bouton.addEventListener('click', async evt => { //préciser que c'est une fonction asynchrone : se fait dans nimp mais on doit préciser du coup
        classe = bouton.dataset.classId; //la syntaxe de la propriété dataset demande d'enlever les tirets et de mettre des majuscules (mais pas au début). 
        //console.log(classe); 
        if (!bouton.classList.contains('selected')) {
            for (const bouton of boutons) {
                if (bouton.classList.contains('selected')) {
                    bouton.classList.remove('selected');
                }
            }
            bouton.classList.add('selected');
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------
        // 02 Fetch API
        // 02-1 Une fois l'identifiant de la classe récupérer, vous allez devoir retrouver le XML associé. Le XML est à récupérer via l'API Fetch. L'URL
        // respecte l'exemple suivant : https://chabloz.eu/files/horaires/XXX.xml. (Il suffit de remplacer XXX par l'identifiant de la classe)
        // 02-3 Améliorer la requête Fetch pour que l'utilisateur ne puisse pas charger plusieurs horaires en même temps.
        // Pour ce faire, vous pouvez désactiver les boutons dés que l'un deux est cliqué, et les réactiver dès que la requête est finie. 

        URLparClasse = 'https://chabloz.eu/files/horaires/' + classe + '.xml';
        console.log(URLparClasse);
        bouton.setAttribute('disable', true); 

        loadXml(URLparClasse) //appeler la fonction pour aller récupérer les données qui correspondent à la classe précise
        .then(xml => { //.then a une fonction callback. Le xml ici représente le return de la fonction loadXml
           const AllblocCours = [...xml.querySelectorAll('VEVENT')]; //récupérer toutes les balises vevent 
           console.log(AllblocCours);
           AllblocCours.sort((c1, c2) =>{
               let date1 = c1.querySelector('DISTRAT').textContent;
               let date2 = c2.querySelector('DISTRAT').querySelector;
               return date1.localeCompare(date2);
           })
           const futurCours = AllblocCours.filter(evt => {
               let dateStart = strToDate(evt.querySelector('DETEND').textContent);
               return dateStart > newDate();
           })
          
        
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // 03 Traitement des données des horaires
        // 03-1 Récupérez les éléments VEVENT du DOM XML de l'horaire (oké)
        // 03-2 Filtrez le tableau pour qu'il ne contienne que les éléments dont date de fin (élément DTEND) se situe dans 
        // le futur. (vous pouvez convertir DTEND en objet Date grâce à strToDate, il suffit alors de la comparer avec new Date() pour savoir si elle est dans le futur)
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // 04 Génération du DOM des horaires
        // 04-1 Parcourez l'ensemble des events traités au point précédent et générez un tr (avec ses td) pour chacun d'eux. 
        // (pour transformer un event en tr, clonez le tr ayant la classe template-course (déjà existant dans le DOM))
        // 04-2 Injectez les bonnes données dans chaque td. Utilisez les classes CSS présentes dans la template afin d'éviter un maximum d'être lié aux balises. 
        // Pour obtenir les bonnes données, utilisez les fonctions de date du point mise en place. Finalement, injectez chaque tr créé dans le tbody de #schedule (par exemple avec appendChild ou peut être mieux replaceChildren).
        
           for(const course of futurCours){
               let dateStart = course.querySelector('DISTRAT').textContent;
               dateStart = dateToFrCh(strToDate(dateStart));
               const tmpl = TMPL_COURSE.cloneNode(true);
               tmpl.querySelector('date').textContent = dateStart;
               document.querySelector('#schedule').appendChild(tmpl); // pour automatiser la démarche
           }



        })




        //bouton.removeAttribute('disable', true); réactiver le bouton
    })

    
}






