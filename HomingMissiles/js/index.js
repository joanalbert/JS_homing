let lastCallTime;
let frames = 0;
let delta = 0;
let fps = 0;
 

//target
let targetAmount = 1;
let targets = [];
addTargets(targets,false);

//missiles
let missiles = [];

//launchers
let launcher = new Launcher(Point.CENTER.plus(Point.MID_HEIGHT).toPoint(), 25, "black", true, 5, 75, targets);

// mouse line
let mouseLineDirection = new Vector(Vector.RIGHT.x, Vector.RIGHT.y);
let mouseLineLength = 200; 
let ls = new Line(Point.CENTER, Point.CENTER.plusVector(mouseLineDirection.scaled(mouseLineLength)));

//animation loop
window.requestAnimationFrame(loop);
function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    frames++
    getFPS();
    drawText(`fps: ${fps}`, new Point(5,20), ctx);
    drawText(`delta: ${delta}`, new Point(5,35), ctx);
    
        
    handleMouseLine();
    
        
    
    ///UPDATE TARGETS
    updateTargets(targets);
    deleteTargets();
    
    //UPDATE MISSILES
    updateMissiles();
    deleteMissiles();
    
    if(targets.length == 0) addTargets(targets, true);

      
    ///UPDATE LAUNCHERS
    launcher.tickTarget(delta);
    launcher.draw(ctx);
         
    window.requestAnimationFrame(loop);
}


function addTargets(targets, launcherDefined){
    for(let i = 0; i < targetAmount; i++){
        let rnd = randomInteger(0,canvas.height);
        let rnd2 = randomInteger(20,canvas.width);

        let separation = randomInteger(20,60);
        let tVel = Vector.RANDOM_DIRECTION();
        //let tPos = Point.MID_HEIGHT.plus(Vector.RIGHT.scaled(rnd2))
                               //.plus(Vector.UP.scaled(rnd)).toPoint();
        
        let t = new Circle(null, tVel, 100, 5, "blue", true, 70);
        
        let tPos = Point.positionInsideCanvas(t);
        
        t.point = tPos;
        
        targets.push(t);
    }
    
    //console.log("a")
    
    if(launcherDefined)launcher.targets = targets;
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


function handleMouseLine(){
    // Handle mouse line
    testRotation(mouseLineDirection);
    ls = new Line(Point.CENTER, Point.CENTER.plusVector(mouseLineDirection.scaled(mouseLineLength)));
    ls.draw(ctx);
}


//update missiles
function updateMissiles(){
    missiles.forEach(m => {
        m.tick(delta, frames, ctx);
        m.draw(ctx);
    });
}

function deleteMissiles(){
    let newMissiles = missiles.filter(missile => missile.remove == false); 
    missiles = [];
    missiles = newMissiles;
}

//targets
function updateTargets(targets){
    targets.forEach(t => {
        t.tickTarget(delta, targets);
        t.draw(ctx);
    });
}

function deleteTargets(){
    let newTargets = targets.filter(target => target.remove == false); targets = [];
    targets = newTargets;
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


