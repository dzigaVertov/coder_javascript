import {lista_productos, precios, unidades} from "./stock.js";

class Carrito {
    constructor(){
        this.productos = [];
        
    }    

    agregar_ingredientes(ingredientes){
        for (const ingr in ingredientes){
            if (ingredientes[ingr] instanceof Producto){
                this.productos.push(ingredientes[ingr]);
            }
            
        }
    }

    static reconstruir_carrito_storage(productos){
        let carrito_reconstruido = new Carrito();
        if(productos.productos){
            carrito_reconstruido.productos = productos.productos;
        }
        
        return carrito_reconstruido;
    }

    calcular_totales_compra() {
        let cantidades_totales = [];
        
        for (const prod of lista_productos) {
            let pedido_total_producto = this.productos.filter(a => a.tipo === prod);
            let cantidad_total_producto = pedido_total_producto.reduce((accum, pedido) => pedido.cantidad + accum, 0);
            
            if (cantidad_total_producto > 0){
                let total_producto_pedido = new Producto(cantidad_total_producto, precios[prod], unidades[prod], prod);
                cantidades_totales.push(total_producto_pedido);
            }
            
        }

        return cantidades_totales;
    }

    calcular_precio_compra() {
                
        let cantidades_totales = this.calcular_totales_compra();        

        let precio_total = cantidades_totales.reduce((accum, prod) => prod.calcular_precio() + accum, 0);

        let iva = (precio_total * 0.21).toFixed(2);

        return [precio_total, iva];
    }

    mostrar_totales_compra(){
        let precio_total = this.calcular_precio_compra();
        let precio_con_iva = (parseFloat(precio_total[0]) + parseFloat(precio_total[1])).toFixed(2);
        let cantidades_totales = this.calcular_totales_compra();

        let cont_totales = document.getElementById('contenedor_totales');
        for (const prod of cantidades_totales) {
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `<h3>${prod.tipo}:</h3> 
                            <h3>${prod.cantidad}gs (envases de ${prod.peso_unidad}gs)</h3>
                            <h3>$${prod.calcular_precio()}</h3>`;
            cont_totales.appendChild(div);
        }

        let totales = document.createElement('div');
        totales.classList.add('card');
        totales.innerHTML = `<h3>TOTAL: </h3> <h3>$${precio_total[0]}</h3>`;
        cont_totales.appendChild(totales);

        totales = document.createElement('div');
        totales.classList.add('card');
        totales.innerHTML = `<h3>IVA: </h3> <h3>$${precio_total[1]}</h3>`;
        cont_totales.appendChild(totales);

        totales = document.createElement('div');
        totales.classList.add('card');
        totales.innerHTML = `<h3>TOTAL + IVA: </h3> <h3>$${precio_con_iva}</h3>`;
        cont_totales.appendChild(totales);
        

        console.log(`TOTAL + IVA: $${precio_con_iva}`);
    }
}

class Producto {
    constructor(cantidad, precio_unidad, peso_unidad, tipo){
        this.cantidad = cantidad;
        this.precio_unidad = precio_unidad;
        this.peso_unidad = peso_unidad;
        this.tipo = tipo;
    }

    calcular_precio(){
        let unidades = Math.ceil(this.cantidad / this.peso_unidad);
        return unidades * this.precio_unidad;
    }
}

/* Calcula los ingredientes para la masa de pizza */
function masa(tipo, numero_pizzas, hidratacion, levadura, peso_pizza){
    this.tipo = tipo;
    this.numero_pizzas = numero_pizzas;
    this.hidratacion = hidratacion;
    this.levadura = levadura;
    this.peso_pizza = peso_pizza;
}

