class Launcher{
    
    point;
    fill;
    radius;
    color;
    
    aimLength;
    aimSpeed;
    aim;
    missileSpawn;
    
    targets;
    currentTarget;
    
    shotCooldown;
    lastShot;
    
    
    
    constructor(point, radius, color, fill, aimSpeed, aimLength, targets){
        this.point = point;
        this.fill = fill;
        this.radius = radius;
        this.color = color;
        
        this.aimLength = aimLength;
        this.aimSpeed = aimSpeed;
        this.aim = Vector.UP.scaled(aimLength);
        
        this.targets = targets;
        this.currentTarget = null;
        
        this.shotCooldown = 2;
        this.lastShot = this.shotCooldown;
        
    }
    
    
    //DRAW
    draw(ctx){
        //DRAW BASE
        drawCircle(this.point, this.radius, this.color, this.fill, ctx);
        //DRAW SPAWN POINT
        drawCircle(this.missileSpawn, 5, "red", true, ctx);
        //DRAW CANNON
        this.aim.drawVector(this.point, null, "red", ctx);
    }
    
    //TICK
    tickTarget(delta){
                
        //CLOSEST
        this.currentTarget = this.getClosestTarget();
        
        //AIM
        this.aimLauncher(delta);
        //MOVE SPAWN POINT
        this.missileSpawn = this.point.plus(this.aim).toPoint();
                    
        //UPDATE COOLDOWN
        this.lastShot += delta;
        if(this.lastShot >= this.shotCooldown && this.currentTarget != null){
            if(!this.currentTarget.remove ){
                
                
                
                this.shoot();
                
                //rest cooldown
                this.lastShot = 0;
            }
        }
    }
    
    //shoot
    shoot(){
        let ppMissile = this.makePurePursuit();
        missiles.push(ppMissile);
        
        let lpMissile = this.makeLeadPursuit();
        missiles.push(lpMissile);
     
        
        this.currentTarget.chasers.push(ppMissile);
    }
    
    makeLeadPursuit(){
        let missile = new LeadPursuit(this.missileSpawn, this.aim.normalized(), 203, this.currentTarget, 3);
        return missile;
    }
    
    makePurePursuit(){
        let trail = new TrailEffect(new Point(0,0), null, 60, 500, 1);
        
        let missile = new PurePursuit(this.missileSpawn, this.aim.normalized(), 200, this.currentTarget, 45, "red", projectileImg, trail);
        
        missile.trail.point = new Point(missile.point.x, missile.point.y);
        return missile;
    }
    
    getClosestTarget(){
        let shortestDistance = Number.MAX_SAFE_INTEGER;
        let closestTarget = null;
        
        for(let i = 0; i < this.targets.length; i++){
            let t = this.targets[i];
            let dist = t.point.minus(this.point).magnitude();
            
            if(dist <= shortestDistance && !t.remove && !t.locked){
                shortestDistance = dist;
                closestTarget = t;
            }
        }
                
        return closestTarget;
    }
    
    aimLauncher(delta){
        if(this.currentTarget == null) return;
        
        let toTarget = this.currentTarget.point.minus(this.point);
        let angle    = this.aim.angleBetween(toTarget);

        let cr = this.aim.cross(toTarget);

        let clockwise = false;
        if(cr.z < 0) clockwise = true;

        this.aim.rotate(angle * delta * this.aimSpeed, clockwise);
    }
    
    
    
}