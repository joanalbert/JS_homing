class Line{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
    
    draw(ctx){
        drawLine(this.start, this.end, 1, "red", ctx);
    }
    
    getVector(){
        return this.end.minus(this.start);
    }
    
    // y = mx + b
    formula(){
        let v = this.getVector();
        
        //calculat slope
        let m = -v.y / -v.x;
        
        //calculate y intercept
        let z = m * this.end.x;
        let b = this.end.y - z;
        
        //console.log(`y = mx+b --> ${this.end.y} = ${m}(${this.end.x})+${b}`);
        
        return {
            y: this.end.y,
            m: m,
            x: this.end.x,
            b: b,
            text: `${this.end.y.toFixed(0)} = ${m.toFixed(3)}(${this.end.x.toFixed(0)})+${b.toFixed(0)}`
        }
    }
    

    onSegment(point){
        let vect = this.getVector();
        
        //lerp
        for(let t = 0; t < 1; t += 0.01){
            let tempVect  = vect.scaled(t);
            let tempPoint = this.start.plusVector(tempVect);
            
            let inrange = point.minus(tempPoint).magnitude() < 10 ? true : false;
            if(inrange) return true;
        }
        
        return false;
    }
}