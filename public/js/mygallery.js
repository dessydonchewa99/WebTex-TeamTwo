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
    document.getElementById('download-a').download = modalImg.title;
  document.getElementById('download-a').href = modalImg.src;

}
function toEdit(){

}

 document.getElementById("delete_from_gallery").addEventListener('click',function (e){
     let options = {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json'
         }
     };
     const response =  fetch('/mygallery/delete-paint/' + modalImg.dataset.id, options);
     Swal.fire({
         title: 'Your paint was successfully deleted',
         showClass: {
             popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
             popup: 'animate__animated animate__fadeOutUp'
         },
         timer: 5000,
         icon: "success"
     })
     modalgallery.style.display = "none";
     location.reload();
 });