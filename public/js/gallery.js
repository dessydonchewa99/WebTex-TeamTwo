
async function load_gallery() {
    resp = await fetch("js/paintings.json");
    paintings = await resp.json();
    const new_paintings = paintings.map(p => {
        return `<img src="${p.content}" width="${p.width}" height="${p.height}" />`
    });
    new_paintings.forEach(element => {
        document.getElementById("gallery").innerHTML += element
    });
}

document.addEventListener("DOMContentLoaded", function() {
    load_gallery();
  });