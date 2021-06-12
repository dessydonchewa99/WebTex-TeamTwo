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
document.getElementById('edit_painting')?.addEventListener('click', function(e){
    window.location = '/edit-paint?id='+ modalImg.dataset.id;
});

 document.getElementById("delete_from_gallery")?.addEventListener('click',function (e){
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

document.getElementById("back").addEventListener('click',function (e){
    window.location = '/';
})

document.getElementById("my_gallery").addEventListener('click',function (e){
    window.location = '/mygallery';
})

document.getElementById("public_gallery").addEventListener('click',function (e){
    window.location = '/public_gallery';
})

document.addEventListener('DOMContentLoaded', function(e){
    
    var images_container = document.getElementById("gallery");
    var images = images_container.getElementsByTagName("img");
    document.getElementsByClassName("pagination")[0].style.display = 'inline-block';
    
    
    var images_count = images.length;
    var hidePages = Math.ceil(images_count / 18);

    var pages = document.getElementsByClassName("page");
    for (let i = hidePages; i < 6; i++) {
        pages[i].style.display = 'none';
    }

    var page = document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerHTML;
    var start_form = (page - 1) * 18;                   //18 for regular 15.6 screen.

    for(let i = 0; i < 18 && start_form <= images_count; i++)
    {
        const currentImg = images[start_form];
        fetch('/get-paint?id=' + currentImg.dataset.id)
            .then(x => x.json())
            .then(result => {
                currentImg.src = result.content.data;
            });
        currentImg.style.display = 'inline';
        start_form++;
    }

});

function switchPage(e) {
    var last_page = document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0];
        last_page.classList.remove("active");

        e.currentTarget.className += " active";      
        var images_container = document.getElementById("gallery");
        var images = images_container.getElementsByTagName("img");
        
        var images_count = images.length;

        for (let i = 0; i < images_count; i++) {
            
            images[i].style.display = 'none';
        }
    
        var page = document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerHTML;
        var start_form = (page - 1) * 18;                   //18 for regular 15.6 screen.
    
        for(let i = 0; i < 18 && start_form < images_count; i++)
        {
            const currentImg = images[start_form];
            
            fetch('/get-paint?id=' + currentImg.dataset.id)
                .then(x => x.json())
                .then(result => {
                    currentImg.src = result.content.data;
                });
            currentImg.style.display = 'inline';
            start_form++;
        }
}

for (let i = 0; i < 6; i++) {
    
    document.getElementsByClassName("page")[i].addEventListener("click", switchPage);
    
}
const footer = document.getElementsByTagName('footer')[0];

window.addEventListener('resize', function(event) {
    footer.style.display = 'none';
});