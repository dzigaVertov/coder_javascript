import {lista_productos, precios, unidades} from "./stock.js";
import { masa, ingredientes, calcular_cantidad_ingredientes } from "./ingredientes_masa.js";
import { Carrito } from "./carro.js";



function validar_tipo_pizza(tipo){
    if (Number.isInteger(tipo) && (tipo === 1 || tipo ===2)){
        return true;
    } else {
        alert("Debe ingresar 1 o 2");
        return false;
    }
    
}

function validar_numero_pizzas(numero_pizzas){
    if (Number.isInteger(numero_pizzas) && (numero_pizzas > 0)){
        return true;
    } else {
        alert("Debe ingresar un número de pizzas.");
        return false;
    }
}

function validar_hidratacion(hidratacion){
    if (Number.isInteger(hidratacion) && (hidratacion > 0) && (hidratacion <=100)){
        return true;
    } else {
        alert("Debe ingresar un % entre 1 y 100");
        return false;
    }
}

function validar_levadura(levadura){
    if (levadura === 1 || levadura === 2){ /* 1=levadura fresca 2=levadura seca */
        return true;
    } else {
        alert("Debe ingresar 1 o 2");
        return false;
    }
}

function validar_peso(peso_pizza){
    if (Number.isInteger(peso_pizza) && peso_pizza > 0){
        return true;
    } else {
        alert("Debe ingresar peso en gramos");
        return false;
    }
}

function obtener_datos(inputs_formulario) {
    
    return new masa(inputs_formulario.estilo.value, 
        inputs_formulario.numero_de_pizzas.value, 
        inputs_formulario.hidratacion.value, 
        inputs_formulario.levadura.value,
        inputs_formulario.gramos.value);
}


document.addEventListener('DOMContentLoaded', ()=> {
    /* localStorage.clear(); */
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (!carrito){
        carrito = new Carrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    carrito = Carrito.reconstruir_carrito_storage(carrito);

    if(location.href.includes('carro')){
        carrito.mostrar_totales_compra();
    }

    
})


/* Para cerrar modal clickeando fuera de la ventana */
let body = document.body;
function cerrar_modal_click_afuera(evento){
    let ventana_receta = document.getElementById('contenedor_receta');
    if(ventana_receta.classList.contains('modal_toggle') && !(evento.target.closest('.modal_receta'))){
        ventana_receta.classList.toggle('modal_toggle');
        quitarListener();
    }
}

function quitarListener() {
    body.removeEventListener('click', cerrar_modal_click_afuera);
}


if(location.href.includes('calculadora')){
    let formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let inputs_formulario = document.getElementsByClassName('calculadora_input');
        let datos_masa = obtener_datos(inputs_formulario);
        
        let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
        llenar_ingredientes(cantidades_ingredientes);
        let ventana_receta = document.getElementById('contenedor_receta');
        ventana_receta.classList.toggle('modal_toggle');

        

        body.addEventListener('click', cerrar_modal_click_afuera);
    });

    const llenar_ingredientes = (cantidades_ingredientes) => {
        let lista_ingredientes = document.getElementById('lista_ingredientes');

        /* Quitar receta anterior del storage */
        localStorage.removeItem('receta_actual');
        /* Agregar nueva receta al storage */
        localStorage.setItem('receta_actual', JSON.stringify(cantidades_ingredientes) );

        
        /* Quitar la receta anterior, si la hubiere */
        lista_ingredientes.querySelectorAll('div.ingrediente').forEach( x => lista_ingredientes.removeChild(x));
        
        for (const ingr in cantidades_ingredientes){

            let cantidad = (ingr === 'agua') ? cantidades_ingredientes[ingr] : cantidades_ingredientes[ingr].cantidad;

            if(cantidad > 0) {
                const div = document.createElement('div');
                div.classList.add('ingrediente');
                if(ingr === 'agua'){
                    div.innerHTML += `<h3>${ingr}</h3><h3>${cantidades_ingredientes[ingr]} gs</h3>`;
                } else {
                    div.innerHTML += `<h3>${ingr}</h3><h3>${cantidades_ingredientes[ingr].cantidad} gs</h3>`;
                }
            
                lista_ingredientes.appendChild(div);
            }        
        }
    }

    let btn_cerrar_modal = document.getElementById('btn_cerrar');
    btn_cerrar_modal.addEventListener('click', (event) => {
        let ventana_receta = document.getElementById('contenedor_receta');
        ventana_receta.classList.toggle('modal_toggle');
        document.body.removeEventListener('click', cerrar_modal_click_afuera);
    })

    let btn_agregar_carrito = document.getElementById('btn_agregar_carrito');
    btn_agregar_carrito.addEventListener('click', (event) => {
        let ingredientes_receta_actual = recuperar_receta_actual_storage();
        let carrito = Carrito.reconstruir_carrito_storage(JSON.parse(localStorage.getItem('carrito')));
        carrito.agregar_ingredientes(ingredientes_receta_actual);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        toastr.info('Los ingredientes se agregaron al carrito de compra');
    })


}

function recuperar_receta_actual_storage(){
    let receta_actual = JSON.parse(localStorage.getItem('receta_actual'));
    let harina = receta_actual.harina.cantidad;
    let agua = receta_actual.agua;
    let sal = receta_actual.sal.cantidad;
    let levadura = receta_actual.levadura.cantidad;
    let aceite = receta_actual.aceite.cantidad;
    let tipo_levadura = receta_actual.levadura.tipo;

    return new ingredientes(harina, agua, sal, levadura, aceite, tipo_levadura);
}

let btn_vaciar_carrito = document.getElementById('btn_vaciar_carrito');
if (btn_vaciar_carrito){
    btn_vaciar_carrito.addEventListener('click', event => {
        let carrito = new Carrito();
        localStorage.setItem('carrito', JSON.stringify('carrito'));
        carrito.mostrar_totales_compra();
        location.reload();
    })
}

