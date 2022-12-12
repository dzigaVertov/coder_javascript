const obtenerUbicacion = () => {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const imprimir = async () => {
    try {
        let pos = await obtenerUbicacion();
        console.log(pos.coords.latitude);   
        console.log(pos.coords.longitude);
    } catch(err) {
        console.error(err);
    }
    
}

const getTemp = async () => {
    let lat;
    let lon;
    try {
        let pos = await obtenerUbicacion();
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
    } catch(error) {
        console.error(error);
        return;
    }
    
    try {
        let pedido = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=92feae50806ffdd346553bd936cc9dff&units=metric`;
        let res = await fetch(pedido);
        if(res.ok) {
            let resultado = await res.json();
            return resultado.main.temp;
        }        
    } catch(error) {
        console.error(error);
    }
    
}

/* imprimir();
getTemp(); */

/* Recibe temperatura en grados centigrados, devuelve tiempo de fermentación en horas */
function formula_fermentacion(temperatura) {
    let tiempo = 130*(1/temperatura - 1/(temperatura - 60)) -4;
    return tiempo;
}

function calcularHorasYminutos(tiempo){
    let horas = Math.floor(tiempo);
    let minutos = Math.round( 60 * (tiempo % 1));
    return {horas, minutos};
}

const calcularTiempoFermentacion = async () => {
    let temp = await getTemp();
    let tiempo = formula_fermentacion(temp);
    let {horas, minutos} = calcularHorasYminutos(tiempo);
    
    let divTemperatura = document.getElementById('temperatura');
    divTemperatura.innerHTML = `<h3>Temperatura: ${temp}ºC</h3>`;

    let divTiempo = document.getElementById('t_fermentacion');
    divTiempo.innerHTML = `<h3>Tiempo de fermentación:<br> ${horas} hs ${minutos} min</h3>`;
}

let btn_calcular = document.getElementById('btn_calcular');
btn_calcular.addEventListener('click', ev => {
    calcularTiempoFermentacion();
});
