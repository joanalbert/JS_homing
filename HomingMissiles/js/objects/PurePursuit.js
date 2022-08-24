class PurePursuit{
    
    color;
    
    point;
    velocity;
    speed;
    target;
    rotationSpeed;
    
    remove;
    image;
    
    trail;
    
    constructor(point, vel, speed, target, rotationSpeed, color, image, trail){
        this.point = point;
        this.velocity = vel;
        this.speed = speed;
        this.target = target;
        this.rotationSpeed = rotationSpeed;
        this.color = color;
        this.remove = false;
        
        this.image = image;
        this.trail = trail;
        
        this.image.width = 40;
        this.image.height = 24;
    }
    
    draw(ctx){
        let x = this.point.x - this.image.width/2;
        let y = this.point.y - this.image.height/2;
        let angle = -this.velocity.directionAngle();
        drawRotatedImage(ctx, this.image, x, y, this.image.width, this.image.height, angle);
    }
    
    tick(delta, frames, ctx){   
        //only steer towards the target, it it is not removed
        if(!this.target.remove)this.alignWithTarget(delta);
        else this.color = "black";
        
        let next = this.velocity.scaled(delta).scaled(this.speed);
        this.point = this.point.plus(next).toPoint();
        
        //update trail
        this.trail.tick(delta, frames, ctx);
        this.trail.point = new Point(this.point.x, this.point.y);
        
        //check whether the missile needs to be removed or not
        this.destroy();
    }
    ///////////////

    destroy(){
                     
        for(let i = 0; i < targets.length; i++){
            let t = targets[i];
            if(!this.target.remove) this.destroyAgainstTarget(); 
            else this.destroyAginstOther(t);  
        }
        
        if(this.point.y <= 0 && !this.remove){
            this.remove = true;
            //console.log("high");
        }
    }
    
    destroyAginstOther(other){
        let dist = other.point.minus(this.point).magnitude();
        if(dist <= other.radius){
            other.remove = true;
            this.remove = true;
            //console.log("kill other");
        }
    }
        
    destroyAgainstTarget(){    
        let dist = this.target.point.minus(this.point).magnitude();
        if(dist <= this.target.radius){
            this.target.remove = true;
            this.remove = true;
            //console.log("kill target");
        }
    }    
    
    
    ////
    alignWithTarget(delta){
        if(this.target == null || this.target.remove) return;
        
        let toTarget = this.target.point.minus(this.point);
        let angle    = this.velocity.angleBetween(toTarget);

        let cr = this.velocity.cross(toTarget);

        let clockwise = false;
        if(cr.z < 0) clockwise = true;
        
        this.velocity.rotate(angle * delta * this.rotationSpeed, clockwise);
    }
}