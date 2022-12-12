import { Producto } from "./productos.js";
import { lista_productos, precios, unidades } from "./stock.js";

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

export {Carrito};