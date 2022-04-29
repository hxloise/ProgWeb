import Circle from "../class/Circle/InFlatTorus.js";
import { getRandomInt } from "../lib/Math.js";
import { getRandomSmallInt } from "../lib/Math.js";
import randomColor from "../ProgWebMod/lib/randomcolor.js";
import Keyboard from "../class/Keyboard.js";


const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;

const keyboard = new Keyboard();
const getAngleFromKeyPressed = () => {
    if (keyboard.isKeysDown('KeyS', 'KeyA')) return Math.PI * 1.75;
    if (keyboard.isKeysDown('KeyS', 'KeyD')) return Math.PI * 1.25;
    if (keyboard.isKeysDown('KeyW', 'KeyA')) return Math.PI * 0.25;
    if (keyboard.isKeysDown('KeyW', 'KeyD')) return Math.PI * 0.75;
    if (keyboard.isKeyDown('KeyS')) return Math.PI * 1.5;
    if (keyboard.isKeyDown('KeyW')) return Math.PI * 0.5;
    if (keyboard.isKeyDown('KeyD')) return Math.PI;
    if (keyboard.isKeyDown('KeyA')) return Math.PI * 2;
    return false;
}

const nbCercle = 300;
const tabCercle = [];

for (let index = 0; index < nbCercle; index++) {
    const x = getRandomInt(0, ctx.canvas.width);
    const y = getRandomInt(0, ctx.canvas.height);
    const r = getRandomSmallInt(5, 50);
    const speed = r / 100;
    const color = randomColor();
    const dir = Math.PI / 2;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const newCircle = new Circle({ x, y, r, speed, color, dir, width, height });
    tabCercle.push(newCircle);
}

tabCercle.sort((c1, c2) => c1.compare(c2));
console.log(tabCercle);

let lastTime = 0;
function tick(time) {
    requestAnimationFrame(tick);
    const dt = time - lastTime;
    lastTime = time;

    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;

    const angle = getAngleFromKeyPressed();
    if (angle != 0) {
        tabCercle.forEach(cercle => {
            cercle.setDire(angle);
            cercle.move(dt, angle);
        });
    }

    tabCercle.forEach(c => c.draw(ctx));

}
requestAnimationFrame(tick);