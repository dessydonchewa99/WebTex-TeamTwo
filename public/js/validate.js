function validate()
{
    const username = document.loginform.username.value;
    const password = document.loginform.password.value;

    const resp = fetch('/login').then(response => response.text())
        .then(data => {
            if (data.content === undefined) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong password or username'

                })
            }
        });
}
