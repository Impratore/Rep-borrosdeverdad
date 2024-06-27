document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');
  form.addEventListener('input', function(event) {
      validateField(event.target);
  });
});

function validateForm() {
  const rut = document.getElementById('rut');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  let isValid = true;
  isValid &= validateField(rut);
  isValid &= validateField(username);
  isValid &= validateField(email);
  isValid &= validateField(password);

  return isValid;
}

function validateField(field) {
  const value = field.value;
  let errorMessage = '';

  switch (field.id) {
      case 'rut':
          if (!validateRUT(value)) {
              errorMessage = 'RUT inválido. Por favor, ingrese un RUT válido.';
          }
          break;
      case 'username':
          if (value.length < 3) {
              errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres.';
          }
          break;
      case 'email':
          if (!validateEmail(value)) {
              errorMessage = 'Correo electrónico inválido. Por favor, ingrese un correo electrónico válido.';
          }
          break;
      case 'password':
          errorMessage = validatePassword(value);
          break;
  }

  const errorElement = field.nextElementSibling;
  if (errorMessage) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
      return false;
  } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      return true;
  }
}

function validateRUT(rut) {
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  if (rut.length < 8 || rut.length > 9) return false;

  const body = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = body.length - 1; i >= 0; i--) {
      suma += multiplo * body.charAt(i);
      multiplo = multiplo == 7 ? 2 : multiplo + 1;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado == 11 ? '0' : dvEsperado == 10 ? 'K' : dvEsperado.toString();

  return dvEsperado === dv;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
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
