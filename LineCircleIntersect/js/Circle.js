class Circle{
    
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
    
    lineIntersect2(line, ctx){
        let circleFormula = this.formula();
        let lineFormula = line.formula();
        
        //line
        let m = lineFormula.m;
        let x = lineFormula.x;
        let b = lineFormula.b;
        
        //circle
        let h = circleFormula.h;
        let k = circleFormula.k;
        let r = circleFormula.r;
                        
        //old a b c  values, wrong
        //let quadA = (x*x) + ((m*m) * (x*x));
        //let quadB = (-2*h*x) + (2*m*x*l);
        //let quadC = ((h*h) + (l*l)) - (r*r);
                
        let _a = 1 + m*m;
        let _b = -2*h + 2*m*b - 2*m*k;
        let _c = h*h + b*b - 2*b*k + k*k - r*r;
        
        
        let result = this.quadratic(_a, _b, _c);
        
        console.log(`\na = ${_a} b = ${_b} c = ${_c} \nresult = ${result[0]}, ${result[1]}, disc=${result[2]}\n`);
        
        if(result[2] > -1){
            let x1 = result[0];
            let x2 = result[1];
            
            //y = mx + b
            let y1 = m*x1 + b;
            let y2 = m*x2 + b;
            
            let point1 = new Point(x1, y1);
            let point2 = new Point(x2, y2);
            
              
            return [point1, point2];
                        
            //if(x1 != undefined && x2 != undefined) console.log("2 intersections");
            //else console.log("1 intersection");
        }
        else console.log("no intersection");
        
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
    
    lineIntersection(line, ctx){
        let d  = line.getVector();
        let dr = d.magnitude();
        let D  = (line.start.x * line.end.y) - (line.end.x * line.start.y);
    
                
        let discriminant = (((this.radius*this.radius) * (dr*dr)) - D*D ); 
        
        let x  = (D*d.y + this.sgn(d.y)*d.x*Math.sqrt( discriminant )) / Math.pow(dr,2); 
        let y  = (-D*d.x + Math.abs(d.y) * Math.sqrt( discriminant )) / Math.pow(dr,2);
        
        let x2 = (D*d.y - this.sgn(d.y)*d.x*Math.sqrt( discriminant )) / Math.pow(dr,2);
        let y2 = (-D*d.x - Math.abs(d.y) * Math.sqrt( discriminant )) / Math.pow(dr,2);
        
        let Point1 = new Point(x, y);
        let Point2 = new Point(x2, y2);
        
                    
        drawCircle(Point1, 5, "green", true, ctx);
        drawCircle(Point2, 5, "blue", true, ctx);
        
        
        
        if(discriminant < 0) console.log("no intersection\n");
        else if (discriminant == 0) console.log("tangent\n");
        else if (discriminant > 0) console.log("intersection\n");
    }
    
    sgn(x){
        if(x < 0) return -1;
        else return 1;
    }
}