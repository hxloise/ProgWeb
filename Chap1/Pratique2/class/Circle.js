export default class Circle {
    constructor({x = 110, y = 110, r = 80, speed = 0.0, color ='red', dir = Math.PI * 2} = {}){
        this.x = x; 
        this.y = y; 
        this.r = r; 
        this.speed = speed;
        this.color = color;
        this.dir = dir; 
    }
    getRadius(){
        return this.r;
    }
    setX(x){
        this.x = x;
    }
    setDire(dir){
        this.dir = dir;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        //(x,y,rayon, angleDépart, angleFin, sensAntiHoraire)
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();       
    }
    move(delta, direction){
        const distX = this.speed * delta * Math.cos(direction);
        const distY = this.speed * delta * Math.sin(direction);
        this.x += distX;
        this.y += distY;
    }
    compare(circle){
        return this.getRadius() - circle.getRadius(); 
    }
}