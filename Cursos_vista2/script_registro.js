document.getElementById('registerForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const feedbackMessage = document.getElementById('feedbackMessage');

  // Validaciones personalizadas
  if (!firstName) {
    feedbackMessage.innerText = 'Por favor, ingresa tu nombre';
    return;
  }

  if (!lastName) {
    feedbackMessage.innerText = 'Por favor, ingresa tu apellido';
    return;
  }

  if (!email) {
    feedbackMessage.innerText = 'Por favor, ingresa tu correo electrónico';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    feedbackMessage.innerText = 'Por favor, ingresa un correo electrónico válido';
    return;
  }

  if (!password) {
    feedbackMessage.innerText = 'Por favor, ingresa una contraseña';
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: email,
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      feedbackMessage.innerText = data.error || 'Error al crear el usuario';
    }
  } catch (error) {
    feedbackMessage.innerText = 'Error al conectar con el servidor';
  }
});
