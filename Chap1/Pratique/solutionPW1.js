// 1) Retourne la plus grande valeur parmi les trois nombres fournis en paramètre
console.log("Exercice 1: ");
const max = (a, b, c) => a >= b && a >= c ? a : (b >= a && b >= c) ? b : c;
console.log(max(5,8,1));
// Mais il vaut mieux utiliser Math.max !
console.log(Math.max(2,5,9,5,1,4));


// 2) Retourne un nombre entier pseudo-aléatoire entre une borne inférieure et une borne supérieure (bornes entières et comprises dans l'intervalle).
console.log("Exercice 2: ");
const alea = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(alea(2,10)); 


// 3)  Ecrire deux fonctions compareA et compareB qui retournent les mêmes résultats que dans les exemples suivant:
console.log("Exercice 3: ");
const compareA = (Value1, Value2) => Value1 == Value2 ? "true" : "false";
const compareB = (Value1, Value2) => Value1 === Value2 ? "true" : "false";
console.log(compareA(2, "2")); 
console.log(compareB(2, "deux"));


// 4)  En fonction d'un nombre n (ou n > 0) donné en paramètre, écrire une fonction qui affiche dans la console :
//-----Les nombres entiers pairs compris entre 0 et n.
//-----Les nombres entiers pairs et multiples de 7 compris entre 0 et n.
//-----Les nombres entiers pairs et multiples de 3, ainsi que les nombres entiers multiple de 7 compris entre 0 et n.
//-----Les nombres entiers pairs et multiples de 3, mais non multiples de 7 compris entre 0 et n.
console.log("Exercice 4: ");
let Nombre = 45;
function nbPaires(nombre){
    const Value = [];
    if(nombre<0){
        console.log("Error entier négatif");
    }
    for(let i = 0; i < nombre + 1; i+=2){
            Value.push(i);
    }
    return Value; 
}
function nbPairesMulSept(nombre){
    const NewValue = []; 
    const Value = nbPaires(Nombre);
    for(let i = 0; i < Value.length; i++){
        if(Value[i] % 7 == 0){
            NewValue.push(i);
        }
    }
    return NewValue;
}
function nbPairesMulTroisMulSept(nombre){
    const NewValue = [];
    for(let i = 0; i < nombre +1; i++){
        if(i%2 == 0 && i%3 == 0 || i%7 == 0){
            NewValue.push(i);
        }
    }
    return NewValue;
}
function nbPairesMulTrois(nombre){
    const NewValue = [];
    for(let i = 0; i < nombre +1; i++){
    if(i%2 == 0 && i%3 == 0 && i%7 != 0){
            NewValue.push(i);
        }
    }
    return NewValue;
}
console.log(nbPaires(Nombre));
console.log(nbPairesMulSept(Nombre));
console.log(nbPairesMulTroisMulSept(Nombre)); 
console.log(nbPairesMulTrois(Nombre));

// 5) Ecrire deux fonctions retournant réciproquement:
//---------le nombre de piles obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.
//---------le nombre de piles et de faces obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.
console.log("Exercice 5: ");
let NbLancee = 30;
function GetPile(Lancee){
    let Pile = 0;
    for(let i = 0; i < Lancee + 1; i++ ){
        let Cote = alea(0,1);
        if( Cote == 1){
            Pile = Pile + 1;
        } 
    }
    return {Pile, Face: Lancee-Pile}; 
}
console.log(GetPile(NbLancee));

