window.addEventListener('load', ()=>{
        
    resize(); 
    document.addEventListener('mousedown', drawingMode);
    document.addEventListener('mouseup', drawingBreak);
    document.addEventListener('mousemove', draw);
    window.addEventListener('resize', resize);
});
    
const canvas = document.querySelector('#drawing_canvas');
const context = canvas.getContext('2d');
var position = {
    x:0,
    y:0
}, 
drawing = false;
context.lineWidth = 1;
    
function updateSizeField() { 
	document.getElementById("size_field").value = context.lineWidth;
}

function resize(){
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
}

function changeColor(color) { 
    context.strokeStyle = color; 
}

function makeSizeBigger(){
    context.lineWidth = context.lineWidth + 1;
    updateSizeField();
}

function makeSizeSmaller(){
    context.lineWidth = context.lineWidth- 1;
    updateSizeField();
}

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

function drawingBreak(){
  drawing = false;
}
    
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