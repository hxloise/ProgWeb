import WithPathFinding from "../class/Automaton/WithPathfinding.js";
import MainLoop from "../lib/mainloop.js";
import Circle from "../class/Circle.js";
import Keyboard from "../class/Keyboard.js";
import Tweens from "../class/Particules/Tweens.js";

const ctx = document.querySelector('canvas').getContext('2d');

// Définir la taille de la toile identique à la taille de l'écran
ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;

const birth = new Set([3]); // Birth rule: B3. Cellule naît si exactement 3 cellules adjacentes sont vivantes
const survival = new Set([2, 3]); // Survival rule: S23. Cellule reste vivante si exactement 2 ou 3 cellules adjacentes sont actuellement vivantes, sinon meurt.

const tileSize = 40;
const rows = Math.round(ctx.canvas.height / tileSize);
const cols = Math.round(ctx.canvas.width / tileSize);
let prob = 1;
let gen = 0;
let freq = 30;
let automaton = new WithPathFinding({ rows, cols, tileSize, birth, survival, prob });

MainLoop.setUpdate(() => {
    automaton.ChangeCellState();
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
//départ de l'animation
MainLoop.start(); 

