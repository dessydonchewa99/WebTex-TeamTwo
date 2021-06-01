var store = new Array();
var index = -1;

function newRecord () {

    index++;
    if (index < store.length) {
        store.length = index; 
    }
    store.push(canvas.toDataURL());
};

document.getElementById('undo_button').addEventListener('click', function(e){
    const currentWidth = Number(canvas.width);
    const currentHeight = Number(canvas.height);
    if (index == 0) {
        index--;
        ctx.clearRect(0, 0, currentWidth, currentHeight);
    }
    else if (index > 0) {
        index--;
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = store[index];

        ctx.clearRect(0, 0, currentWidth, currentHeight);
        image.onload = function () { 
            ctx.drawImage(image, 0, 0, currentWidth, currentHeight); 
        }
    }
});

document.getElementById('redo_button').addEventListener('click', function(e){
    const currentWidth = Number(canvas.width);
    const currentHeight = Number(canvas.height);

    if (index < store.length-1) {
        index++;
        var canvasPic = new Image();
        canvasPic.src = store[index];
        ctx.clearRect(0, 0, currentWidth, currentHeight);
        
        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0, currentWidth, currentHeight); 
        }
    }
});