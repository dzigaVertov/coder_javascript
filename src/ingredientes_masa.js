import { Producto } from "./productos.js";
import { precios, unidades } from "./stock.js";

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

export {masa, ingredientes, calcular_cantidad_ingredientes};