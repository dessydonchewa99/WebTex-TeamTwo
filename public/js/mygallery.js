const modalgallery = document.getElementById("myModal");
const modalImg = document.getElementById("img01");

document.getElementById('gallery').addEventListener('click', function(e) {
    if(e.target.tagName == 'IMG') {
        modalImg.setAttribute('data-id',e.target.dataset.id)
        modalgallery.style.display = "block";
        modalImg.src = e.target.src;
        modalImg.title = e.target.title;
    }
});

const span = document.getElementsByClassName("close")[0];
    span.addEventListener('click', function() {
        modalgallery.style.display = "none";
});
function download(){
  document.getElementById('download-a').href = modalImg.src;
}
function toEdit(){

}