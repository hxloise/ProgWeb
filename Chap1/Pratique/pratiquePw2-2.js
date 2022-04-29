// Tableau de chaînes de caractères
const strings = Object.freeze(["Sator", "Arepo", "Tenet", "Opera", "Rotas"]);
// 1) Retourner tous les mots contenant au moins un r
const WordsWithR = strings.filter(words => words.includes('r') || words.includes('R')); //la méthode filter regarde bien chaque élément du tableau
console.log(WordsWithR); 
// 2) Indiquer si tous les mots font 5 lettres
const CountNbrWords = tab => {
    tab.forEach(words =>{if (words.length != 5) return false}) 
    return true;
}
console.log(CountNbrWords(strings)); 
// 3) Retourner un tableau avec un mot de plus à la fin 
const NewTabEnd = strings.map(x => x); 
NewTabEnd.push('Binche'); 
console.log(NewTabEnd); 
// 4) Retourner un tableau avec un mot de plus en début
const NewTabBegin = strings.map(x => x); 
NewTabBegin.unshift('Binche'); 
console.log(NewTabBegin); 
// 5) Retourner un tableau en remplaçant le mot du milieu par le mot radar (si le tableau à un nombre de mots pair, remplacer le mot qui se situe à l'indice juste avant le milieu)
function remplaceWord (tab){
    const newTab = tab.map(x => x); 
    const i = Math.floor(tab.length/2);
    newTab[i] = 'Radar';
    return newTab;  
}
console.log(remplaceWord(strings));
// 6) Retourner la concaténation de tous les mots
function concatenation(strings) {
    let conca = "";
    strings.forEach(val => conca += val);
    return conca;
}
console.log(concatenation(strings)); 
// 7) Retourner le mot qui vient en premier selon l'ordre alhabétique
const Order = strings.map(x => x); 
Order.sort();
console.log(Order.pop()); 
// 8) Indiquer si les chaines du tableau forment un palindrome (si elle sont lues dans l'ordre des indices du tableau).
function palindrome(strings) {
    let conca = concatenation(strings).toLowerCase();
    console.log(conca == conca.split('').reverse().join('')); //test pour savoir si la conca des caractères du tableau sont égales à la conca de la même chaîne dans l'autre sens
    //besoin d'utiliser la méthode .split() car les autres méthodes agissent seulement sur un tableau
}
palindrome(strings);
