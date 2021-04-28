const canvas = document.getElementById("drawing_canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

//free hand draw button
document.getElementById('freehand_draw_button').addEventListener("click",function (r){
    document.addEventListener("mousedown", start)
    {
        console.log("FREE HAND BUTTON")
    }
    document.addEventListener("mouseup", stop);
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
    document.addEventListener("mousedown", start)
    {
        console.log("FILLED RECTANGLE BUTTON")
    }
    document.addEventListener("mouseup", stop);
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
    document.addEventListener("mousedown", start)
    {
        console.log(" FILLED CIRCLE BUTTON")
    }
    document.addEventListener("mouseup", stop);
})

window.addEventListener("resize", resize);

resize();

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
    document.addEventListener("mousemove", drawFreeHandLine);
    reposition(event);
}
function stop() {
    document.removeEventListener("mousemove", drawFreeHandLine);
}
function drawFreeHandLine(event) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}
