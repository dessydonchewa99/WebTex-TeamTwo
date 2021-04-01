var modal = document.getElementById("myModal");

document.getElementById('uploadButton').addEventListener('click', function(event) {
    var ctx = document.getElementById('drawing_canvas');

    var currentWidth = Number(ctx.width);
    var currentHeight = Number(ctx.height);

    var image = new Image(currentWidth, currentHeight);
    var file = document.getElementById('uploadFile');
    image.src = file.value;
    image.onload = function() {
        ctx.getContext('2d').drawImage(image, 0, 0, currentWidth, currentHeight);
    }
    modal.style.display = 'none';
});


document.getElementById('open_file_button').addEventListener('click', function(e) {
    modal.style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function(e) {
    modal.style.display = 'none';
});