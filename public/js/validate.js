document.getElementById('loginButton').addEventListener('click', function(e)
{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username, password: password})
    }).then(response => {
        if (response.status == 200) {
            window.location = "/";
        }
        else if(response.status == 401){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong password or username'
            });
        }
    });
});
