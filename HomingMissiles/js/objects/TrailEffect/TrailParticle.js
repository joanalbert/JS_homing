class TrailParticle{
    
    point;
    color;
    
    timeprogress;
    lifetime;
    
    spawned;
    
    constructor(point, color, lifetime){
        this.point = point;
        this.color = color;
        this.lifetime = lifetime;
        this.timeprogress = 0;
        
        this.spawned = false;
    }
    
    draw(ctx){
        drawCircle(this.point, 3, this.color, true, ctx);
    }
    
    tick(delta){
        this.timeprogress += delta;
        if(this.timeprogress > this.lifetime) this.spawned = false;
    }
    
    
}