async function fetchCursos() {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      const listaCursos = document.getElementById('lista-cursos');
      listaCursos.innerHTML = '';
      data.forEach(curso => {
        const cursoElement = document.createElement('div');
        cursoElement.innerHTML = `
          <h2>${curso.nombre}</h2>
          <p>${curso.descripcion}</p>
          <img src="${curso.imagen}" alt="Imagen del curso">
        `;
        listaCursos.appendChild(cursoElement);
      });
    } else {
      alert('Error al cargar los cursos');
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
  }
}

document.getElementById('cerrar-sesion').addEventListener('click', function () {
  localStorage.removeItem('jwt_token');
  window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', fetchCursos);
