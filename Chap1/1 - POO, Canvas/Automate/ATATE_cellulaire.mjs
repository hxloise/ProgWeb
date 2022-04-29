import Automaton from "../class/Automaton/InFlatTorus.js";
import MainLoop from "../lib/mainloop.js";
import Keyboard from "../class/Keyboard.js";
import { domOn } from "../lib/dom.js";

//création de l'écoute du clavier
const keyboard = new Keyboard(false);//pour dire qu'on veut pas utiliser le "useCode"

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;


//mêmes valeurs pour le canvas que pour la grille
const x = Math.round(ctx.canvas.width / 14);
const y = Math.round(ctx.canvas.height / 14);

const birth = new Set([3]); // Birth rule: B3. Cellule naît si exactement 3 cellules adjacentes sont vivantes
const survival = new Set([2, 3]); // Survival rule: S23. Cellule reste vivante si exactement 2 ou 3 cellules adjacentes sont actuellement vivantes, sinon meurt.

const tileSize = 14;
const rows = Math.round(ctx.canvas.height / tileSize);
const cols = Math.round(ctx.canvas.width / tileSize);
let prob = 0.5;
let gen = 0;
let freq = 30;
let pause = false;
let automaton = new Automaton({ rows, cols, tileSize, birth, survival, prob });

// Change rules color
birth.forEach(val => {
    const bNode = document.querySelector(`[data-rule-type="b"][data-rule-num="${val}"]`);
    bNode.classList.add('apply');
});

survival.forEach(val => {
    const bNode = document.querySelector(`[data-rule-type="s"][data-rule-num="${val}"]`);
    bNode.classList.add('apply');
});

//gestion des saisies claviers utilisateurs
keyboard.onKeyDown('p', () => {
    pause = !pause;
});

keyboard.onKeyDown('s', () => {
    freq = Math.max(1, freq - 10);
    MainLoop.setSimulationTimestep(1000 / freq);
});

keyboard.onKeyDown('w', () => {
    freq = Math.min(500, freq + 10);
    MainLoop.setSimulationTimestep(1000 / freq);
});

keyboard.onKeyDown('r', () => {
    automaton = new Automaton({ rows, cols, tileSize, prob, birth, survival });
    gen = 0;
});


keyboard.onKeyDown('a', () => {
    prob = Math.max(0, prob - 0.05);
});

keyboard.onKeyDown('d', () => {
    prob = Math.min(1, prob + 0.05);
});

keyboard.onKeyDown('b', () => {
    console.log('b');
});

keyboard.onKeyDown('s', () => {
    console.log('s');

});

// keyboard.onKeyDown('m', () => {
//     console.log('m');
// });

domOn('.rule', 'click', event => {
    const dom = event.currentTarget;
    const ruleType = dom.dataset.ruleType;
    const ruleNum = dom.dataset.ruleNum - 0;
    // Demande si la règle est "b".
    // Si oui -> affecte le set birth, si non -> affecte le set survival
    const rule = ruleType == 'b' ? birth : survival;
    // Si la règle est déjà appliquée, on la supprime, sinon on l'applique
    rule.has(ruleNum) ? rule.delete(ruleNum) : rule.add(ruleNum);
    rule.has(ruleNum) ? dom.classList.add('apply') : dom.classList.remove('apply');
})

MainLoop.setUpdate(() => {
    if (pause) return;
    automaton.ChangeCellState();
    gen++;
    // Gestion du DOM, appliquer les valeurs courantes
    document.querySelector('#freq').textContent = freq;
    document.querySelector('#map').textContent = document.querySelector('#map').dataset.flatTorus;
    document.querySelector('#tile-size').textContent = tileSize;
    document.querySelector('#generation').textContent = gen;
    document.querySelector('#alive-prob').textContent = Math.round(prob * 100);
    document.querySelector('#fps').textContent = Math.round(MainLoop.getFPS());
})
MainLoop.setDraw(() => {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    automaton.draw(ctx);
})
//départ de l'animation maaammmeeen 
MainLoop.start(); 

