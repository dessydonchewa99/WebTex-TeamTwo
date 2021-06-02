function validate()
{
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
