import Circle from '../Circle.js';
export default class Circle_InFlatTorus extends Circle {
    
    constructor(x = 0, y = 0, radius = 100, speed = 0, color = "blue", maxX, maxY){
        super(x,y,radius,speed,color);

        this.maxX = maxX;
        this.maxY = maxY;
    }

    move(direction, interval) {
        super.move(direction, interval);
        if (this.x > this.maxX + this.radius) {
            this.x = 0 - this.radius;
        }

        if (this.x < 0 - this.radius) {
            this.x = this.maxX + this.radius;
        }

        if (this.y > this.maxY + this.radius) {
            this.y = 0 - this.radius;
        }

        if (this.y < 0 - this.radius) {
            this.y = this.maxY + this.radius;
        }
    }
}