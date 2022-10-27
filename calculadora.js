/* Calcula los ingredientes para la masa de pizza */

function masa(tipo, numero_pizzas, hidratacion, levadura, peso_pizza){
    this.tipo = tipo;
    this.numero_pizzas = numero_pizzas;
    this.hidratacion = hidratacion;
    this.levadura = levadura;
    this.peso_pizza = peso_pizza;
}

function ingredientes(harina, agua, sal, levadura, aceite){
    this.harina = harina;
    this.agua = agua;
    this.sal = sal;
    this.levadura = levadura;
    this.aceite = aceite;
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

function obtener_datos() {
    
    let tipo = 0;
    do {
        tipo = parseInt(prompt("Ingrese tipo de pizza 1 = Napolitana 2 = New York")); /* 1=napolitana 2=New york  */
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
        levadura = parseInt(prompt("Ingrese tipo de levadura 1 = fresca 2 = seca")); /* 1=levadura fresca 2=levadura seca */
    } while (!validar_levadura(levadura));

    let peso_pizza = 0;
    do {
        peso_pizza = parseInt(prompt("Ingrese peso deseado de cada pizza en gramos"));
    } while (!validar_peso(peso_pizza));
    

    return new masa(tipo, numero_pizzas, hidratacion, levadura, peso_pizza);
}

function calcular_cantidad_ingredientes(datos_masa){
    
    const porcentaje_sal = 0.02;
    const porcentaje_levadura = (datos_masa.levadura === 1 ) ? 0.01 : 0.0033; /* fresca = 1% seca= 0,3% */
    const porcentaje_aceite = (datos_masa.tipo === 2) ? 0.01 : 0.0; /* 1=napolitana 2=New york  */
        
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

    return new ingredientes(cantidad_harina, cantidad_agua, cantidad_sal, cantidad_levadura, cantidad_aceite);
}

function mostrar_informacion(cantidades_ingredientes){
    console.log(`Cantidad de harina: ${cantidades_ingredientes.harina} gs`);
    console.log(`Cantidad de agua: ${cantidades_ingredientes.agua} gs`);
    console.log(`Cantidad de sal: ${cantidades_ingredientes.sal} gs`);
    console.log(`Cantidad de levadura: ${cantidades_ingredientes.levadura} gs`);
    if (cantidades_ingredientes.aceite > 0 ){
        console.log(`Cantidad de aceite: ${cantidades_ingredientes.aceite} gs`);
    }
}
do {
    let datos_masa = obtener_datos();
    let cantidades_ingredientes = calcular_cantidad_ingredientes(datos_masa);
    mostrar_informacion(cantidades_ingredientes);
} while (confirm("¿Desea calcular nuevamente?"));
