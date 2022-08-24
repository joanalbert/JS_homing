let canvas = document.getElementById("cnv");
let canvasRect = canvas.getBoundingClientRect();
let ctx = canvas.getContext("2d");

let projectileImg  = document.getElementById("purePursuit");
let projectileImg2 = document.getElementById("leadPursuit");

//mouse control
let mousePos = {
    x: 0,
    y: 0
}

canvas.addEventListener("mousemove", (event)=> {
    mousePos.x = event.clientX - canvasRect.left;
    mousePos.y = event.clientY - canvasRect.top;
    //console.log(`x: ${mousePos.x} y: ${mousePos.y}`);
});


//aim control
let aimClosest = false;
document.addEventListener("keydown", (event)=>{
    if(event.keyCode = 69) aimClosest = !aimClosest;
})


