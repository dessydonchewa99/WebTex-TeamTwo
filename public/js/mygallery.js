const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");

document.getElementById('gallery').addEventListener('click', function(e) {
    if(e.target.tagName == 'IMG') {
        modal.style.display = "block";
        modalImg.src = e.target.src;
    }
});

const span = document.getElementsByClassName("close")[0];
    span.addEventListener('click', function() { 
    modal.style.display = "none";
});

var button = document.getElementById('save_on_computer');
button.addEventListener('click', function (e) {
    var dataURL = ('image/png');
    button.href = dataURL;
});