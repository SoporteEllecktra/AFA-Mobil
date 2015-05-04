function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}
function onclickCompartir() {
    if ($('.cssTdHeaderDerecha .btn_rs').hasClass('cssTdHeaderDerecha_btn_rs_Activo')) {
        $('.cssTdHeaderDerecha .btn_rs').removeClass('cssTdHeaderDerecha_btn_rs_Activo');
        $('.cssTdHeaderDerecha .btn_rs .center').removeClass('cssTdHeaderDerecha_btn_rs_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .left').removeClass('cssTdHeaderDerecha_btn_rs_one_left_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .center').removeClass('cssTdHeaderDerecha_btn_rs_one_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .two .right').removeClass('cssTdHeaderDerecha_btn_rs_two_right_Activo');
        $('.divMenuCompartir').css('display', 'none');
    } else {
        $('.cssTdHeaderDerecha .btn_rs').addClass('cssTdHeaderDerecha_btn_rs_Activo');
        $('.cssTdHeaderDerecha .btn_rs .center').addClass('cssTdHeaderDerecha_btn_rs_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .left').addClass('cssTdHeaderDerecha_btn_rs_one_left_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .center').addClass('cssTdHeaderDerecha_btn_rs_one_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .two .right').addClass('cssTdHeaderDerecha_btn_rs_two_right_Activo');
        $('.divMenuCompartir').css('display', 'block');
    }
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
function obtenerFechaUTC(pFecha, pHora) {
    var fechaSplit = pFecha.split('/');
    var anio = parseInt(fechaSplit[0]);
    var mes = parseInt(fechaSplit[1]) - 1;
    var dia = parseInt(fechaSplit[2]);
    var horaSplit = pHora.split(':');
    var hora = parseInt(horaSplit[0]);
    var minuto = parseInt(horaSplit[1]);
    var segundo = parseInt(horaSplit[2]);
    var fechaGmt = Date.UTC(anio, mes, dia, hora, minuto, segundo, 0);
    return fechaGmt;
}

function grabarStorageIndexCotizacionDestacadaSeleccionda(pValor) {
    if (window.localStorage) {
        localStorage.setItem('storageIndexCotizacionDestacadaSeleccionda', pValor);
    } else {

    }
}
function obtenerStorageIndexCotizacionDestacadaSeleccionda() {
    var resultado = -1;
    if (window.localStorage) {
        resultado = parseInt(localStorage.getItem('storageIndexCotizacionDestacadaSeleccionda'));
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
function obtenerParametroGetHtml(param) {//$_GET(param)
    /* Obtener la url completa */
    url = document.URL;
    /* Buscar a partir del signo de interrogación ? */
    url = String(url.match(/\?+.+/));
    /* limpiar la cadena quitándole el signo ? */
    url = url.replace("?", "");
    /* Crear un array con parametro=valor */
    url = url.split("&");

    /* 
    Recorrer el array url
    obtener el valor y dividirlo en dos partes a través del signo = 
    0 = parametro
    1 = valor
    Si el parámetro existe devolver su valor
    */
    x = 0;
    while (x < url.length) {
        p = url[x].split("=");
        if (p[0] == param) {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
    return '';
}
function share(expr){ 
 
    switch (expr) { 
      case "Twitter": 
        window.plugins.socialsharing.shareViaTwitter('AFA SCL 08/04: SOJA 1930 / 220 May - SORGO 1030/ 117 May - MAIZ 960 c.desc / 1000 s.desc / 114 May - GIRASOL s/c - ARVEJA USD 180 // Más información en www.afascl.coop'); 
       // closeOptions(); 
        break; 
      case "Facebook": 
	  //alert('Pasa Facebook');
        //window.plugins.socialsharing.shareViaFacebook('Message via Facebook', 'http://www.kellerhoff.com.ar/img/logo.png' , 'http://www.phonegapspain.com', function() {alert('Ok');}, function(errormsg){alert('Error');}); 
		window.plugins.socialsharing.shareViaFacebook('Afa facebook','http://www.kellerhoff.com.ar/img/logo.png','http://www.afascl.com', function() {/*alert('Ok');*/}, function(errormsg){alert('Conectar Facebook');}); 
       // closeOptions(); 
        break; 
      case "WhatsApp": 
            window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){console.log(errormsg)}); 
         //   closeOptions(); 
        break; 
      default: 
       // console.log(""); 
    } 
}

function onclickFacebook(){

}