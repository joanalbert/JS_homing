let lastCallTime;
let frames = 0;
let delta = 0;
let fps = 0;






let circle = new Circle(new Point(500,420), 200);

let dir = Vector.UP;
let length = 400;
let line = new Line(Point.CENTER, new Point(Point.CENTER.x + dir.x * length, Point.CENTER.y + dir.y * length));

//ctx.translate(canvas.width/2, canvas.height/2);

let oldMouse = new Point(mousePos.x, mousePos.y); 

let intersectPoints = [null, null];

//animation loop
window.requestAnimationFrame(loop);
function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    frames++
    getFPS();
    drawText(`fps: ${fps}`, new Point(5,20), ctx);
    drawText(`delta: ${delta}`, new Point(5,35), ctx);
    
    drawText(`LINE FORMULA//////`, new Point(5, 260), ctx);
    drawText(`line slope intercept y=mx+b: ${line.formula().text}`, new Point(5, 275), ctx);
    drawText(`start end: [${line.start.x},${line.start.y}] [${line.end.x.toFixed(0)},${line.end.y.toFixed(0)}]`, new Point(5, 290), ctx);
    
    drawText(`CIRCLE FORMULA//////`, new Point(5, 320), ctx);
    drawText("(x-h)^2 + (y-k)^2 = r^2 --> "+circle.formula().text, new Point(5, 335), ctx);
    
   
    //draw line
    line.draw(ctx);
    //line.drawPoints(ctx);
    //draw circle
    circle.draw(ctx);
    
    //update line and check intersections
    if(oldMouse.x != mousePos.x || oldMouse.y != mousePos.y){
        oldMouse.x = mousePos.x;
        oldMouse.y = mousePos.y;
        updateLine();
    }
    
    //draw first intersection point
    if(intersectPoints[0] != null && line.onSegment(intersectPoints[0])){
        drawCircle(intersectPoints[0], 3, "blue", true, ctx);
        drawPointInfo(intersectPoints[0], ctx);
    }
    
    //draw second intersection point
    if(intersectPoints[1] != null && line.onSegment(intersectPoints[1])){
        drawCircle(intersectPoints[1], 3, "red", true, ctx);
        drawPointInfo(intersectPoints[1], ctx);
    }
    
    window.requestAnimationFrame(loop);
}


function updateLine(){
    testRotation(dir);
    line = new Line(Point.CENTER, new Point(Point.CENTER.x + dir.x * length, Point.CENTER.y + dir.y * length)); 
    intersectPoints = circle.lineIntersect2(line, ctx);
}


function testRotation(a){
    let mouse   = new Point(mousePos.x, mousePos.y);
    let toMouse = mouse.minus(Point.CENTER);
    let angle = a.angleBetween(toMouse);
    
    let offset = 0.1;
    let uLimit = 0 + offset;
    let lLimit = 0 - offset;
    
    if(angle > lLimit && angle < uLimit) return;
    
    let cr = a.cross(toMouse);
        
    let clockwise = false;
    if(cr.z < 0) clockwise = true;
    
    a.rotate(angle * delta * 15, clockwise);
}


function getFPS(){
    
    
    if(!lastCallTime){
        lastCallTime = Date.now();
        fps = 0;
        return;
    }
    
    delta = (Date.now() - lastCallTime) / 1000;
    lastCallTime = Date.now();
    
    if(frames % 3 == 0)
        fps = Math.floor(1/delta);
}

function randomInteger(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}