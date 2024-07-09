document.addEventListener('DOMContentLoaded', () => {
    const courseGrid = document.getElementById('course-grid');
    const apiURL = 'http://localhost:8000/api/cursos/';

    function createCourseHTML(course) {
        return `
            <div class="course-card">
                <img src="${course.imagen}" alt="${course.nombre}">
                <div class="course-info">
                    <h2>${course.nombre}</h2>
                    <p>${course.descripcion}</p>
                    <div class="actions">
                        <a href="editarCurso.html?id=${course.id}">editar</a>
                        <a href="#" onclick="eliminarCurso(${course.id})">eliminar</a>
                    </div>
                </div>
            </div>
        `;
    }

    function loadCourses() {
        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log data to verify the response
                courseGrid.innerHTML = '';
                data.forEach(course => {
                    courseGrid.innerHTML += createCourseHTML(course);
                });
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    window.eliminarCurso = function(courseId) {
        const deleteURL = `${apiURL}${courseId}/`;
        fetch(deleteURL, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            loadCourses();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
    };

    loadCourses();
});
