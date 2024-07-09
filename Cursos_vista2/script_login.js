document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username) {
    alert('Por favor, ingresa tu nombre de usuario');
    return;
  }

  if (!password) {
    alert('Por favor, ingresa tu contraseña');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('jwt_token', data.access);
      
      if (username === 'admin@gmail.com' && password === '123') {
        window.location.href = 'administradorCurso.html';
      } else {
        window.location.href = 'pagPrincipalR.html';
      }
    } else {
      alert('Credenciales incorrectas');
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
  }
});
