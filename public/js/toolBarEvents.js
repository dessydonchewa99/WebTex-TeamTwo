const canvas = document.getElementById("drawing_canvas");
const ctx = canvas.getContext("2d");
const modal = document.getElementById("myModal");

let coord = { x: 0, y: 0 };

//free hand draw button
document.getElementById('freehand_draw_button').addEventListener("click",function (r){
    removeListeners();
    document.addEventListener("mousedown", startFreeHandLine)
    {
        console.log("FREE HAND BUTTON");
    }
    document.addEventListener("mouseup", stopFreeHandLine);
})
// line button
document.getElementById('line_button').addEventListener("click",function (r){
    document.addEventListener("mousedown", start)
    {
        console.log("LINE BUTTON")
    }
    document.addEventListener("mouseup", stop);
})
// non-filled rectangle
document.getElementById('rectangle_button').addEventListener("click",function (r){
    document.addEventListener("mousedown", start)
    {
        console.log("RECTANGLE BUTTON")
    }
    document.addEventListener("mouseup", stop);
})

//filled rectangle
document.getElementById('filled_rectangle_button').addEventListener("click",function (r){
    removeListeners();
    document.addEventListener("mousedown", startRectangle)
    {
        console.log("FILLED RECTANGLE BUTTON")
    }
    document.addEventListener("mouseup", stopRectangle);
})

//non-filled circle
document.getElementById('circle_button').addEventListener("click",function (r){
    document.addEventListener("mousedown", start)
    {
        console.log(" CIRCLE BUTTON")
    }
    document.addEventListener("mouseup", stop);
})
//filled circle
document.getElementById('filled_circle_button').addEventListener("click",function (r){
    removeListeners();
    document.addEventListener("mousedown", startCircle)
    {
        console.log(" FILLED CIRCLE BUTTON");
    }
    document.addEventListener("mouseup", stopCircle);
})
// erase drawing
document.getElementById('erase_button').addEventListener("click",function (r){
    removeListeners();
    changeColor('white');
    document.addEventListener("mousedown", startFreeHandLine)
    {
        console.log(" ERASE BUTTON");
    }
    document.addEventListener("mouseup", stopFreeHandLine);
})
// airbrush drawing
document.getElementById('airbrush_button').addEventListener("click",function (r){
    removeListeners();
    document.addEventListener("mousedown", startSpray)
    {
        console.log(" SPRAY BUTTON");
    }
    document.addEventListener("mouseup", stopSpray);
})
// text box
document.getElementById('text_button').addEventListener("click",function (r){
    removeListeners();
    console.log(" TEXT BUTTON");
    document.addEventListener("click", addText);
    addText();
})
// remove event listeners
function removeListeners(){

    document.removeEventListener("mousedown", startFreeHandLine);
    document.removeEventListener("mouseup", stopFreeHandLine);

    document.removeEventListener("mousedown", startRectangle);
    document.removeEventListener("mouseup", stopRectangle);

    document.removeEventListener("mousedown", startSpray);
    document.removeEventListener("mouseup", stopSpray);

    document.removeEventListener("click", addText);
}
// sizes
function updateSizeField() { 
  var currentSize = ctx.lineWidth;
  document.getElementById("size_field").value = currentSize;  
}
document.getElementById('size_up_button').addEventListener('click', function(e){
    ctx.lineWidth = ctx.lineWidth + 1;
    updateSizeField();
});
document.getElementById('size_down_button').addEventListener('click', function(e){
    ctx.lineWidth = ctx.lineWidth - 1;
    updateSizeField();
});
// colors
function changeColor(color) { 
    ctx.strokeStyle = color; 
}
document.getElementById('black').addEventListener('click', function(e) {
  changeColor('black');
});
document.getElementById('white').addEventListener('click', function(e) {
  changeColor('white');
});
document.getElementById('yellow').addEventListener('click', function(e) {
  changeColor('yellow');
});
document.getElementById('green').addEventListener('click', function(e) {
  changeColor('lawngreen');
});
document.getElementById('red').addEventListener('click', function(e) {
  changeColor('red');
});
document.getElementById('blue').addEventListener('click', function(e) {
  changeColor('deepskyblue');
});
document.getElementById('purple').addEventListener('click', function(e) {
  changeColor('darkviolet');
});
document.getElementById('orange').addEventListener('click', function(e) {
  changeColor('orangered');
});
document.getElementById('aqua').addEventListener('click', function(e) {
  changeColor('aqua');
});
document.getElementById('pink').addEventListener('click', function(e) {
  changeColor('deeppink');
});
//color picker functions
document.getElementById('empty-color').addEventListener('click', function(e) {
    picker();
    console.log(1111)
    console.log(document.getElementById('empty-color').style.background)
    console.log(document.getElementById('color-input').value)
    document.getElementById('empty-color').style.background = document.getElementById('color-input').value;
    console.log(2222)
    console.log(document.getElementById('empty-color').style.background)
    console.log(document.getElementById('color-input').value)
  });


