function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}
function obtenerFechaParametroEntrada(pDia) {
    var milisegundos = parseInt(pDia * 24 * 60 * 60 * 1000);
    var fecha = new Date();
    var tiempo = fecha.getTime();
    fecha.setTime(tiempo + milisegundos);

    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return toString00(dia) + toString00(mes) + anio.toString();
}
function grabarStorageIndexCotizacionDestacadaSeleccionda(pValor) {
    if (window.localStorage) {
        localStorage.setItem('storageIndexCotizacionDestacadaSeleccionda', pValor);
    } else {

    }
}
function  obtenerStorageIndexCotizacionDestacadaSeleccionda() {
    var resultado = -1;
    if (window.localStorage) {
        resultado = parseInt( localStorage.getItem('storageIndexCotizacionDestacadaSeleccionda'));
    } else {

    }
    return resultado;
}
function grabarStorageFechaCotizacion(pValor) {
    if (window.localStorage) {
        localStorage.setItem('storageFechaCotizaciones', pValor);
    } else {

    }
}
function obtenerStorageFechaMenuPrincipal() {
    var resultado = '';
    if (window.localStorage) {
        resultado = obtenerFechaMostrarMenuInicio(localStorage.getItem('storageFechaCotizaciones'));
    } else {

    }
    return resultado;
}
function CargarHtmlFechaMenuPrincipal() {
    $('#headerFecha').html(obtenerStorageFechaMenuPrincipal());
}

function obtenerFechaMostrar(pValor) {
    //2015-03-27T00:00:00-03:00
    // pValor.substring(0,10);
    var listaFecha = pValor.substring(0, 10).split('-');
    return listaFecha[2] + '/' + listaFecha[1] + '/' + listaFecha[0];
}
//enero, con 31 días
//febrero, con 28 días o 29 en año bisiesto
//marzo, con 31 días
//abril, con 30 días
//mayo, con 31 días
//junio, con 30 días
//julio, con 31 días
//agosto, con 31 días
//septiembre, con 30 días
//octubre, con 31 días
//noviembre, con 30 días
//diciembre, con 31 días
function obtenerNombreMes(pValor) {
    var resultado = '';
    switch (pValor) {
        case '01':
            resultado = 'enero';
            break;
        case '02':
            resultado = 'febrero';
            break;
        case '03':
            resultado = 'marzo';
            break;
        case '04':
            resultado = 'abril';
            break;
        case '05':
            resultado = 'mayo';
            break;
        case '06':
            resultado = 'junio';
            break;
        case '07':
            resultado = 'julio';
            break;
        case '08':
            resultado = 'agosto';
            break;
        case '09':
            resultado = 'septiembre';
            break;
        case '10':
            resultado = 'octubre';
            break;
        case '11':
            resultado = 'noviembre';
            break;
        case '12':
            resultado = 'diciembre';
            break;
        default:
            break;
    }
    return resultado;
}
function obtenerFechaMostrarMenuInicio(pValor) {
    //2015-03-27T00:00:00-03:00
    var resultado = '';
    var listaFecha = pValor.substring(0, 10).split('-');
    resultado = listaFecha[2] + ' de ' + obtenerNombreMes(listaFecha[1]) + ' del ' + listaFecha[0];
    return resultado;
}
function MostrarDivBloqueo() {
    ActualizarAltoFondoBloqueo();
    $('#divFondoBloqueo').css('display', 'block');
}
function OcultarDivBloqueo() {
    $('#divFondoBloqueo').css('display', 'none');
}
function ActualizarAltoFondoBloqueo() {
    var height = $(document).height();
    document.getElementById("divFondoBloqueo").style.height = parseInt(height) + "px";
}