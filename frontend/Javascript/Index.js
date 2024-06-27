document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    form.addEventListener('input', function(event) {
        validateField(event.target);
    });
});

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Aquí podrías implementar la lógica para guardar el usuario si está marcado "Recordarme"
    // Por ejemplo, usando cookies o localStorage

    // Ejemplo usando localStorage
    if (rememberMe) {
        localStorage.setItem('username', username);
    } else {
        localStorage.removeItem('username');
    }

    // Enviar la solicitud de inicio de sesión
    // Nota: este es solo un ejemplo y necesita un servidor para funcionar correctamente
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Error al iniciar sesión');
        }
    });

    return false;
}

function validateField(field) {
    const value = field.value;
    let errorMessage = '';

    switch (field.id) {
        case 'username':
            if (value.length < 3) {
                errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres.';
            }
            break;
        case 'password':
            errorMessage = validatePassword(value);
            break;
    }

    const errorElement = field.nextElementSibling;
    if (errorMessage) {
        field.classList.add('invalid');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        return false;
    } else {
        field.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }
}

function validatePassword(password) {
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres.';
    }

    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;

    if (!hasNumber.test(password)) {
        return 'La contraseña debe tener al menos un número.';
    }

    if (!hasUpperCase.test(password)) {
        return 'La contraseña debe tener al menos una letra mayúscula.';
    }

    return '';
}
