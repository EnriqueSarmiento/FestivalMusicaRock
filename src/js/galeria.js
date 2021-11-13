document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for( let i = 1; i <= 12; i++ ){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; //crear atributos en html personalizados. 

        //anadir la funcion mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);

    }
}

function mostrarImagen(e) {

    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');
    imagen.src= `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //cuando se da click en otro lado de la imagen
    overlay.onclick = function () {
        overlay.remove();
    }

    //cuando se precioa se cierra la imagen 
    cerrarImagen.onclick = function(){
        overlay.remove();
    }


    overlay.appendChild(cerrarImagen);

    //mostrar en el html

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}