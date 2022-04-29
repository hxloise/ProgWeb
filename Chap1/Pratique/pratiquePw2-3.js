//Tableau d'objet
const circles = Object.freeze([
    { x: 20, y: 10, r: 10, color: "red" },
    { x: 10, y: 10, r: 20, color: "green" },
    { x: 30, y: 25, r: 15, color: "blue" },
    { x: 10, y: 5, r: 5, color: "red" }
]);
circles.forEach(Object.freeze);
//Un tableau qui fabrique un certain nombre d'objets cercles 
// 1) Retourner tous les aires des cercles (formule de l'aire = pi * R2)
function CiclesArea(circle) {
    circle.forEach(circle => console.log((circle.r * circle.r) * Math.PI)) //pour atteindre un paramètre: le nom de l'objet.le nom du paramètre
}
CiclesArea(circles);
// 2) Retourner tous les cercles de couleur rouge
function IsRed(circle) {
    circle.forEach(OneCircle => {
        if (OneCircle.color.includes('red')) {//bien traiter l'élément en cours de lecture du foreach
            console.log(OneCircle);
        }
    });
}
IsRed(circles);
// 3) Retourner tous les centres de cercle
function GetCenter(TabOfCircle) {
    TabOfCircle.forEach(Circle => {
        console.log('(', Circle.x, ',', Circle.y, ')');
    });
}
GetCenter(circles);
// 4) Retourner tous les cercles en opérant une translation de 10 unités sur l'axe des abscisses (donc modification d'un paramètre dans un tableau d'objet)
function TranslationAxisX(circle) {
    circle.map(OneCircle => {
        let clone = { ...OneCircle }; //utilisation des ... pour détruire ou construire un objet, sépare ou regroupe par proriété
        clone.x += 10;
        console.log(clone);
    })
}
TranslationAxisX(circles);