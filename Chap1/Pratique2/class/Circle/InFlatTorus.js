import Circle from "../Circle.js";

export default class InFlatTorus extends Circle {
    constructor({ x = 110, y = 110, r = 80, speed = 0.1, color = 'red', dir = Math.PI * 2, width, height } = {}) {
        super({ x, y, r, dir, speed, color });
        this.width = width;
        this.height = height;
    }
    move(delta, direction) {
        super.move(delta, direction);

        if (this.x - this.r > this.width) {
            this.x = 0 - this.r;
        } else if (this.x < 0 - this.r) {
            this.x = this.width + this.r;
        }
        if (this.y - this.r > this.height) {
            this.y = 0 - this.r;
        } else if (this.y  < 0 - this.r) {
            this.y = this.height + this.r;
        } 
    }
}