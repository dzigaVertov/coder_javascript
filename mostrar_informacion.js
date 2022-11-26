function mostrar_informacion(cantidades_ingredientes) {
    console.log(`\nCantidad de harina: ${cantidades_ingredientes.harina.cantidad}gs`);
    console.log(`Cantidad de agua: ${cantidades_ingredientes.agua}gs`);
    console.log(`Cantidad de sal: ${cantidades_ingredientes.sal.cantidad}gs`);
    console.log(`Cantidad de levadura: ${cantidades_ingredientes.levadura.cantidad}gs`);
    if (cantidades_ingredientes.aceite.cantidad > 0) {
        console.log(`Cantidad de aceite: ${cantidades_ingredientes.aceite.cantidad}gs`);
    }
}
