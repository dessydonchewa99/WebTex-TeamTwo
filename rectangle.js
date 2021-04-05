const canvas = document.querySelector('#drawing_canvas');
const context = canvas.getContext('2d');

var color, 
drawing = false,
drawMode,
tempX, 
tempY,
position;

window.addEventListener('load', () => {
	canvas.addEventListener('mousedown', drawingMode, false);
	canvas.addEventListener('mousemove', drawingRectangleMode, false);
	canvas.addEventListener('mouseup', drawingBreak, false);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
function drawingMode(event) {
    drawing = true;
    drawMode = positions(event);
	color = 'black';
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