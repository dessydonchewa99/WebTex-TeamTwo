
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
document.getElementById("uploadButton").addEventListener('click',function (e){
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
                document.getElementById('uploadButton').click();
            }
        })
    }
})
