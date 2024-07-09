document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:8000/api/';
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    function loadCourseDetails(courseId) {
        fetch(`${apiURL}cursos/${courseId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(course => {
                document.getElementById('course-title').textContent = course.nombre;
                document.getElementById('course-image').src = course.imagen;
                document.getElementById('course-description').textContent = course.descripcion;

                // Cargar lecciones del curso
                loadCourseLessons(courseId);
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    function loadCourseLessons(courseId) {
        fetch(`${apiURL}lecciones/${courseId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(lessons => {
                const lessonList = document.getElementById('lesson-list');
                lessonList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas lecciones
                lessons.forEach(lesson => {
                    lessonList.innerHTML += `
                        <div class="lesson-item">
                            <img src="${lesson.imagen}" alt="${lesson.nombre}">
                            <div class="lesson-info">
                                <h3>${lesson.nombre}</h3>
                                <p>${lesson.tipo_leccion}</p>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    if (courseId) {
        loadCourseDetails(courseId);
    } else {
        console.error('No course ID found in URL');
    }
});
