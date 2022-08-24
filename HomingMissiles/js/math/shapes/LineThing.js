class LineThing{

    vector;
    start;
    end;
    color;
    
    constructor(s, e, color){
        this.start = s;
        this.end = e;
        
        this.endsSize = 8;
        this.lineColor = color;
        
        this.vector = this.end.minus(this.start);
    }
    
    draw(ctx, showVectors){
        
        //draw line ends
        if(showVectors){
            drawCircle(this.start, this.endsSize, "black", true, ctx);
            drawCircle(this.end, this.endsSize, "blue", true, ctx);
        }
        //draw line between them
        drawLine(this.start, this.end, 1, this.color, ctx);
    }
}