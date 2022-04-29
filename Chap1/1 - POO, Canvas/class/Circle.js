export default class Circle {

    constructor(x = 0, y = 0, radius = 100, speed = 0, color = "blue"){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    move(direction, interval){
        let distX = this.speed * interval * Math.cos(direction);
        let distY = this.speed * interval * Math.sin(direction);
        this.x += distX;
        this.y += distY;
    }

    compareCircle(c){
        return this.radius - c.radius;
    }
}