const canvas = document.getElementById("drawing_canvas");
const ctx = canvas.getContext("2d");
const modal = document.getElementById("uploadModal");

let coord = { x: 0.0, y: 0.0};

function startDraw()
{
    document.getElementById('freehand_draw_button').click();
}
//free hand draw button
document.getElementById('freehand_draw_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startFreeHandLine)
    {
        console.log("FREE HAND BUTTON");
    }
    canvas.addEventListener("mouseup", stopFreeHandLine);
})
// curve button
document.getElementById('curve_line_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startCurveLine)
    {
        console.log("CURVE LINE BUTTON");
    }
    canvas.addEventListener("mouseup", stopCurveLine);
})
// line button
document.getElementById('line_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startStraightLine)
    {
        console.log("LINE BUTTON")
    }
    canvas.addEventListener("mouseup", stopStraightLine);
})
// non-filled rectangle
document.getElementById('rectangle_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startNonFillRect)
    {
        console.log("RECTANGLE BUTTON")
    }
    canvas.addEventListener("mouseup", stopNonFillRect);
})

//filled rectangle
document.getElementById('filled_rectangle_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startRectangle)
    {
        console.log("FILLED RECTANGLE BUTTON")
    }
    canvas.addEventListener("mouseup", stopRectangle);
})

