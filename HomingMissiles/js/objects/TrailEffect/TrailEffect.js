class TrailEffect{
    
    //position
    point;
    direction;
    
    //particles
    partFreq;
    partAmount;
    partLifetime;
    
    //particles array
    set;
    index;
    indexProgress;
    
    
    
    constructor(point, direction, freq, amount, lifetime){
        this.point = point;
        this.direction = direction;
        
        this.partFreq = freq;
        this.partAmount = amount;
        this.partLifetime = lifetime;
        
        this.startSet();
        this.index = 0;
        this.indexProgress = 0;
        
    }
    
    draw(ctx){}
        
    tick(delta, frames, ctx){
        
        //control index progression
        this.indexProgress += frames;
        if(this.indexProgress >= this.partFreq){
            this.indexProgress = 0;
            this.index++;
        }
        
                
        //if index isn't higher that the amount of particles
        if(this.index < this.set.length) {
            //we look for all particles smaller than index that haven't been spawned
            //set a position equal to the trail position and spawn them
            for(let i = 0; i < this.index; i++){
                let p = this.set[i];
                if(!p.spawned) {
                    p.point = new Point(this.point.x, this.point.y);
                    p.spawned = true;
                }
            }
        }
        else this.resetSystem();
                
        
        //only spawned particles get ticked and drawn
        let spawned = this.set.filter(p => p.spawned);
        spawned.forEach(p =>{
            p.tick(delta);
            p.draw(ctx);
        }, delta, ctx);
        
        
        
        //based on frequency, we increment the index
        //if(frames % this.partFreq == 0) this.index++;
    }
    
    resetSystem(){
        this.index = 0;
        this.set.forEach(p => {
            p.spawned = false;
            p.timeprogress = 0;
        });
        console.log("reset");
    }
    
    removeDeadParticles(){
        this.set = this.set.filter(p => p.timeprogress < p.lifetime);
    }
    
    addParticle(p){
        p.point = this.point;
        this.set.push(p);
    }
    
    startSet(){
        this.set = [];
        for(let i = 0; i < this.partAmount; i++) this.set.push(new TrailParticle(new Point(0,0), "yellow", this.partLifetime));
    }
}