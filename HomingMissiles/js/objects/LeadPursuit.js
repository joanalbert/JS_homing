class LeadPursuit{
    
    pos;
    vel;
    speed;
    target;
    rotationSpeed;
    trail;
    image;
    
    constructor(pos, vel, speed, target, rotationSpeed){
        this.pos = pos;
        this.vel = vel;
        this.speed = speed;
        this.target = target;
        this.rotationSpeed = 45;
        this.image = projectileImg2;

        this.leadtime = 0.1;
        
        this.lifespan = 10;
        this.lifetime = 0;
        this.remove = false;
        
        this.image.width = 40;
        this.image.height = 24;
    }
    
    draw(ctx){
        let x = this.pos.x - this.image.width/2;
        let y = this.pos.y - this.image.height/2;
        let angle = -this.vel.directionAngle();
        drawRotatedImage(ctx, this.image, x, y, this.image.width, this.image.height, angle);
    }
    
    tick(delta, frames, ctx){
        this.lifetime += delta;
        
        if(this.lifetime > this.leadtime) this.lead(delta);
        
        if(this.lifetime > this.lifespan) this.remove = true;
        
        this.move();
        this.checkCollision();
    }
    
    lead(delta){
        
        if(this.target == null || this.target.remove == true){
            return;
        }
        
        let mSpeed = this.speed;
        let mPos = this.pos;
        let mVel = this.vel;
        
        
        let tPos = this.target.point;
        let tVel = this.target.velocity;
        let tSpeed = this.target.speed;
        
        let tNextPos = tPos.plusVector(tVel.scaled(delta).scaled(tSpeed));
        
        //line of sight
        let los = new Line(mPos, tPos);
        let circle = new CircleShape(tNextPos, mSpeed * delta);
        
        let intPoints = circle.lineIntersect(los);
        
        let point = null;
        
        if(intPoints[0] != null && intPoints[1] != null){
            point = Point.closest(intPoints[0], intPoints[1], mPos);
            if(point == null) point = intPoints[0];
        }
         
        if(point != null){
            let vToDestination = tNextPos.minus(point);
            //this.vel = vToDestination.normalized();
            this.steer(delta, vToDestination);
        }
        
    }
    
    steer(delta, toTarget){
        let angle  = this.vel.angleBetween(toTarget);

        let cr = this.vel.cross(toTarget);

        let clockwise = false;
        if(cr.z < 0) clockwise = true;
        
        this.vel.rotate(angle * delta * this.rotationSpeed, clockwise);
    }
    
    checkCollision(){
        let dist = this.pos.dist(this.target.point);
        if(dist <= 5){
            this.remove = true;
            this.target.remove = true;
        }
    }
    
    move(){
        let v = this.vel.scaled(delta).scaled(this.speed);
        this.pos = this.pos.plusVector(v);
    }
}