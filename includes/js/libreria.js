var varNoSeEncuentraRegistro = 'No se encuentra registro.';
var varNoSeEncuentraRegistroHistorica = 'No se encuentra cotización histórica.';

var applicationStorage = [];

function getItemApplicationStorage(item_key_value) {
    for (var i = 0; i < applicationStorage.length; i++) {
        var item = applicationStorage[i];
        if (item.key && item.key == item_key_value) {
            return item.values;
        }
    }
    return '';
}

function convertValorImporte(pValor) {
    var resultado = pValor.toString();
    if (resultado.indexOf('.') != -1) {
        var listaAux = resultado.split('.');
        resultado = listaAux[0] + ',' + listaAux[1]; // toString00_decimal(listaAux[1]);
    } else {

    }
    return resultado;
}

function toString00_decimal(pNro) {
    if (pNro.toString().length == 1) {
        return pNro + '0';
    }
    return pNro;
}

function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}

function isMobile() {
    var resultado = false;
    var varPlatform = '';
    if (window.localStorage && localStorage.getItem("storagePlatform") != null && localStorage.getItem("storagePlatform")  != '') {
        varPlatform = localStorage.getItem("storagePlatform");
    } else {
        return false;
    }
    if (varPlatform === 'android' || varPlatform === 'Android') {
        return (/Mobile/.test(navigator.userAgent));
    } else if (varPlatform === 'iOS') {
        return (!(/iPad/.test(navigator.userAgent)));
    } else if (varPlatform == 'WinCE' || varPlatform == 'Win32NT') {
        return true;
    }
    return resultado;
}

function onclickCompartir() {
    if ($('.cssTdHeaderDerecha .btn_rs').hasClass('cssTdHeaderDerecha_btn_rs_Activo')) {
        CerrarMenuCompartir();
    } else {
        $('.cssTdHeaderDerecha .btn_rs').addClass('cssTdHeaderDerecha_btn_rs_Activo');
        $('.cssTdHeaderDerecha .btn_rs .center').addClass('cssTdHeaderDerecha_btn_rs_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .left').addClass('cssTdHeaderDerecha_btn_rs_one_left_Activo');
        $('.cssTdHeaderDerecha .btn_rs .one .center').addClass('cssTdHeaderDerecha_btn_rs_one_center_Activo');
        $('.cssTdHeaderDerecha .btn_rs .two .right').addClass('cssTdHeaderDerecha_btn_rs_two_right_Activo');
        //$('.divMenuCompartir').css('display', 'block');
        setTimeout(function () {
            CerrarMenuCompartir();
        }, 4000);
    }
}

function CerrarMenuCompartir() {
    $('.cssTdHeaderDerecha .btn_rs').removeClass('cssTdHeaderDerecha_btn_rs_Activo');
    $('.cssTdHeaderDerecha .btn_rs .center').removeClass('cssTdHeaderDerecha_btn_rs_center_Activo');
    $('.cssTdHeaderDerecha .btn_rs .one .left').removeClass('cssTdHeaderDerecha_btn_rs_one_left_Activo');
    $('.cssTdHeaderDerecha .btn_rs .one .center').removeClass('cssTdHeaderDerecha_btn_rs_one_center_Activo');
    $('.cssTdHeaderDerecha .btn_rs .two .right').removeClass('cssTdHeaderDerecha_btn_rs_two_right_Activo');
    // $('.divMenuCompartir').css('display', 'none');
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
        var item = {'key': 'storageIndexCotizacionDestacadaSeleccionda', 'values': pValor};
        applicationStorage.push(item);
    }
}

function obtenerStorageIndexCotizacionDestacadaSeleccionda() {
    var resultado = -1;
    if (window.localStorage) {
        resultado = parseInt(localStorage.getItem('storageIndexCotizacionDestacadaSeleccionda'));
    } else {
        resultado = parseInt(getItemApplicationStorage('storageIndexCotizacionDestacadaSeleccionda'));
    }
    return resultado;
}

function grabarStorageFechaCotizacion(pValor) {
    if (window.localStorage) {
        localStorage.setItem('storageFechaCotizaciones', pValor);
    } else {
        var item = {'key': 'storageFechaCotizaciones', 'values': pValor};
        applicationStorage.push(item);
    }
}

function obtenerStorageFechaMenuPrincipal() {
    var resultado = '';
    if (window.localStorage) {
        resultado = obtenerFechaMostrarMenuInicio(localStorage.getItem('storageFechaCotizaciones'));
    } else {
        resultado = parseInt(getItemApplicationStorage('storageFechaCotizaciones'));
    }
    return resultado;
}

