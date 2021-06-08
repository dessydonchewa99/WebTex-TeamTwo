const modalgallery = document.getElementById("myModal");
const modalImg = document.getElementById("img01");

document.getElementById('gallery').addEventListener('click', function(e) {
    if(e.target.tagName == 'IMG') {
        modalImg.setAttribute('data-id', e.target.dataset.id)
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
    window.location = '/edit-paint?id='+ modalImg.dataset.id;
}

 document.getElementById("delete_from_gallery").addEventListener('click',function (e){
     let options = {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json'
         }
     };
     fetch('/delete-paint/' + modalImg.dataset.id, options).then(response => {
        if (response.status == 200) {
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
            }).then(() => {
                modalgallery.style.display = "none";
                location.reload();
            });
            
        }
     });
 });
document.getElementById("title_paint").addEventListener('click',function (e){
    window.location = '/';
})
document.getElementById("title_paint").addEventListener('mouseover',function (e){
    document.getElementById("title_paint").style.cursor = "pointer";
})