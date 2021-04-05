window.addEventListener('load', () => {
        
    resize(); 
    document.addEventListener('mousedown', drawingMode);
    document.addEventListener('mouseup', drawingBreak);
    // document.addEventListener('mousemove', draw);
    document.addEventListener('mousemove', drawSpray);
    window.addEventListener('resize', resize);
});
const canvas = document.querySelector('#drawing_canvas');
const context = canvas.getContext('2d');
// variables with changing values
var position = {
    x:0,
    y:0
}, 
drawing = false;
context.lineWidth = 1;
var rect = {};
/*
This function gets the current size of the line width and set it as a value
of the size field.
*/
function updateSizeField() { 
  var currentSize = context.lineWidth;
	document.getElementById("size_field").value = currentSize;  
}
function resize(){
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
}
function changeColor(color) { 
  context.strokeStyle = color; 
}
document.getElementById('size_up_button').addEventListener('click', function(e){
    context.lineWidth = context.lineWidth + 1;
    updateSizeField();
});
document.getElementById('size_down_button').addEventListener('click', function(e){
    context.lineWidth = context.lineWidth - 1;
    updateSizeField();
});
/*
function writeInSizeField(){
    var x = document.getElementById("size_field").value;
    context.lineWidth = x;
    updateSizeField();
}
*/
function movePosition(event){
  position.x = event.clientX - canvas.offsetLeft;
  position.y = event.clientY - canvas.offsetTop;
}
function drawingMode(event){
  drawing = true;
  movePosition(event);
}
var endX = 0, endY = 0;
function drawingBreak(event){
  drawing = false;
}
//draw free style
function draw(event){
  if (drawing == false) return;
  context.beginPath();
  context.lineCap = 'round';
  //from
  context.moveTo(position.x, position.y);  
  movePosition(event);
  //to
  context.lineTo(position.x , position.y);
  context.stroke(); 
}
//draw spray style
function drawSpray(event){
  if (drawing == false) return;
  context.beginPath();
  //from
  context.moveTo(position.x, position.y);  
  movePosition(event);
  //to
  context.fillStyle = context.strokeStyle;
  context.arc(
    position.x + Math.cos( Math.random() * Math.PI * 2 ) * context.lineWidth * Math.random() * 2,
    position.y + Math.sin( Math.random() * Math.PI * 2 ) * context.lineWidth * Math.random() * 2,
    context.lineWidth,
    0, Math.PI * 2, false
    );
    context.fill();
}
document.getElementById('erase_button').addEventListener('click', function(e){
  changeColor('white');
});
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