
window.addEventListener("keydown", (event)=>{
    if(event.keyCode == 32) showVectors = !showVectors;
})



//LINE-CIRCLE COLLISION
function getCollision(){
    if(checkLineEndsInCircle(thing1, circle)) return true;
    
    let closestPoint = lineClosestPointToPoint(thing1, circle);
    let pointIsOnTheLine = checkPointIsOnLine(thing1.start, thing1.end, closestPoint);
    
    if(pointIsOnTheLine){
        if(showVectors)drawCircle(closestPoint, 8, "tomato",true, ctx);
        if(circle.point.dist(closestPoint) <= circle.radius)return true;
        else return false;
    }
    else return false;
}


function checkLineEndsInCircle(thing, circle){
    let startDist = thing.start.dist(circle.point);
    let endDist   = thing.end.dist(circle.point);
    
    if(startDist <= circle.radius || endDist <= circle.radius) return true;
    return false;
}


//DOT = (LINE VECTOR . LINE END TO CIRCLE CENTER VECTOR) / LINE VECTOR MAG.SQUARED
/*CLOSEST POINT = [LINE END.x + DOT * LINE VECTOR.x,
                   LINE END.y + DOT * LINE VECTOR.y ] 
*/
function lineClosestPointToPoint(thing1, circle){
    
    //line start to end
    let v = thing1.vector;
    
    //line end to circle center
    let p = circle.point.minus(thing1.end); 
    
    //visual help
    if(showVectors){
        v.drawVector(thing1.start, circle, thing1.lineColor, ctx);
        p.drawVector(thing1.end, circle, "tomato", ctx);
    }
        
    let vMag = v.magnitude();
    let dot  = v.dot(p);
    let dot2 = dot / Math.pow(vMag,2);
    
    let newX = thing1.end.x + dot2 * v.x;
    let newY = thing1.end.y + dot2 * v.y;
    let closestPoint = new Point(newX, newY);
    
    return closestPoint;
}

function checkPointIsOnLine(start, end, point){
    let distStart = start.dist(point);
    let distEnd   = end.dist(point);
    let v         = end.minus(start);
    let vMag      = v.magnitude();
    
    let buffer = 0.1;
    
    //don'r really understand this condition
    if(distStart + distEnd >= vMag - buffer && distStart + distEnd <= vMag + buffer) return true;
    return false;
}