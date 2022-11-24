/* Constantes útiles */
const lista_productos = ['harina', 'levadura_fresca', 'levadura_seca', 'aceite', 'sal'];

/* Precios productos */
const precios = {
    'harina' : 300,
    'levadura_fresca' : 20,
    'levadura_seca' : 10,
    'sal' : 10,
    'aceite' : 500,
}

/* Unidades de los productos en gramos */
const unidades  = {
    'harina' : 1000,
    'levadura_fresca' : 50,
    'levadura_seca' : 10,
    'sal' : 200,
    'aceite' : 500,
}

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

        console.log("\nTOTALES PRODUCTOS:");
        for (const prod of cantidades_totales) {
            console.log(`${prod.tipo}: ${prod.cantidad}gs \t $${prod.calcular_precio()}(envases de ${prod.peso_unidad}gs)`);
        }
        console.log(`\nTOTAL: $${precio_total[0]}`);
        console.log(`IVA: $${precio_total[1]}`);
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
        
    let cantidad_masa = datos_masa.numero_pizzas * datos_masa.peso_pizza;

    /* Cantidad_masa =   cantidad_harina + 
                        (cantidad_harina * hidratacion) + 
                        (cantidad_harina * porcentaje_sal) +     
                        (cantidad_harina * porcentaje_levadura) +
                        (cantidad_harina * porcentaje_aceite)     */

    let cantidad_harina = cantidad_masa / (1 + datos_masa.hidratacion + porcentaje_aceite + porcentaje_levadura + porcentaje_aceite);
    
    let cantidad_agua = Math.round(cantidad_harina * datos_masa.hidratacion);
    let cantidad_sal = Math.round(cantidad_harina * porcentaje_sal);
    let cantidad_levadura = Math.round(cantidad_harina * porcentaje_levadura);
    let cantidad_aceite = Math.round(cantidad_harina * porcentaje_aceite);
    cantidad_harina = Math.round(cantidad_harina);

    return new ingredientes(cantidad_harina, cantidad_agua, cantidad_sal, cantidad_levadura, cantidad_aceite, tipo_levadura);
}

function mostrar_informacion(cantidades_ingredientes){
    console.log(`\nCantidad de harina: ${cantidades_ingredientes.harina.cantidad}gs`);
    console.log(`Cantidad de agua: ${cantidades_ingredientes.agua}gs`);
    console.log(`Cantidad de sal: ${cantidades_ingredientes.sal.cantidad}gs`);
    console.log(`Cantidad de levadura: ${cantidades_ingredientes.levadura.cantidad}gs`);
    if (cantidades_ingredientes.aceite.cantidad > 0 ){
        console.log(`Cantidad de aceite: ${cantidades_ingredientes.aceite.cantidad}gs`);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    let carro_compra = new Carrito();
})

let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submited');
    let inputs_formulario = document.getElementsByClassName('calculadora_input');
    let datos_masa = obtener_datos(inputs_formulario);
    for (const inp of inputs_formulario){
        console.log(inp.name);
        console.log(inp.value);
    }

    let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
    for (const ingr in cantidades_ingredientes){
        console.log(cantidades_ingredientes[ingr]);
    }
});


/* 
do {
    let datos_masa = obtener_datos();
    let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
    carro_compra.agregar_ingredientes(cantidades_ingredientes);
    mostrar_informacion(cantidades_ingredientes);
} while (confirm("¿Desea calcular nuevamente?"));
carro_compra.mostrar_totales_compra(); */