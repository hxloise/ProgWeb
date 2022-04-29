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
    return data.postalcodes;
}


const URL_inc = 'http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode='; //code postale
const URL_IMG_inc = 'https://chabloz.eu/map/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center='; //latitude,longitude

const VilleParam = new Map(); //une libraire pour stocker les infos des villes 

domOn('#container', 'input', async evt => {
    const input = evt.target;
    let codePostale;
    if (input.value > 1000 && input.value < 9999) {
        codePostale = input.value;

        const URL_comp = `${URL_inc}${codePostale}`;

        const reponse = await loadJSON(URL_comp);

        const nomVilles = [];
        reponse.forEach(ligneTab => {
            const nom = document.createElement('option');
            nom.textContent = ligneTab.placeName;

            //remplir la libraire des infos de la ville 
            VilleParam.set(nom, { lat: ligneTab.lat, long: ligneTab.lng });
            //prendre le nom de la ville de notre librairie et le mettre dans le tableau des noms 
            nomVilles.push(nom);

            document.querySelector('#localite').replaceChildren(...nomVilles);
            //Déclenche sur l'élément HTML l'événement passé en paramètre, créer un nouvel événement avec le nom input
            document.getElementById('localite').dispatchEvent(new Event('input'));
        })
    }
})

domOn('#localite', 'input', async evt => {
    //pour séléctionner le premier élément des options
    let villeUne = document.querySelector('#localite').selectedOptions[0];
    
    //chercher la latitude et la longitude dans notre librairie
    const lat = VilleParam.get(villeUne).lat;
    const long = VilleParam.get(villeUne).long; 
    
    const URL_IMG_comp = `${URL_IMG_inc}${lat}${','}${long}`;
    
    //mettre à jour l'image
    document.querySelector('#map').src = URL_IMG_comp;
})

