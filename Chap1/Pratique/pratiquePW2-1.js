// Tableaux de nombres
//Exercice 1
const number = [3, 14, 15, 92, 65, 35, 89, 79, 32, 38];
Object.freeze(number);
//Afficher tous les nombres dans la console
console.log(number);
//Retourner un tableau avec les valeurs doublées
function Dbl(SimpleTab) {
    const DblTab = [];
    for (i = 0; i < SimpleTab.length; i++) {
        DblTab[i] = SimpleTab[i] * 2;
    }
    return DblTab;
}
console.log(Dbl(number));
//Version simplifiée avec la méthode map()
const map1 = number.map(x => x * 2); //créer un nouveau tableau en utilisant une fonction qui change chaque élément du tableau de base
console.log(map1);
//Retourner un tableau avec les valeurs impaires
const numberImpaires = number.filter(x => x % 2 != 0);
console.log(numberImpaires);
//Retourner un tableau ne contenant pas le premier élément
function NoFirst(WithFirst) {
    const MapWithFirst = WithFirst.map(x => x);
    const NoFirst = [];
    for (i = 0; i < MapWithFirst.length - 1; i++) {
        NoFirst[i] = MapWithFirst[i + 1];
    }
    return NoFirst;
}
console.log(NoFirst(number));
//Retourner un tableau ne contenant pas le dernier élément
function NoLast(tab) {
    const MapWithLast = tab.map(x => x);
    const NoLast = [];
    for (i = 0; i < tab.length - 1; i++) {
        NoLast[i] = MapWithLast[i];
    }
    return NoLast;
}
console.log(NoLast(number));
//Version avec la méthode slice()
console.log(number.slice(1, 10));
console.log(number.slice(0, 9));
//Retourner la somme des nombres
function sum(previousValue, currentValue) { //previousValue est la valeur renvoyée précédemment par l'appel précédent
    return previousValue + currentValue; //currentValue est l'élément du tableau type en cours de traitement
}
console.log(number.reduce(sum));
//avec les fonctions fléchés
const reducer = (previousValue, currentValue) => previousValue + currentValue;
console.log(number.reduce(reducer));

//Retourner le plus grand nombre
const NumberClass = number.map(x => x);
NumberClass.sort();// méthode pour trier numériquement les éléments d'un tableau typé, à même ce tableau donc ne créer pas une copie
console.log(NumberClass.slice(9, 10));
//Indiquer si le tableau contient au moins un nombre multiple de 9
const IsDivNine = (currentValue) => currentValue % 9 == 0;
console.log(number.every(IsDivNine));
console.log(Math.max(...number)); 
//Indiquer si le tableau ne contient que des nombres positifs
const IsPositive = (currentValue) => currentValue >= 0;
console.log(number.every(IsPositive));
//Retourner un tableau contenant les nombrs pairs dans les premiers indices et les nombres impairs dans les indices restants
function GetImpairePaires(Tab) {
    const TabImpairePaire = [];
    for (i = 0; i < Tab.length; i++) {
        let x = Tab[i];
        if (x % 2 == 0) {
            TabImpairePaire.unshift(x);
        } else {
            TabImpairePaire.push(x);
        }

    }
    return TabImpairePaire;
}
console.log(GetImpairePaires(number));
//Autre manière de coder, utilisation de la méthode .filter
const odd = number.filter(x => x%2 !== 0);
const even = number.filter(x => x%2 == 0);
const evenOdd = [...even, ...odd]; 
console.log(evenOdd); 

