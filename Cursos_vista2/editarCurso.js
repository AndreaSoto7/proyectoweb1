document.addEventListener('DOMContentLoaded', () => {
    const addLessonButton = document.querySelector('.add-lesson');
    const lessonsContainer = document.querySelector('.lessons');

    addLessonButton.addEventListener('click', () => {
        const lessonCount = document.querySelectorAll('.lesson').length + 1;
        const lessonHTML = `
            <div class="lesson">
                <h3>LECCION ${lessonCount}</h3>
                <div class="upload-video">
                    <label for="upload-video-${lessonCount}"><i class="fa fa-upload"></i> Subir video de Lección</label>
                    <input type="file" id="upload-video-${lessonCount}">
                    <a href="#" class="delete" onclick="eliminarLeccion(this)">Eliminar</a>
                </div>
                <textarea placeholder="Descripción"></textarea>
            </div>
        `;
        lessonsContainer.insertAdjacentHTML('beforeend', lessonHTML);
    });
});

function eliminarLeccion(element) {
    element.parentElement.parentElement.remove();
}

function guardarCurso() {
    const apiURL = 'http://localhost:8000/api/cursos/';
    const courseName = document.getElementById('course-name').value;
    const courseDescription = document.getElementById('course-description').value;
    const courseImage = document.getElementById('upload-image').files[0];

    const lessons = [];
    document.querySelectorAll('.lesson').forEach((lessonElement, index) => {
        const lessonDescription = lessonElement.querySelector('textarea').value;
        const lessonVideo = lessonElement.querySelector('input[type="file"]').files[0];
        lessons.push({
            descripcion: lessonDescription,
            video: lessonVideo
        });
    });

    const formData = new FormData();
    formData.append('nombre', courseName);
    formData.append('descripcion', courseDescription);
    formData.append('imagen', courseImage);
    lessons.forEach((lesson, index) => {
        formData.append(`lecciones[${index}][descripcion]`, lesson.descripcion);
        formData.append(`lecciones[${index}][video]`, lesson.video);
    });

    fetch(apiURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Curso creado:', data);
        location.href = 'administradorCurso.html';
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}
