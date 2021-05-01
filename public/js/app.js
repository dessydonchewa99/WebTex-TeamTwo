
const modal = document.getElementById("myModal");
const ctx = document.getElementById('drawing_canvas');

document.getElementById('uploadButton').addEventListener('click', function(event) {


    const currentWidth = Number(ctx.width);
    const currentHeight = Number(ctx.height);
    const image = new Image(currentWidth, currentHeight);

    const file = document.getElementById('uploadFile');

    image.src = file.value;
    image.onload = function() {
        ctx.getContext('2d').drawImage(image, 0, 0, currentWidth, currentHeight);
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

// document.getElementById('save_file_button').addEventListener('click', function(e) {
//     const link = document.createElement('a');
//     link.download = 'image.png';
//     link.href = ctx.toDataURL();
//     link.click();
// });