function ingredientes(harina, agua, sal, levadura, aceite, tipo_levadura){
    this.harina = new Producto(harina, precios.harina, unidades.harina, 'harina');
    this.agua = agua;
    this.sal = new Producto(sal, precios.sal, unidades.sal, 'sal');
    this.levadura = new Producto(levadura, precios[tipo_levadura], unidades[tipo_levadura], tipo_levadura);
    this.aceite = new Producto(aceite, precios.aceite, unidades.aceite, 'aceite');
}

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
    
    /* let tipo = 0;
    do {
        tipo = parseInt(prompt("Ingrese tipo de pizza 1 = Napolitana 2 = New York")); /* 1=napolitana 2=New york  
    } while (!validar_tipo_pizza(tipo));

    let numero_pizzas = 0;
    do {
        numero_pizzas = parseInt(prompt("Ingrese número de pizzas"));        
    } while (!validar_numero_pizzas(numero_pizzas));
    
    let hidratacion = 0;
    do {
        hidratacion = parseInt(prompt("Ingrese porcentaje de hidratacion (1 a 100)"));
    } while (!validar_hidratacion(hidratacion));
    hidratacion = hidratacion/100;

    let levadura = 0;
    do {
        levadura = parseInt(prompt("Ingrese tipo de levadura 1 = fresca 2 = seca")); /* 1=levadura fresca 2=levadura seca 
    } while (!validar_levadura(levadura));

    let peso_pizza = 0;
    do {
        peso_pizza = parseInt(prompt("Ingrese peso deseado de cada pizza en gramos"));
    } while (!validar_peso(peso_pizza));
     */

    /* Inputs validados */
    
    return new masa(inputs_formulario.estilo.value, 
        inputs_formulario.numero_de_pizzas.value, 
        inputs_formulario.hidratacion.value, 
        inputs_formulario.levadura.value,
        inputs_formulario.gramos.value);
}

function calcular_cantidad_ingredientes(datos_masa){
    
    const porcentaje_sal = 0.02;
    const porcentaje_levadura = (datos_masa.levadura === 'fresca' ) ? 0.01 : 0.0033; /* fresca = 1% seca= 0,3% */
    const porcentaje_aceite = (datos_masa.tipo === 2) ? 0.01 : 0.0; /* 1=napolitana 2=New york  */
    const tipo_levadura = (datos_masa.levadura === 'fresca') ? 'levadura_fresca' : 'levadura_seca';
    const hidratacion = datos_masa.hidratacion / 100;  
    let cantidad_masa = datos_masa.numero_pizzas * datos_masa.peso_pizza;

    /* Cantidad_masa =   cantidad_harina + 
                        (cantidad_harina * hidratacion) + 
                        (cantidad_harina * porcentaje_sal) +     
                        (cantidad_harina * porcentaje_levadura) +
                        (cantidad_harina * porcentaje_aceite)     */

    let cantidad_harina = cantidad_masa / (1 + hidratacion + porcentaje_aceite + porcentaje_levadura + porcentaje_aceite);
    
    let cantidad_agua = Math.round(cantidad_harina * hidratacion);
    let cantidad_sal = Math.round(cantidad_harina * porcentaje_sal);
    let cantidad_levadura = Math.round(cantidad_harina * porcentaje_levadura);
    let cantidad_aceite = Math.round(cantidad_harina * porcentaje_aceite);
    cantidad_harina = Math.round(cantidad_harina);

    return new ingredientes(cantidad_harina, cantidad_agua, cantidad_sal, cantidad_levadura, cantidad_aceite, tipo_levadura);
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

if(location.href.includes('index')){
    let formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let inputs_formulario = document.getElementsByClassName('calculadora_input');
        let datos_masa = obtener_datos(inputs_formulario);
        
        let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
        llenar_ingredientes(cantidades_ingredientes);
        let ventana_receta = document.getElementById('contenedor_receta');
        ventana_receta.classList.toggle('modal_toggle');
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
    })

    let btn_agregar_carrito = document.getElementById('btn_agregar_carrito');
    btn_agregar_carrito.addEventListener('click', (event) => {
        let ingredientes_receta_actual = recuperar_receta_actual_storage();
        let carrito = Carrito.reconstruir_carrito_storage(JSON.parse(localStorage.getItem('carrito')));
        carrito.agregar_ingredientes(ingredientes_receta_actual);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(carrito);
    })


}

/* 
do {
    let datos_masa = obtener_datos();
    let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
    carro_compra.agregar_ingredientes(cantidades_ingredientes);
    mostrar_informacion(cantidades_ingredientes);
} while (confirm("¿Desea calcular nuevamente?"));
carro_compra.mostrar_totales_compra(); */

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