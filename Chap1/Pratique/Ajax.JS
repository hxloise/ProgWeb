// 01 WebService pour les localités
const WS_POSTAL = 'http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode=';
// pour stocker les longitudes et latitudes des lieux
const pos = new Map();
//récupérer la donnée entrée par l'utilisateur = écouter un changement de l'input
const NPA_input = document.getElementById('code'); // pour récupérer la valeur de l'input 
console.log(NPA_input);
NPA_input.addEventListener('input', async evt => {
    if (NPA_input.value > 1000 && NPA_input.value < 9999) {
        //création de l'url stockée dans une const 
        const URL = WS_POSTAL + NPA_input.value;
        //faire la requête et stocker son résultat
        const PostalCodes = await loadJSON(URL);

        //parcourir la réponse
        const villes = [];
        PostalCodes.forEach(code => {
            const opt = document.createElement('option');
            opt.textContent = code.placeName;

            //stocker la position en lat et long dans la map (liste d'élément avec une clé)
            pos.set(opt, { lat: code.lat, long: code.lng });
            villes.push(opt);
            console.log(pos);

        })
        document.querySelector('#localite').replaceChildren(...villes);
        document.getElementById('localite').dispatchEvent(new Event('input'));
    }
})
//WebService pour la carte statique de la localité
const localite = document.querySelector('#localite');
//écouter l'événement pour savoir quand la fonction doit s'éxecuter
localite.addEventListener('input', evt => {
    //récupérer la ville séléctionnée 
    let opt = document.querySelector('#localite').selectedOptions[0]; //pour séléctionner le premier de la liste
    console.log(pos);
    //latitude et longitude de l'emplacement de la ville
    const lat = pos.get(opt).lat;
    const lng = pos.get(opt).long;
    console.log(lat, lng);
    //construction de l'url
    const URLimage = 'https://chabloz.eu/map/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center=' + lat + "," + lng;
    console.log(URLimage);
    document.getElementById("map").src = URLimage;
})
// FETCH fonction
async function loadJSON(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data.postalcodes;
}
