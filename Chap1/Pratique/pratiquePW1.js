//Exercice Un, comparaison entre des int
function compare(a, b, c){
    if (a>b){
        if(a>c){
            return a; 
        }
    }else{
        if(b>c){
            return b;
        }else{
            return c;
        }
    }
}
console.log(compare(5,7,3));

const max = Math.max(5,3,6,7);
console.log(max);
//Exercice Deux, utilisation de random 
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); //retourne le plus petit entier supérieur ou égal au nombre donné
    max = Math.floor(max); //retourne le plus grand entier qui est inférieur ou égal à un nombre x
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
console.log(getRandomIntInclusive(10,20));

//correction de l'exercice Deux
function randomInt({min = 2, max = 3} = {}){
    return Math.floor(Math.random() * (max - min +1)) + min;
}
console.log(randomInt({max : 2})); //pour pouvoir mettre des paramètres par défauts mais qui restent modifiables
//Exercice Trois, comparateur notation
function compareA(a, b) {
    if(a == b){ //simplement la valeur, s'en fiche du type
        return true;
    }else{
        return false;
    }
}
function compareB(a, b){
    if(a === b){ //compare et la valeur et le type
        return true; 
    }else{
        return false; 
    }
}
console.log(compareA(4, '4')); //true 
console.log(compareA(4.0, '4')); // true
console.log(compareA(4, 'quatre')); // false
console.log(compareB(8, '8')); // false
console.log(compareB(8, 'huit')); // false
//exercice Quatre
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
console.log(nbPaires(Nombre));

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
console.log(nbPairesMulSept(Nombre));

function nbPairesMulTroisMulSept(nombre){
    const NewValue = [];
    for(let i = 0; i < nombre +1; i++){
        if(i%2 == 0 && i%3 == 0 || i%7 == 0){
            NewValue.push(i);
        }
    }
    return NewValue;
}
console.log(nbPairesMulTroisMulSept(Nombre)); 

function nbPairesMulTrois(nombre){
    const NewValue = [];
    for(let i = 0; i < nombre +1; i++){
    if(i%2 == 0 && i%3 == 0 && i%7 != 0){
            NewValue.push(i);
        }
    }
    return NewValue;
}
console.log(nbPairesMulTrois(Nombre));
//Exercice Cinq
let NbLancee = 30;
function GetPile(Lancee){
    let Compteur = 0;
    for(let i = 0; i < Lancee + 1; i++ ){
        let Cote = randomInt({max : 1, min : 0});
        if( Cote == 0){
            Compteur = Compteur + 1;
        } 
    }
    return Compteur; 
}
console.log("Nombre de pile : " + GetPile(NbLancee));

function GetResult(Lancee){
    const Result = []; 
    let nbPile = GetPile(NbLancee);
    let nbFace = NbLancee - nbPile;
    Result [0] = nbPile;
    Result [1] = nbFace;
    return Result; 
}
console.log(GetResult(NbLancee));
//Exercice 6
function isPrimeNumber(n) {

    // le premier nombre premier est 2 donc on élimine les nombres plus petits
    if (n < 2) {

        return false;

    } else {

        // boucle pour tester la division du nombre par tout les nombres plus petits que celui-ci
        for (let i = 2; i < n; i++) {

            // test pour voir si le nombre choisi est divisible par le nombre actuel de la boucle
            if (n % i === 0) {

                return false;

            }
        }

        return true;
    }
}

console.log(isPrimeNumber(0));
console.log(isPrimeNumber(1));
console.log(isPrimeNumber(2));
console.log(isPrimeNumber(3));
console.log(isPrimeNumber(4));
console.log(isPrimeNumber(9));
console.log(isPrimeNumber(11));
console.log(isPrimeNumber(26));
//console.log(isPrimeNumber(87178291197)); nombre trop grand qui fait bugger le terminal qui calcule pendant trop longtemps
//console.log(isPrimeNumber(87178291199));

//Exercice 7---pas réussi

//Exercice 8
const AddTwoNbr = (Nbr1, Nbr2) => Nbr1 + Nbr2; 
console.log(AddTwoNbr(3,5));

//Exercice 9
function curried_AddTwoNbr(Nbr1){
    return function (Nbr2){ //fonction sans nom = fonction anonyme
        return Nbr1 + Nbr2;
    }
}
console.log(curried_AddTwoNbr(3));
const add_three = curried_AddTwoNbr(3);
console.log(add_three(12));
//autre méthode
const curryAdd = Nbr1=> Nbr2 => Nbr1 + Nbr2;
console.log(curryAdd(2));
//Exercice 10
const Square = Nbr => Math.pow(Nbr, 2); 
console.log(Square(3));
//Exercice 11
function Twice (Square, Nbr){
    let Value = Square(Square(Nbr));
    return Value;  
}
console.log(Twice(Square,2)); 