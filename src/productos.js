
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

export {Producto};