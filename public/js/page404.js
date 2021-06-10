Swal.fire({
    title: 'PAGE NOT FOUND',
    text: 'Please return to homepage.',
    icon: 'warning',
    width: 800,
    padding: '3em',
    backdrop: `
    rgba(255, 0, 0, 0.4)
    url("/images/brush.gif")
    left top
    no-repeat
  `
}).then((result) => {
    if (result.isConfirmed) {
        window.location = '/';
    }
})