function CargarHtmlFechaMenuPrincipal() {
    $('#headerFecha').html(obtenerStorageFechaMenuPrincipal());
	$('#headerFecha').css('cursor', 'pointer');
	$('#headerFecha').attr('onclick', 'window.location.href = "index.html"');
}

function obtenerFechaMostrarDsdCotizacionesDestacada(pValor) {
    //var listaFecha = pValor.substring(0, 10).split('-');
    var anio = pValor.substring(0, 4);
    var mes = pValor.substring(5, 7);
    var dia = pValor.substring(8, 10);
    return dia + '/' + mes + '/' + anio;
}

function obtenerFechaMostrar(pValor) {
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
    //05/05/2015
    var resultado = '';
    var listaFecha = pValor.split('/');
    resultado = listaFecha[0] + ' de ' + obtenerNombreMes(listaFecha[1]) + ' del ' + listaFecha[2];
    return resultado;
}

function MostrarDivBloqueo() {
    ActualizarAltoFondoBloqueo();
    $('#divFondoBloqueo').css('display', 'block');
}

function OcultarDivBloqueo() {
    $('#divFondoBloqueo').css('display', 'none');
    $('#divFondoBloqueo').css('opacity', '1');
}

function ActualizarAltoFondoBloqueo() {
    var height = $(document).height();
    document.getElementById("divFondoBloqueo").style.height = parseInt(height) + "px";
}