//non-filled circle
document.getElementById('circle_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startNonFillCircle)
    {
        console.log(" CIRCLE BUTTON")
    }
    canvas.addEventListener("mouseup", stopNonFillCircle);
})
//filled circle
document.getElementById('filled_circle_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startCircle)
    {
        console.log(" FILLED CIRCLE BUTTON");
    }
    canvas.addEventListener("mouseup", stopCircle);
})
// erase drawing
document.getElementById('erase_button').addEventListener("click",function (r){
    removeListeners();
    changeColor('white');
    canvas.addEventListener("mousedown", startFreeHandLine)
    {
        console.log(" ERASE BUTTON");
    }
    canvas.addEventListener("mouseup", stopFreeHandLine);
})
// airbrush drawing
document.getElementById('airbrush_button').addEventListener("click",function (r){
    removeListeners();
    canvas.addEventListener("mousedown", startSpray)
    {
        console.log(" SPRAY BUTTON");
    }
    canvas.addEventListener("mouseup", stopSpray);
})
// text box
document.getElementById('text_button').addEventListener("click",function (r){
    removeListeners();
    console.log(" TEXT BUTTON");
    canvas.addEventListener("click", addText);
    addText();
})
document.getElementById('fill_color_button').addEventListener("click",function (r){
    removeListeners();
    console.log(" FILL BUTTON");
    canvas.addEventListener("click", fillLastShape);
    fillLastShape();
    canvas.removeEventListener("click", fillLastShape);
})
// remove event listeners
function removeListeners(){

    canvas.removeEventListener("mousedown", startFreeHandLine);
    canvas.removeEventListener("mouseup", stopFreeHandLine);

    canvas.removeEventListener("mousedown", startCurveLine);
    canvas.removeEventListener("mouseup", stopCurveLine);

    canvas.removeEventListener("mousedown", startStraightLine);
    canvas.removeEventListener("mouseup", stopStraightLine);

    canvas.removeEventListener("mousedown", startRectangle);
    canvas.removeEventListener("mouseup", stopRectangle);

    canvas.removeEventListener("mousedown", startNonFillRect);
    canvas.removeEventListener("mouseup", stopNonFillRect);

    canvas.removeEventListener("mousedown", startSpray);
    canvas.removeEventListener("mouseup", stopSpray);

    canvas.removeEventListener("mousedown", startCircle);
    canvas.removeEventListener("mouseup", stopCircle);

    canvas.removeEventListener("mousedown", startNonFillCircle);
    canvas.removeEventListener("mouseup", stopNonFillCircle);

    canvas.removeEventListener("click", addText);
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
    image.crossOrigin = "anonymous";

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

document.getElementsByClassName('close')[1].addEventListener('click', function(e) {
    document.getElementById('saveModal').style.display = 'none';
});


document.getElementById('save_file_button').addEventListener('click', function(e) {
    const saveModal = document.getElementById('saveModal');
    saveModal.style.display = 'block';

    //console.log(document.querySelector('#users-select').value);   Will use that to get selected values from dropdown :)

    fetch('/users')
    .then(res => res.json())
    .then(json => {

        let users = new Array();
        json.forEach(user => {
            users.push({label: user.username, value: user.username});
        });


          VirtualSelect.init({
            ele: '#users-select',
            options: users,
            multiple: true
          });
    });
    
});
document.getElementById('saveButton').addEventListener('click', function(e) {
    var fileName = document.getElementById('saveFile').value;
    var isPublic = document.getElementById("public").checked;
    var allowedUsers = [];
    if(isPublic === false)
    {
        allowedUsers = document.querySelector('#users-select').value;
    }
    console.log(allowedUsers);


    var dataUrl = canvas.toDataURL();
    var isPublic = !document.getElementById('private').checked;
    var usersSelect = document.getElementById('users-select');
    var allowedUserIds = usersSelect.getElementsByTagName('input')[0].value.split(',');
    
    fetch('/add-paint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imageUrl: dataUrl, fileName: fileName, isPublic: isPublic, allowedUsers: allowedUsers})
    })
    .then(async (res) => 
        {
            if(res.status == 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'You saved your painting successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                  });
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            else {
                const errorMessage = await res.text();
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        });

    fileName.value = '';
    saveModal.style.display = 'none';
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
    newRecord();
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
// CURVE FUNCTIONS
function startCurveLine(event) {
    console.log(100)
    document.addEventListener("mousemove", drawCurveLine);
    reposition(event);
}
function stopCurveLine() {
    document.removeEventListener("mousemove", drawCurveLine);
    newRecord();
    console.log(101)
}
function drawCurveLine(event) {
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
    let x1 = coord.x, y1 = coord.y;
    reposition(event);
    let x2 = coord.x, y2 = coord.y;
    ctx.bezierCurveTo(x1, Math.abs(y1 + (y2-y1) + (x2-x1)), x2, Math.abs(y2+ (y2-y1) + (x2-x1)), x2, y2);
    ctx.stroke();
}
// spray functions
function startSpray(event) {
    document.addEventListener("mousemove", drawSpray);
    reposition(event);
}
function stopSpray() {
    document.removeEventListener("mousemove", drawSpray);
    newRecord();
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

let tracking = {x: 30.0, y: 30.0};
function addText(){
    var input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'relative';
    input.style.height = "5%";
    input.style.width = "20%";
    document.onmousemove = handleMouseMove;
    input.onkeydown = handleEnter;
    document.body.appendChild(input);
    input.focus();
}
function handleMouseMove(event){
    tracking.x = event.pageX;
    tracking.y = event.pageY;
}
function handleEnter(event) {
    var keyCode = event.keyCode;
    if (keyCode === 13) { // 13 = enter
        drawText(this.value);
        document.body.removeChild(this);
    }
}
function drawText(txt) {
    ctx.fillStyle = ctx.strokeStyle;
    let str = "";
    str += ctx.lineWidth * 10 + "px" + " " + "sans-serif";
    console.log(str);
    ctx.font = str;
    ctx.fillText(txt, tracking.x, tracking.y);
}
document.getElementById("#bottom").addEventListener('click',function (e){
    console.log("hi")
})
//line function
function startStraightLine(event) {
    document.addEventListener("mousemove", drawStraightLine);
    reposition(event);
}
function stopStraightLine(event) {
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
    document.removeEventListener("mousemove", drawStraightLine);
    newRecord();
}
function drawStraightLine() {
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
}

// --------- SHAPES ---------

let lastShape = { coord1: 0.0, coord2: 0.0, coord3: 0.0, coord4: 0.0, strokestyle: 'black', shape: 'r', line: 0};

//CIRCLES
//no filled circle functions
var circleStartX, circleStartY;
function startNonFillCircle(event){
    document.addEventListener("mousemove", drawNonFillCircle);
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    circleStartX = coord.x;
    circleStartY = coord.y;
}
function stopNonFillCircle(event){
    reposition(event);
    ctx.arc(circleStartX, circleStartY, coord.x-circleStartX, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    document.removeEventListener("mousemove", drawNonFillCircle);
    saveLastShape(circleStartX, circleStartY, coord.x-circleStartX, 0, ctx.strokeStyle, 'c', ctx.lineWidth);
    newRecord();
}
function drawNonFillCircle(){
    ctx.beginPath();
}
//filled circle functions
function startCircle(event){
    document.addEventListener("mousemove", drawCircle);
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    circleStartX = coord.x;
    circleStartY = coord.y;
    
}
function stopCircle(event){
    reposition(event);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.arc(circleStartX, circleStartY, coord.x-circleStartX, 50, 0, 2 * Math.PI);
    //ctx.stroke();
    ctx.closePath();
    ctx.fill();
    document.removeEventListener("mousemove", drawCircle);
    saveLastShape(circleStartX, circleStartY, coord.x-circleStartX, 0, ctx.strokeStyle, 'c', ctx.lineWidth);
    newRecord();
}
function drawCircle(){
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
}

//RECTANGLES
//no filled rectangle functions
var rectStartX, rectStartY;
function startNonFillRect(event){
    document.addEventListener("mousemove", drawNonFillRect);
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    rectStartX = coord.x;
    rectStartY = coord.y;
}
function stopNonFillRect(event){
    reposition(event);
    ctx.strokeRect(rectStartX, rectStartY, coord.x-rectStartX, coord.y-rectStartY);
    document.removeEventListener("mousemove", drawNonFillRect);
    saveLastShape(rectStartX, rectStartY, coord.x-rectStartX, coord.y-rectStartY, ctx.strokeStyle, 'r', ctx.lineWidth);
    newRecord();
}
function drawNonFillRect(){
    ctx.moveTo(coord.x, coord.y);
}
// filled rectangle functions
function startRectangle(event) {
    document.addEventListener("mousemove", drawRectangle);
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    rectStartX = coord.x;
    rectStartY = coord.y;
}
function drawRectangle() {
    ctx.moveTo(coord.x, coord.y);
}
function stopRectangle(event) {
    reposition(event);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(rectStartX, rectStartY, coord.x-rectStartX, coord.y-rectStartY);
    document.removeEventListener("mousemove", drawRectangle);
    saveLastShape(rectStartX, rectStartY, coord.x-rectStartX, coord.y-rectStartY, ctx.strokeStyle, 'r', ctx.lineWidth);
    newRecord();
}
// FILL LAST SHAPE FUNCTIONS
var currWidth, currStyle;
function fillLastShape(){
    getCurrentStyles();
    if(lastShape.shape === 'r'){
        ctx.beginPath();
        ctx.lineWidth = lastShape.line;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeStyle = lastShape.strokestyle;
        ctx.fillRect(lastShape.coord1, lastShape.coord2, lastShape.coord3, lastShape.coord4);
        ctx.stroke();
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.lineWidth = lastShape.line;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.strokeStyle = lastShape.strokestyle;
        ctx.arc(lastShape.coord1, lastShape.coord2, lastShape.coord3, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    resetCurrentStyles();
}
function saveLastShape(coord1, coord2, coord3, coord4, strokestyle, shape, line){
    lastShape.coord1 = coord1;
    lastShape.coord2 = coord2;
    lastShape.coord3 = coord3;
    lastShape.coord4 = coord4;
    lastShape.strokestyle = strokestyle;
    lastShape.shape = shape;
    lastShape.line = line;
}
function getCurrentStyles(){
    currWidth = ctx.lineWidth;
    currStyle = ctx.strokeStyle;
}
function resetCurrentStyles(){
    ctx.lineWidth = currWidth;
    ctx.strokeStyle = currStyle;
}

document.getElementById('logout-button').addEventListener('click',function (e){
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response =  fetch('/logout',options);
    console.log("successfully logged out")
})

let message = async ()=>{
    Swal.fire({
        title: 'Loaging painting',
        icon: "info",
        showConfirmButton:false,
        timer: 1500
    })
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
if (id != undefined)
{
    window.addEventListener("load",function (e) {
        fetch('/get-paint?id=' + id).then(response => response.json())
            .then(data => {
                message();
                
                const imgBg = new Image();
                imgBg.src = data.content.data;
                ctx.drawImage(imgBg, 0, 0, canvas.width, canvas.height);
            });

    })
}

document.getElementById("clearAll").addEventListener('click',function (e){
    const blank = isCanvasBlank(document.getElementById('drawing_canvas'));
    if (!blank){
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
            timer: 5000
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             document.getElementById('save_file_button').click();
            } else if (result.isDenied) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        })
    }
})
