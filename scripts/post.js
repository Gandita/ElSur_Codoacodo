let botonCrear = document.querySelector("#b_enviar");

botonCrear.addEventListener('click', () => {
    let valores_formulario = {
        titulo: document.querySelector("input#titulo").value,
        autor:  document.querySelector("input#autor").value,
        generos: document.querySelector("input#generos").value,
        cover:  document.querySelector("input#cover").value,
        sinopsis: document.querySelector("input#sinopsis").value,
        epub:  document.querySelector("input#epub").value,
        pdf: document.querySelector("input#pdf").value
    }

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(valores_formulario),  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
};

fetch("http://127.0.0.1:5000/api/libros/create/", options)
.then(response => response.json())
.then(data_response => {
    callback(data_response);
})
.catch(error => console.log("Ocurrió un error! " + error));
})