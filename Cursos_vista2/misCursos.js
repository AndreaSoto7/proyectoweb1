document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('mis-cursos');
    const apiURL = 'http://localhost:8000/api/cursos/';

    function createCourseHTML(course) {
        return `
            <div class="course-card">
                <img src="${course.imagen}" alt="${course.nombre}">
                <h3>Clase  </h3>
                <p>${course.nombre}</p>
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
