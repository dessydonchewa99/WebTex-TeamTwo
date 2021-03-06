/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 200;
  const maxHeight = window.innerHeight;
  const maxWidth = window.innerWidth;

  //top and right borders for resizing
  const line = document.getElementById('borderLine');
  const footer = document.getElementById('footer');
  const maxheightLine = line.getBoundingClientRect();
  const footerUpperLine = footer.getBoundingClientRect();
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if(e.pageY < maxheightLine.y + 10)
      {
        stopResize();
        return;
      }
      if(e.pageY > footerUpperLine.y && (currentResizer.classList.contains('bottom-right') || currentResizer.classList.contains('bottom-left')))
      {
        footer.style.display = 'none';
      }
      if(e.pageY < footerUpperLine.y && (currentResizer.classList.contains('bottom-right') || currentResizer.classList.contains('bottom-left')))
      {
        footer.style.display = 'block';
      }
      //if we resize more than maxHeight or maxWidth - we set it to maxHeight/maxWidth. And if we try to resize less than minimum - we don't resize
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if(height > maxHeight)
        {
            element.style.height = maxHeight + 'px'
        }
        if(width > maxWidth)
        {
            element.style.width = maxWidth + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if(height > maxHeight)
        {
            element.style.height = maxHeight + 'px'
        }
        if(width > maxWidth)
        {
            element.style.width = maxWidth + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y -20 + (e.pageY - original_mouse_y) + 'px'
        }
        if(height > maxHeight)
        {
            element.style.height = maxHeight + 'px'
        }
        if(width > maxWidth)
        {
            element.style.width = maxWidth + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}

makeResizableDiv('.resizable')

//hide multi-select when radio is public

function handle_change(radio) {
  const multi_select = document.getElementById("users-select");
  if(radio.value === "private")
  {
    multi_select.style.display = "block";
  }
  else{
    multi_select.style.display = "none";
  }
}

//when resizing - hiding footer because the canvas gets behind the footer
const footer = document.getElementsByTagName('footer')[0];

window.addEventListener('resize', function(event) {
    footer.style.display = 'none';
});