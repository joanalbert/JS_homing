function drawCircle(point, radius, color, fill, ctx){
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
    
    if(fill){
        ctx.fillStyle = color;
        ctx.fill();
    } 
    else{ 
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function drawLine(start, end, width, color, ctx){
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    
    ctx.stroke();
}

function drawText(text, point, ctx){
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(text, point.x, point.y)
}

function drawRotatedImage(ctx, image, x, y, w, h, degrees){
      ctx.save();
      ctx.translate(x+w/2, y+h/2);
      ctx.rotate(degrees*Math.PI/180.0);
      ctx.translate(-x-w/2, -y-h/2);
      ctx.drawImage(image, x, y, w, h);
      ctx.restore();
}

function drawImage(ctx, image, x, y, w, h){
    ctx.drawImage(image, x, y, w, h);
}

function drawPointInfo(point, ctx){
    drawText(`[${point.x.toFixed(0)},${point.y.toFixed(0)}]`,
             point.plus(Vector.RIGHT.scaled(14).plus(Vector.UP.scaled(14))),
             ctx);
}
