var store = new Array();
var index = -1;
const ctx = document.getElementById('drawing_canvas').getContext("2d");

function newRecord() {
    index++;
    if (index < store.length) {
        store.length = index; 
    }
    store.push(document.getElementById('drawing_canvas').toDataURL());
}

function undo() {
    if (index > 0) {
        index--;
        var canvasPic = new Image();
        canvasPic.src = store[index];

        canvasPic.onload = function () { 
            ctx.drawImage(canvasPic, 0, 0); 
        }
    }
}

function redo() {
    if (index < store.length-1) {
        index++;
        var canvasPic = new Image();
        canvasPic.src = store[index];
        canvasPic.onload = function () { 
            ctx.drawImage(canvasPic, 0, 0); 
        }
    }
}