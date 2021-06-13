const drawingCanvas = document.getElementById("drawing_canvas");
const context = drawingCanvas.getContext("2d");

document.getElementById("show").addEventListener('click',function (e){
    document.getElementById("container").style.display = "block";
})
document.getElementById("hide").addEventListener('click',function (e){
    document.getElementById("container").style.display = "none";
})

function isCanvasBlank(canvas) {
    const blank = document.createElement('canvas');

    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() === blank.toDataURL();
}

document.getElementById("gallery_button").addEventListener('click',function (e){
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
               window.location = '/mygallery';
           }
       })
   }else{
       window.location = '/mygallery';
   }
})
document.getElementById("gallery_button").addEventListener('click',function (e){
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
                document.getElementById('saveButton').addEventListener('click',function (e){
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    window.location = '/mygallery';
                })
            } else if (result.isDenied) {
                window.location = '/mygallery';
            }
        })
    }else{
        window.location = '/mygallery';
    }
})
document.getElementById("public_gallery_button").addEventListener('click',function (e){
    const blank = isCanvasBlank(document.getElementById('drawing_canvas'));
    if (!blank){
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
            timer: 5000
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('save_file_button').click();
                document.getElementById('saveButton').addEventListener('click',function (e){
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    window.location = '/public_gallery';
                })
            } else if (result.isDenied) {
                window.location = '/public_gallery';
            }
        })
    }else{
        window.location = '/public_gallery';
    }
})
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