document.getElementById('uploadButton').addEventListener('click', function(event) {


    const currentWidth = Number(canvas.width);
    const currentHeight = Number(canvas.height);

    const image = new Image(currentWidth, currentHeight);
    const file = document.getElementById('uploadFile');

    image.src = file.value;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, currentWidth, currentHeight);
    }
    modal.style.display = 'none';
    file.value = '';
});

document.getElementById('open_file_button').addEventListener('click', function(e) {
    modal.style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function(e) {
    modal.style.display = 'none';
});

document.getElementById('save_file_button').addEventListener('click', function(e) {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = ctx.toDataURL();
    link.click();
});


function picker(){
    var col = document.getElementById('color-input').value;
    changeColor(col);
}
//window.addEventListener("resize", resize);

resize();
// free hand functions
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function startFreeHandLine(event) {
    console.log(100)
    document.addEventListener("mousemove", drawFreeHandLine);
    reposition(event);
}
function stopFreeHandLine() {
    document.removeEventListener("mousemove", drawFreeHandLine);
    console.log(101)
}
function drawFreeHandLine(event) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}
// filled rectangle functions
var color, 
drawing = false,
drawMode,
tempX, 
tempY,
position;
function startRectangle(event) {
    document.addEventListener("mousemove", drawRectangle);
    drawing = true;
    drawMode = positionsRectangle(event);
    ctx.fillStyle = ctx.strokeStyle;
}
function drawRectangle(event) {
    if (drawing === true) {
        position = positionsRectangle(event);
        drawRectangleHelper(position);
        ctx.fill();
    }
}
function stopRectangle(event) {
    drawing = false;
    position = positionsRectangle(event);
    drawRectangle(position);        
    ctx.fill(); 
    tempRectangle = {
        x:tempX,
        y:tempY,
    };
    document.removeEventListener("mousemove", drawRectangle);
}
function drawRectangleHelper(position) {
    tempX = drawMode.x;
    tempY = drawMode.y;
            
    ctx.beginPath();
    ctx.rect(tempX, tempY, position.x, position.y);
    ctx.closePath();
}   
function positionsRectangle(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return {
        x: x, 
        y: y
    };
}
// spray functions
function startSpray(event) {
    document.addEventListener("mousemove", drawSpray);
    reposition(event);
}
function stopSpray() {
    document.removeEventListener("mousemove", drawSpray);
}
function drawSpray(event) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.arc(
    coord.x + Math.cos( Math.random() * Math.PI * 2 ) * ctx.lineWidth * Math.random() * 2,
    coord.y + Math.sin( Math.random() * Math.PI * 2 ) * ctx.lineWidth * Math.random() * 2,
    ctx.lineWidth,
    0, Math.PI * 2, false
    );
    ctx.fill();
}
// text box
function addText(event){
    var xText = event.clientX;
    var yText = event.clientY;
    ctx.font = "30px Arial";
    ctx.strokeText("Hello", xText, yText);
}