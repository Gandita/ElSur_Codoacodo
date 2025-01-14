const cardcontainer = document.getElementById('cardcontainer');

//await fetch('https://cinthyadirisio.github.io/ElSur_Codoacodo/assets/json/ebooks.json')
async function getebooks() {
    await fetch('http://127.0.0.1:5000/api/libros/disponibles/')
        .then(response => response.json())
        .then(data => {
            ebookList = data
            let generos = sacarGeneros(ebookList)
            console.log(ebookList)
            console.log(generos)
            // console.log(pintarGenerosIndex(generos));
            console.log(pintarTarjetas(ebookList, cardcontainer));

        }).catch(err => console.error(err))
} getebooks()


function sacarGeneros(array) {
    return [...new Set((array.map(item => item.generos).flat()))]
}

function pintarGenerosIndex(array, container) {
    container.innerHTML = ''
    let fragmento = document.createDocumentFragment()
    array.forEach(elemento => {
        let badge = document.createElement('span')
        badge.classList = 'etiqueta'
        badge.innerHTML = elemento
        fragmento.appendChild(badge)
    })
    container.appendChild(fragmento)
}

function pintarTarjetas(array, container) {
    container.innerHTML = ''
    let fragmento = document.createDocumentFragment()
    array.forEach(elemento => {
        let div = document.createElement('div')
        div.classList = 'tarjeta'
        div.innerHTML = `
            <img src=${elemento.cover} alt=${elemento.titulo}>
            <div class="textotarjeta">
                <h5>${elemento.titulo}</h5>
                <h6>${elemento.autor}</h6>
                <div class="contenedor">
                    ${elemento.generos.map(item => `<span class="etiqueta">${item}</span>`).join(' ')}
                </div>
                <div>
                
                    <a href="./detalles.html?id=${elemento.id}" class="botoncito">Detalles</a>
                </div>
            </div>`
        fragmento.appendChild(div)
    })
    let div = document.createElement('div')
    div.classList = 'tarjeta'
    div.innerHTML = `
        <a href="./agregar_libro.html" class="botoncito">AGREGAR LIBRO</a>`
    fragmento.appendChild(div)
    container.appendChild(fragmento)
}