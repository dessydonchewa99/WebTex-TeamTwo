function submitRegister(e)  {
    const username = document.getElementById('usernameField').value;
    const email = document.getElementById('emailField').value;
    const password = document.getElementById('passwordField').value;
    const confirmPassword = document.getElementById('confirmPasswordField').value;
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username, email:email, password: password, confirmPassword: confirmPassword})
    }).then(async (response) => {
        if (response.status == 200) {
            window.location = "/";
        }
        else if(response.status == 401){
            const result = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result
            });
        }
    });
}

document.getElementById('register-button').addEventListener('click', submitRegister);
document.getElementById('register-form').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitRegister();
    }
});