//import Circle from './class/Circle.js';
import Circle_InFlatTorus from './class/Circles/InFlatTorus.js';
import { randomColor } from './lib/randomColor.mjs';
import { getRandomInt } from './lib/math.mjs';
import Keyboard from './class/Keyboard.js'

const nbCircles = 500;

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

let KEYBOARD = new Keyboard(window);

function directionFromKey() {
  if (KEYBOARD.isKeysDown('a', 'w')) return Math.PI * 0.25;
  if (KEYBOARD.isKeysDown('a', 's')) return Math.PI * 1.75;
  if (KEYBOARD.isKeysDown('d', 'w')) return Math.PI * 0.75;
  if (KEYBOARD.isKeysDown('d', 's')) return Math.PI * 1.25;
  if (KEYBOARD.isKeyDown('s')) return Math.PI * 1.5;
  if (KEYBOARD.isKeyDown('d')) return Math.PI;
  if (KEYBOARD.isKeyDown('w')) return Math.PI * 0.5;
  if (KEYBOARD.isKeyDown('a')) return 0;
  return false;
};

var tick = function tick(now, lastTime, circles, ctx) {
  // request next frame
  requestAnimationFrame(function (time) {
    return tick(time, now, circles, ctx);
  });
  var deltaT = now - lastTime; // update
  //console.log(deltaT);

  var angle = directionFromKey();
  if (angle !== false) {
    circles.forEach(function (c) {
      return c.move(angle, deltaT);
    });
  } // clear (and resize)

  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight; //draw

  circles.forEach(function (c) {
    return c.draw(ctx);
  });
};

let circles = [];

function generateRandomCircle(){
  let circles = [];

  for (let i = 0; i < nbCircles; i++){
    const xMin = 0;
    const yMin = 0;
    const xMax = ctx.canvas.width;
    const yMax = ctx.canvas.height;
    const randRadius = getRandomInt(3, 7)**getRandomInt(1, 2);

    const randX = getRandomInt(xMin, xMax);
    const randY = getRandomInt(yMin, yMax);
    const radius = randRadius;
    const speed = 0.01*randRadius;
    const randColor = randomColor();

    const circle = new Circle_InFlatTorus(randX, randY, radius, speed, randColor, ctx.canvas.width, ctx.canvas.height);

    circles.push(circle);
    
  }
  
  circles.sort(function (c1, c2) {
    return c1.compareCircle(c2);
  });

  return circles;
}

circles = generateRandomCircle();

circles.forEach(circle => {
  circle.draw(ctx);
});

let lastTime = 0;

requestAnimationFrame(function (now) {
  return tick(now, lastTime, circles, ctx);
});
