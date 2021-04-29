const canvas = document.querySelector('#drawing_canvas');
const context = canvas.getContext('2d');

var color, 
drawing = false,
drawMode,
radius,
tempX, 
tempY,
position;

window.addEventListener('load', () => {
	canvas.addEventListener('mousedown', drawingMode, false);
	canvas.addEventListener('mousemove', drawingCircleMode, false);
	canvas.addEventListener('mouseup', drawingBreak, false);
	canvas.width = window.innerWidth * 0.5;
	canvas.height = window.innerHeight * 0.5;
});
function drawingMode(event) {
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
function drawingBreak(event) {
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
function positions(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return {
		x: x, 
		y: y
	};
}