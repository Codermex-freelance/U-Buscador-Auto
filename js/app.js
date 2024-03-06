//VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//CONTENDOR PARA LOS RESULTADOS
const resultado = document.querySelector('#resultado');

//const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max - 10

//GENERAR OBJETO CON LA BUSQUEDA
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puerta : '',
    transmision : '',
    color : ''
}

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);//Muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
})

//EVENT LISTENER PARA LOS SELECT DE BUSQUEDA
marca.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});
year.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});
minimo.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});
maximo.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});
puertas.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});
transmision.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});
color.addEventListener('change', e => {
    //console.log(e.target.value);
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

//FUNCIONES
function mostrarAutos(autos){

    limpiarHTML(); //Elimina el HTML previo

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent =`
            ${marca} ${modelo} - ${year} -${puertas} Puertas - Transimision: ${transmision} - Precio: $ ${precio} - Color: ${color}
        `;

        //INSERTAR EN EL HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML
function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//Agrega las opciones de año al select
    }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );//funciones de alto nivel - una funcion llama a otra

    //console.log(resultado);

    if( resultado.length ){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados, Intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;
}