function obtenerParametroGetHtml(param) { //$_GET(param)
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

function onSuccessCopy(args) {
    //alert(args);
    // window.plugins.socialsharing.shareViaFacebook(ObtenerTxtCompartirCotizacionesDestacada(), null, null, function () {  }, function (errormsg) { });
}

function onErrorCopy(ex) {
    // alert(ex);
}

function shareNuevo(expr) {
    // alert('Ok');
    try {
        cordova.exec(onSuccessCopy, onErrorCopy, "Clipboard", "copy", [ObtenerTxtCompartirCotizacionesDestacada()]);
    } catch (exx) {

    }
    var varPlatform = '';
    if (localStorage.getItem("storagePlatform") != null) {
        varPlatform = localStorage.getItem("storagePlatform");
    }
    if (varPlatform == 'WinCE' || varPlatform == 'Win32NT') {
        window.plugins.socialsharing.share(ObtenerTxtCompartirCotizacionesDestacada(), null, null, null);
        //window.plugins.socialsharing.share(ObtenerTxtCompartirCotizacionesDestacada());
    } else {
        window.plugins.socialsharing.share(ObtenerTxtCompartirCotizacionesDestacada());
    }
}

function share(expr) {
    //window.plugins.copy(ObtenerTxtCompartirCotizacionesDestacada());
    //cordova.plugins.clipboard.copy(ObtenerTxtCompartirCotizacionesDestacada());
    try {
        cordova.exec(onSuccessCopy, onErrorCopy, "Clipboard", "copy", [ObtenerTxtCompartirCotizacionesDestacada()]);
    } catch (exx) {

    }
    switch (expr) {
    case "Twitter":
        //window.plugins.socialsharing.shareViaTwitter(ObtenerTxtCompartirCotizacionesDestacada());
        window.plugins.socialsharing.shareViaTwitter('');
        break;
    case "Facebook":
        window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(ObtenerTxtCompartirCotizacionesDestacada(), null, null, ObtenerTxtCompartirCotizacionesDestacada(), function () {
            console.log('share ok')
        }, function (errormsg) {
            alert(errormsg)
        });

        //window.plugins.socialsharing.shareViaFacebook( ObtenerTxtCompartirCotizacionesDestacada(), 'http://www.kellerhoff.com.ar/img/logo.png' , 'http://www.phonegapspain.com', function() {alert('Ok');}, function(errormsg){alert('Error');}); 
        //window.plugins.socialsharing.shareViaFacebook(ObtenerTxtCompartirCotizacionesDestacada(), null, null, function () { /*alert('Ok');*/ }, function (errormsg) { /*alert('Error');*/ });
        //window.plugins.socialsharing.shareViaFacebook('Afa facebook','http://www.kellerhoff.com.ar/img/logo.png','http://www.afascl.com','Paste it dude!', function() {/*alert('Ok');*/}, function(errormsg){alert('Conectar Facebook');}); 
        //window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Afa facebook',null,null,ObtenerTxtCompartirCotizacionesDestacada(),function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
        //window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null /* img */, null /* url */, 'Paste it dude!', function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
        break;
    case "WhatsApp":
        //window.plugins.socialsharing.shareViaWhatsApp(ObtenerTxtCompartirCotizacionesDestacada(), null /* img */, null /* url */, function () { console.log('share ok') }, function (errormsg) { console.log(errormsg) });
        window.plugins.socialsharing.shareViaWhatsApp(ObtenerTxtCompartirCotizacionesDestacada(), null /* img */ , null /* url */ , function () {
            //console.log('share ok')
        }, function (errormsg) {
            //console.log(errormsg)
        });
        break;
    case "share":

        break;
    default:
    }
    onclickCompartir();
}

function onclickFacebook() {
    share('Facebook');
}

function onclickTwitter() {
    share('Twitter');
}

function onclickWhatsApp() {
    share('WhatsApp');
}

function ObtenerTxtCompartirCotizacionesDestacada() {
    //AFA SCL 17/06: SOJA 2000 / 219 Jul - SORGO 1050/ 113 Jul.Ago - MAIZ 920 / 100 Ago Grado II - GIRASOL 1850 - TRIGO
    var strResultado = '';
    //'AFA SCL 08/04: SOJA 1930 / 220 May - SORGO 1030/ 117 May - MAIZ 960 c.desc / 1000 s.desc / 114 May - GIRASOL s/c - ARVEJA USD 180 // Más información en www.afascl.coop'    
    var fechaUltima = eval('(' + localStorage.getItem("storageTablaModificaciones1") + ')');
    var listaFecha = fechaUltima.fecha.split('/');
    strResultado += 'AFA SCL ' + fechaUltima.fecha.substring(0, 5) + ':';

    var listaCompartirCotizacionesDestacada = null;
    if (localStorage.getItem("storageListaCotizacionesDestacada") == null) {

    } else {
        var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
        listaCompartirCotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
    }

    if (listaCompartirCotizacionesDestacada != null) {
        var index = 0;
        $(listaCompartirCotizacionesDestacada).each(function () {
            if (index != 0) {
                strResultado += ' /';
            }
            strResultado += ' ' + this.descripcionProducto.toUpperCase() + ' ' + this.valor;
            index++;
        });
    }
    return strResultado;
}

function loadURL(url) {
    try {
        var varPlatform = '';
        if (localStorage.getItem("storagePlatform") != null) {
            varPlatform = localStorage.getItem("storagePlatform");
        }
        if (varPlatform == 'Android' || varPlatform == 'android') {
            navigator.app.loadUrl(url, {
                openExternal: true
            });
        } else if (varPlatform == 'iOS') {
            window.open(url, '_system');
        } else if (varPlatform == 'WinCE' || varPlatform == 'Win32NT') {
            window.open(url, '_system');
        }
    } catch (ex) {
        alert('No se puede acceder al recurso externo. Intente nuevamente');
        // return false;
    }
    //  return false;
}

function RedireccionarPagIndex() {
    localStorage.setItem('storageIndexVolver', '1');
    window.history.go(-1);
    //    if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'iOS') {
    //        window.location.href = "index.html?r=1";
    //    } else if (device.platform == 'WinCE' || device.platform == 'Win32NT') {
    //        //window.location.href = "index.html?r=1";
    //     
    //    }
}

/*Inicio Ventana alerta*/
function btnCerrarAlerta() {
    $('#divVentanaAlertaContenedor').css('display', 'none');
}

function CargarVentanaAlerta(pTitulo, pDescripcion) {
    $('#divVentanaTitulo').html('');
    $('#divVentanaDescripcio').html('');
    if (pTitulo != '') {
        $('#divVentanaTitulo').html(pTitulo);
    }
    if (pDescripcion != '') {
        $('#divVentanaDescripcio').html(pDescripcion);
    }

    $('#divVentanaAlertaContenedor').css('display', 'block');
}

/*Fin Ventana alerta*/

/* Inicio Actualizar */
function onclickActualizar() {
    //$('.cssCalendario').css('','');
    //alert('Ok');
    $('#divFondoBloqueo').css('opacity', '0.8');
    // localStorage.clear();
    //localStorage.setItem('storagePlatform', 'Android');
    //MostrarDivBloqueo();
    window.location.href = "index.html";
    //CargarAuditoria();
}

function onclickActualizarNoIndex() {
    RedireccionarPagIndexActualizar();
}

function RedireccionarPagIndexActualizar() {
    localStorage.setItem('storageIndexVolver', '2');
    window.history.go(-1);
}

/* Fin Actualizar */