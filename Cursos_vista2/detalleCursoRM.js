document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:8000/api/';
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const userId = localStorage.getItem('user_id'); // Assuming user ID is stored in local storage after login

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

                // Load course lessons
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
                lessonList.innerHTML = ''; // Clear the list before adding new lessons
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

    async function enrollInCourse(userId, courseId) {
        const token = localStorage.getItem('jwt_token'); // Retrieve the stored token
        try {
            const response = await fetch(`${apiURL}matriculacion/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in headers
                },
                body: JSON.stringify({
                    idUser: userId,
                    idCurso: courseId
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Matriculación exitosa:', data);
            alert('Te has matriculado exitosamente en el curso');
            window.location.href = 'detalleCursoRM.html?id=' + courseId; // Redirect to the new view
        } catch (error) {
            console.error('Hubo un problema con la solicitud fetch:', error);
            alert('Hubo un problema con la matriculación.');
        }
    }

    document.querySelector('.btn-matricularse').addEventListener('click', () => {
        if (userId && courseId) {
            enrollInCourse(userId, courseId);
        } else {
            console.error('No user ID or course ID found');
        }
    });

    if (courseId) {
        loadCourseDetails(courseId);
    } else {
        console.error('No course ID found in URL');
    }
});
