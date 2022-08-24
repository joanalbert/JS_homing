class Circle{
    
    point;
    velocity;
    speed;
    fill;
    radius;
    color;
    
    remove;
    
    //chasers
    locked;
    chasers;
    
    //neighbor stuff
    neighbors;
    neighborRadius;
    
    constructor(point,vel, speed, radius, color, fill, nr){
        this.point = point;
        this.velocity = vel;
        this.speed = speed;
        this.radius = 5;
        this.neighborRadius = nr;
        this.color = color;
        this.fill = fill;
        this.remove = false;
        this.locked = false;
        
        this.chasers = [];
    }
    
    draw(ctx){
        drawCircle(this.point, this.radius, this.color, this.fill, ctx);
    }
    
    tickTarget(delta, others){
        //move
        let next = this.velocity.scaled(delta).scaled(this.speed);
        this.point = this.point.plus(next).toPoint();
        
        this.getNeighborsRadius(others);
        this.checkCollisions();
        
        //bounds
        this.bounds();
        
        //update locked
        //if(this.chasers.length == 0) this.locked = false;
        //else this.locked = true;
    }
    
    
    getNeighborsRadius(others){
        let SQRradius = this.neighborRadius * this.neighborRadius;
        let self = this;
        
        let n = others.filter(t =>{
            if(self === t) return false;
            let toT = t.point.minus(self.point);
            let dist = toT.sqrMagnitude();
            return dist < SQRradius;
        }, SQRradius, self);
        
        
        this.neighbors = n;
    }
    
    checkCollisions(){
        let min = Number.MAX_SAFE_INTEGER;
        let closestNeighbor;
        
        for(let i = 0; i < this.neighbors.length; i++){
            let toNeighbor = this.neighbors[i].point.minus(this.point);
            let dist = toNeighbor.magnitude();
            if(dist < min){
                min = dist;
                closestNeighbor = this.neighbors[i];
            }
        }
        
        if(min <= this.radius){
            let r1 = this.velocity.reflect(closestNeighbor.velocity.normalized());
            let r2 = closestNeighbor.velocity.reflect(this.velocity.normalized());
            this.velocity = r1.normalized();
            closestNeighbor.velocity = r2.normalized();
        }
    }
    
    steering(neighbors){
        
    }
    
    

    bounds(){   
        let x = this.point.x;
        let y = this.point.y;
        let r;
        
        if(x < 0 + this.radius) {
            r = this.velocity.reflect(Vector.RIGHT);
            this.velocity = r.normalized();
        }
        
        if(x > canvas.width - this.radius) {
            r = this.velocity.reflect(Vector.LEFT);
            this.velocity = r.normalized();
        }
        
        
        if(y < 0 + this.radius) {
            r = this.velocity.reflect(Vector.DOWN);
            this.velocity = r.normalized();
        }
        
        if(y > canvas.height-this.radius){
            r = this.velocity.reflect(Vector.UP);
            this.velocity = r.normalized();
        }
    }
    
    
}







