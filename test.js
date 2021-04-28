const canvas = document.querySelector('#drawing_canvas');
const context = canvas.getContext('2d');

var color,
    drawing = false,
    drawMode,
    tempX,
    tempY,
    position;

document.getElementById('rectangle_button').addEventListener('click',function (e){
        console.log("hello")
        canvas.addEventListener('mousedown', drawingMode, true);
        canvas.addEventListener('mousemove', drawingRectangleMode, true);
        canvas.addEventListener('mouseup', drawingBreak, true);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

function drawingMode(event) {
    drawing = true;
    drawMode = positions(event);
    color = 'blue';
}
function drawingRectangleMode(event) {
    if (drawing === true) {
        position = positions(event);
        drawRectangle(position);
        context.fill();
    }
}
function drawingBreak(event) {
    drawing = false;
    position = positions(event);
    drawRectangle(position);
    context.fill();
    tempRectangle = {
        x:tempX,
        y:tempY,
    };
}
function drawRectangle(position) {
    tempX = drawMode.x;
    tempY = drawMode.y;

    context.beginPath();
    context.rect(tempX, tempY, position.x, position.y);
    context.closePath();
}
function positions(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return {
        x: x,
        y: y
    };
}

//circle
document.getElementById('circle_button').addEventListener('click',function (e){
    canvas.addEventListener('mousedown', drawingMode1, false);
    canvas.addEventListener('mousemove', drawingCircleMode, false);
    canvas.addEventListener('mouseup', drawingBreak1, false);
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
});
function drawingMode1(event) {
    drawing = true;
    drawMode = positions(event);
    color = 'black';
}
function drawingCircleMode(event) {
    if (drawing === true) {
        position = positions(event);
        drawCircle(position);
        context.fill();
    }
}
function drawingBreak1(event) {
    drawing = false;
    position = positions(event);
    drawCircle(position);
    context.fill();
    tempCircle = {
        x:tempX,
        y:tempY,
        rad:radius
    };
}
function drawCircle(position) {
    tempX = drawMode.x;
    tempY = drawMode.y;

    radius = Math.sqrt(Math.pow((tempX - position.x), 2) + Math.pow((tempY - position.y), 2));
    context.beginPath();
    context.arc(tempX, tempY, radius, 0, 2 * Math.PI, false);
    context.closePath();
}
