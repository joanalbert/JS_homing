class CircleShape{
    
    constructor(posPoint, radius){
        this.pos = posPoint;
        this.radius = radius;
    }
    
    draw(ctx){
       drawCircle(this.pos, this.radius, "blue", false, ctx); 
    }
    
    
    // (x-h)^2 + (y-k)^2 = r^2
    formula(){
        
        let h  = this.pos.x;
        let k  = this.pos.y;
        let rs = this.radius*this.radius;
        
        return {
            x: 0,
            h: h,
            y: 0,
            k: k,
            rs: rs,
            r: this.radius,
            text: `(x-${h})^2 + (y-${k})^2 = ${this.radius.toFixed(0)}^2 `
        }
    }
    
    lineIntersect(line){
        // (x-h)^2 + (y-k)^2 = r^2
        let circleFormula = this.formula();
        
        // y = mx + b
        let lineFormula = line.formula();
        
        //line vars     
        let m = lineFormula.m;
        let x = lineFormula.x;
        let b = lineFormula.b;
        
        //circle vars  
        let h = circleFormula.h;
        let k = circleFormula.k;
        let r = circleFormula.r;
                        
                
        let _a = 1 + m*m;
        let _b = -2*h + 2*m*b - 2*m*k;
        let _c = h*h + b*b - 2*b*k + k*k - r*r;
        
        
        let result = this.quadratic(_a, _b, _c);

        
        if(result[2] > -1){
            let x1 = result[0];
            let x2 = result[1];
            
            //y = mx + b
            let y1 = m*x1 + b;
            let y2 = m*x2 + b;
            
            let point1 = new Point(x1, y1);
            let point2 = new Point(x2, y2);
                         
            return [point1, point2];
        }
          
        return [null, null];
    }
    
    quadratic(a, b, c)
    {
        let roots = []
        let discriminant = (b*b) - (4*a*c);
        let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        roots[0] = root1;
        roots[1] = root2;
        roots.push(discriminant);
        return roots;
    }
    
}