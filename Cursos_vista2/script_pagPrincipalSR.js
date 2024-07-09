document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const apiURL = 'http://localhost:8000/api/cursos/';

    function createCourseHTML(course) {
        return `
            <div class="course-item">
                <img src="${course.imagen}" alt="${course.nombre}">
                <h3>${course.nombre}</h3>
                <p>${course.descripcion}</p>
                <button class="btn-inf" onclick="location.href='detalleCursoNR.html?id=${course.id}'">Más información</button>
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
                courseList.innerHTML = '';
                data.forEach(course => {
                    courseList.innerHTML += createCourseHTML(course);
                });
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    loadCourses();
});
