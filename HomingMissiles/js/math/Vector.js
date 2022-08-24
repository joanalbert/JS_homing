class Vector {
    
    static ZERO  = new Vector(0,0);
    static UP    = new Vector(0,-1);
    static DOWN  = new Vector(0,1);
    static LEFT  = new Vector(-1,0);
    static RIGHT = new Vector(1,0);
    
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z? z:1;
    }
    
    magnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    sqrMagnitude(){
        return this.x*this.x + this.y*this.y;
    }
    
    normalized(){
        let m = this.magnitude();
        return new Vector(this.x/m, this.y/m);
    }

    static RANDOM_DIRECTION(){
        let angle = randomInteger(0,360);
        let rad = angle * Math.PI / 180;
        let x = Math.cos(rad);
        let y = Math.sin(rad);
        return new Vector(x,y);
    }
    
    add(other){
        this.x += other.x;
        this.y += other.y;
    }


    plus(other){
        return new Vector(this.x + other.x, this.y + other.y);
    }

    minus(other){
        return new Vector(this.x - other.x, this.y - other.y);
    }
    
    subtract(other){
        this.x -= other.x;
        this.y -= other.y;
    }
    
    scale(scale){
        this.x = this.x*scale;
        this.y = this.y*scale;
    }
    
    scaled(scale){
        let x = this.x*scale;
        let y = this.y*scale;
        return new Vector(x,y);
    }
    
    normalize(){
        let m = this.magnitude();
        this.x = this.x / m;
        this.y = this.y / m;
    }

    //project this onto other
    projectN(other){
        // (this dot other) * other
        let d = this.dot(other);
        return other.scaled(d);
    }

    project(other){
        let d = this.dot(other) / Math.pow(other.magnitude(),2);
        return other.scaled(d);
    }

    reflect(normal){
        let a = new Vector(this.x, this.y).normalized();
        let r = a.scaled(-1).project(normal).scaled(2).plus(a);
        return r;
    }
    
    dot(other){
        return this.x*other.x + this.y*other.y;
    }
    
    det(other){
        //x1*y2 - y1*x2
        return this.x*other.y - this.y*other.x;
    }

    rotate(angle, clockwise){
                
        let rads = angle * Math.PI / 180;
        
        if(clockwise) rads = 2 * Math.PI - rads;
             
        let x = this.x * Math.cos(rads) - this.y * Math.sin(rads);
        let y = this.x * Math.sin(rads) + this.y * Math.cos(rads);
        
        this.x = x;
        this.y = y;
    }

    directionAngle(){
        let angle = Math.atan2(this.y,this.x) * 180 / Math.PI;
        angle = (angle - 360) % 360
        return -angle.toFixed(0);
    }

    angleBetween(other){
        let n1 = this.normalized();
        let n2 = other.normalized();
        let dot = n1.dot(n2);
        return Math.acos(dot) * 180 / Math.PI;
    }

    angleBetween2(other){
        let n1 = this.normalized();
        let n2 = other.normalized();
        let dot = n1.dot(n2);
        let det = n1.det(n2);
        return Math.atan2(det,dot) * 180 / Math.PI;
    }

    perp(){
        return new Vector(-this.y, this.x);
    }


    cross(other){      
        return new Vector(this.y * other.z - this.z * other.y,
                          this.z * other.x - this.x * other.z,
                          this.x * other.y - this.y * other.x);
    }


    toPoint(){
        return new Point(this.x, this.y);
    }
    
    drawVector(origin, circle, color, ctx){
        let m = this.magnitude();
        drawLine(origin, origin.plus(this), 1, color, ctx);
        
        drawCircle(origin, 5, "red", true, ctx);

        let half = this.scaled(0.5);
        let textPoint = origin.plus(half);
        drawText(`${this.directionAngle()}º`, textPoint, ctx);
        //mag: ${m.toFixed(2)}
    }
}