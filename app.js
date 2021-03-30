document.getElementById('uploadButton').addEventListener('click', function(event) {
    var ctx = document.getElementById('drawing_canvas');

    var image = new Image(950, 950);
    var file = document.getElementById('uploadFile');
    image.src = file.value;
    image.onload = function() {
        ctx.getContext('2d').drawImage(image, 0, 0, 950, 950);
    }
})