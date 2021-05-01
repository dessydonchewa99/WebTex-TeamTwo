var save_modal = document.getElementById("save-painting-modal");

// Get the button that opens the modal
var btn = document.getElementById("save_file_button");

var btn_save = document.getElementById("btn-save-painting");

// Get the <span> element that closes the modal
var span = document.getElementById("close-save-modal");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    save_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    save_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == save_modal) {
    save_modal.style.display = "none";
  }
}

btn_save.onclick = function() {
    const canvas = document.getElementById("drawing_canvas");
    const data = canvas.toDataURL();
    document.getElementById("painting-name").value = data;
}