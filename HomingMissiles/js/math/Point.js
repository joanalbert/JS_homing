class Point {
    
    static ORIGIN     = new Point(0,0);
    static MID_HEIGHT = new Point(0, canvas.height/2);
    static MID_WIDTH  = new Point(canvas.height/2,0);
    static BOTTOM_LEFT     = new Point(0,canvas.height);
    static BOTTOM_RIGHT = new Point(canvas.width, canvas.height);
    static CENTER     = new Point(canvas.width/2, canvas.height/2);
    
    x;
    y;
    
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    
    minus(other){
        let x = this.x - other.x;
        let y = this.y - other.y;
        return new Vector(x,y);
    }
    
    plus(other){
        let x = this.x + other.x;
        let y = this.y + other.y;
        return new Vector(x,y);
    }

    plusVector(other){
        let x = this.x + other.x;
        let y = this.y + other.y;
        return new Point(x,y);
    }
    
    dist(other){
        let toOther = other.minus(this);
        return toOther.magnitude();
    }

    toVector(){
        return new Vector(this.x, this.y);
    }

    equals(other){
        if(this.x == other.x && this.y == other.y) return true;
        return false;
    }

    //spawning targets
    static positionInsideCanvas(t){
        let x = randomInteger(t.radius, canvas.width-t.radius);
        let y = randomInteger(t.radius, (canvas.height-t.radius)/1.7);
        return new Point(x, y);
    }

    static closest(p1, p2, pLoc){
        let dist1 = p1.dist(pLoc);
        let dist2 = p2.dist(pLoc);
        
        if(dist1 < dist2) return p1;
        else if (dist1 > dist2) return p2;
        else return null;
    }

    draw(ctx){
        drawPointInfo(this, ctx);
    }
}