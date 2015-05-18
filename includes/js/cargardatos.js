var wsUrlCotizacion = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
//var wsUrlNovedades = "http://concentrador.afascl.coop:8080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlNovedades = "http://concentrador.afascl.coop:38080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlAuditoria = "http://concentrador.afascl.coop:38080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsUrlInforme = "http://concentrador.afascl.coop:38080/Concentrador/webservices/InformeService?wsdl/";
var wsUrlGuardarTelefono = "http://concentrador.afascl.coop:38080/Concentrador/webservices/InformeService?wsdl/";

var wsUrlRegistracionTelefono =  'http://200.58.118.98:3000/registrationinfo/';//'http://200.58.118.98:3000/registrationinfo/uuid/type/regid';
//'http://200.58.118.98:3000/registrationinfo/';

var cotizacionesDestacada = null;
var indexCotizacionesDestacada = null;
var listaTodasCotizaciones = null;
var listaNovedades = null;
var listaTablaModificaciones = null;
var listaInformes = null;
//
var isCargarCotizaciones = true;
var isCargarNotificaciones = true;
var isCargarInformes = true;
//
var telefonoDelUsuario = '';
//CargarParametroEntradaAuditoria()
//CargaNovedades()
//CargaUltimoInforme() 

function cotizacion() {
    this.fechaCotizacion = '';
    this.codigoMoneda = 0;
    this.descripcionMoneda = '';
    this.codigoTipoCotizacion = 0;
    this.codigoTipoCotizacion = 0;
    this.descripcionTipoCotizacion = '';
    this.codigoPuerto = 0;
    this.descripcionPuerto = '';
    this.codigoProducto = 0;
    this.descripcionProducto = '';
    this.valor = 0;
    this.observacion = '';
    this.listaDetalle = [];
    this.listaHistorico = [];
}
function novedades() {
    this.codigoNotificacion = 0;
    this.fecha = '';
    this.titulo = '';
    this.descripcion = '';
    this.url = '';
    this.codigoCategoria = 0;
    this.descripcionCategoria = '';
}
function modificacionesTabla() {
    this.codigoTabla = 0;
    this.fecha = '';
    this.hora = '';
}
function informes() {
    this.codigoInforme = 0;
    this.fecha = '';
    this.titulo = '';
    this.texto = '';
}
function infoRegistracion() {
    this.uuid = '';    
    this.type = ''; //"gcm" (Android), "apn" (iOS) y "mpn" (Windows Phone)
    this.regid = '';
    this.fecha = '';
}
var objDatosTelefono = null;
function FuncionInicio() {

  // localStorage.clear();
//    if (localStorage.getItem("storageTelefono") == null) {
//       // isGuardarTelefono = true;
//        window.location.href = "telefono.html";
//    } else {
//        CargarAuditoria();
//    }
    // CargarAuditoria();
     objDatosTelefono = new infoRegistracion(); //  var obj = new modificacionesTabla();
  CargarDatosAlServidor();
}


function CargarDatosAlServidor(){
// 
//     if (localStorage.getItem("storageDatosDelTelefono") == null) {
//       // isGuardarTelefono = true;
//        window.location.href = "telefono.html";
//    } else {
//        CargarAuditoria();
//    }   
var urlCargaDatosTel = wsUrlRegistracionTelefono + objDatosTelefono.uuid +'/gcm/' + objDatosTelefono.regid;
    
$.ajax({
  url: urlCargaDatosTel,
  type: 'GET',
  data: {},
  success: function(data) {
    //called when successful
    alert(data);
  },
  error: function(e) {
    //called when there is an error
     alert(e);
  }
}); 

}

function CargarParametroEntradaGuardarTelefono(){
    var soapRequest ='';// '<?xml version="1.0" encoding="utf-8"?>';
//    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
//    soapRequest += '<soapenv:Header/>';
//    soapRequest += '<soapenv:Body>';
//    soapRequest += '<ser:guardarTelefono>';
//    if (pTelefono != '') {
//        soapRequest += '<telefono>' + pTelefono + '</telefono> ';
//    }
//    soapRequest += '</ser:guardarTelefono>';
//    soapRequest += '</soapenv:Body>';
//    soapRequest += '</soapenv:Envelope>';
     soapRequest += '/uuid/type/regid';//http://200.58.118.98:3000/registrationinfo/uuid/type/regid
    return soapRequest;
}

function PrimerInicioAplicacion() {
    //var isGuardarTelefono = false;
    if (localStorage.getItem("storageTelefono") == null) {
       // isGuardarTelefono = true;
        window.location.href = "telefono.html";
    } else {

    }
//    if (isGuardarTelefono) {
//        funGuardarTelefono(telefonoDelUsuario);
//    }
}

function CargarParametroEntradaGuardarTelefono(pTelefono) {
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:guardarTelefono>';
    if (pTelefono != '') {
        soapRequest += '<telefono>' + pTelefono + '</telefono> ';
    }
    soapRequest += '</ser:guardarTelefono>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';
    return soapRequest;
}

function funGuardarTelefono(pTelefono) {
    telefonoDelUsuario = pTelefono;
    $.ajax({
        type: "POST",
        url: wsUrlGuardarTelefono,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
        data: CargarParametroEntradaGuardarTelefono(pTelefono),
        success: processSuccessGuardarTelefono,
        error: processErrorGuardarTelefono
    });
}
function processErrorGuardarTelefono(data, status, req) {
    //OcultarDivBloqueo();
   // alert(req);
          localStorage.setItem('storageTelefono', telefonoDelUsuario);
         window.location.href = "index.html";
}
function processSuccessGuardarTelefono(data, status, req) {
    if (status == "success") {
        alert(req.responseText);
        // var tablaModificacionesInformesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
        localStorage.setItem('storageTelefono', telefonoDelUsuario);
         window.location.href = "index.html";
         //window.history.go(-1);
    }
}

function CargarAuditoria() {
    //alert('CargarAuditoria');
    listaTablaModificaciones = null;
    $.ajax({
        type: "POST",
        url: wsUrlAuditoria,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
        data: CargarParametroEntradaAuditoria(),
        success: processSuccessAuditoria,
        error: processErrorAuditoria
    });
}
function processSuccessAuditoria(data, status, req) {
    if (status == "success") {
        //1:"Cotizaciones", 2:"Notificaciones", 3:"Informes"   
        isCargarCotizaciones = false;
        isCargarNotificaciones = false;
        isCargarInformes = false;
        CargarResultadoAuditoriaJavascript(req.responseText);
        if (listaTablaModificaciones != null) {
            for (var i = 0; i < listaTablaModificaciones.length; i++) {
                if (listaTablaModificaciones[i].codigoTabla == 1) {//Cotizaciones
                    grabarStorageFechaCotizacion(listaTablaModificaciones[i].fecha);
                    if (localStorage.getItem("storageTablaModificaciones1") == null) {
                        isCargarCotizaciones = true;
                    } else {
                        var fechaCotizacionesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
                        var fechaCotizacionesGuardada = localStorage.getItem("storageTablaModificaciones1");
                        var TablaModificacionesCotizaciones = eval('(' + fechaCotizacionesGuardada + ')');
                        var fechaCotizacionesUTC = obtenerFechaUTC(TablaModificacionesCotizaciones.fecha, TablaModificacionesCotizaciones.hora);
                        if (fechaCotizacionesNuevaUTC > fechaCotizacionesUTC) {
                            isCargarCotizaciones = true;
                        }
                    }
                    var tablaModificacionesCotizacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
                    localStorage.setItem('storageTablaModificaciones1', tablaModificacionesCotizacionesAGuardar);
                } else if (listaTablaModificaciones[i].codigoTabla == 2) {//Notificaciones
                    if (localStorage.getItem("storageTablaModificaciones2") == null) {
                        isCargarNotificaciones = true;
                    } else {
                        var fechaNotificacionesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
                        var fechaNotificacionesGuardada = localStorage.getItem("storageTablaModificaciones2");
                        var TablaModificacionesNotificaciones = eval('(' + fechaNotificacionesGuardada + ')');
                        var fechaNotificacionesUTC = obtenerFechaUTC(TablaModificacionesNotificaciones.fecha, TablaModificacionesNotificaciones.hora);
                        if (fechaNotificacionesNuevaUTC > fechaNotificacionesUTC) {
                            isCargarNotificaciones = true;
                        }
                    }
                    var tablaModificacionesNotificacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
                    localStorage.setItem('storageTablaModificaciones2', tablaModificacionesNotificacionesAGuardar);
                } else if (listaTablaModificaciones[i].codigoTabla == 3) {//Informes
                    if (localStorage.getItem("storageTablaModificaciones3") == null) {
                        isCargarInformes = true;
                    } else {
                        var fechaInformesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
                        var fechaInformesGuardada = localStorage.getItem("storageTablaModificaciones3");
                        var TablaModificacionesInformes = eval('(' + fechaInformesGuardada + ')');
                        var fechaInformesUTC = obtenerFechaUTC(TablaModificacionesInformes.fecha, TablaModificacionesInformes.hora);
                        if (fechaInformesNuevaUTC > fechaInformesUTC) {
                            isCargarInformes = true;
                        }
                    }
                    var tablaModificacionesInformesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
                    localStorage.setItem('storageTablaModificaciones3', tablaModificacionesInformesAGuardar);
                }
            }
        }
        if (!isCargarCotizaciones) {
            if (localStorage.getItem("storageListaCotizacionesDestacada") == null) {
                isCargarCotizaciones = true;
            } else {
                var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
                cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
            }
        }
        if (!isCargarNotificaciones) {
            if (localStorage.getItem("storageListaNovedades") == null) {
                isCargarNotificaciones = true;
            } else {
                var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
                listaNovedades = eval('(' + listaNovedadesGuardada + ')');
            }
        }
        if (!isCargarInformes) {
            if (localStorage.getItem("storageListaInformes") == null) {
                isCargarInformes = true;
            } else {
                var listaInformesGuardada = localStorage.getItem("storageListaInformes");
                listaInformes = eval('(' + listaInformesGuardada + ')');
            }
        }
        $.when(CargaCotizacionDestacada(), CargaNovedades(), CargaTodasCotizaciones(), CargaUltimoInforme()).done(funDoneAjax);

        //        if (isCargarCotizaciones) {
        //            CargaCotizacionDestacada();
        //        } else if (isCargarNotificaciones) {
        //            CargarCotizacionesDestacadaHtml();
        //            CargaNovedades();
        //        } else if (isCargarInformes) {
        //            //
        //            CargarCotizacionesDestacadaHtml();
        //            CargarNovedadesHtml();
        //            CargaUltimoInforme();           
        //            //
        //        } else {
        //            CargarCotizacionesDestacadaHtml();
        //            CargarNovedadesHtml();            
        //            finCargarInicial();
        //        }
    }
}



//armarPagina se ejecuta solo si se obtienen las respuestas exitosas
// a las dos requests.


function funDoneAjax(a, b, c, d) {
    // a es un array con los argumentos que recibiria de la primer request,
    // b lo mismo pero para la segunda request.
    //console.log(a[2].responseText);
    //console.log(b[2].responseText);

    //alert(a);
    // alert(b);
    //finCargarInicial();
}



function CargarParametroEntradaAuditoria() {
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaModificaciones/>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';
    return soapRequest;
}
function CargarResultadoAuditoriaJavascript(pXML) {
    listaTablaModificaciones = [];
    $(pXML).find('modificaciones').each(function () {
        var obj = new modificacionesTabla();
        obj.codigoTabla = parseInt($(this).find('codigoTabla').text());
        obj.fecha = $(this).find('fecha').text();
        obj.hora = $(this).find('hora').text();
        listaTablaModificaciones.push(obj);
    });
}


function CargaCotizacionDestacada() {
    //alert('CargaCotizacionDestacada');
    if (isCargarCotizaciones) {
        $.ajax({
            type: "POST",
            url: wsUrlCotizacion,
            contentType: "application/xml; charset=utf-8", //"text/xml",
            dataType: "xml",
            crossDomain: true,
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: true
            },
            data: CargarParametroEntradaCotizaciones(1, 15, obtenerFechaParametroEntrada(0), '', '', '', ''),
            success: processSuccessCotizacionDestacada,
            error: processErrorCotizacionDestacada
        });
    } else {
        CargarCotizacionesDestacadaHtml();
    }
}

function processSuccessCotizacionDestacada(data, status, req) {
    if (status == "success") {
        CargarResultadoCotizacionDestacadoJavascript(req.responseText);
    }
}
/* Inicio Error */
function processError(data, status, req) {
    OcultarDivBloqueo();
    //alert('Error');
}
function processErrorAuditoria(data, status, req) {
     processError(data, status, req);
}

function processErrorCotizacionDestacada(data, status, req) {
     processError(data, status, req);
}
function processErrorCotizacionHistoricaConIndiceDetacado(data, status, req) {
     processError(data, status, req);
}
function processErrorNovedades(data, status, req) {
     processError(data, status, req);
}
function processErrorTodasCotizaciones(data, status, req) {
     processError(data, status, req);
}
function processErrorUltimoInforme(data, status, req) {
     processError(data, status, req);
}
/* Fin Error */
function CargarResultadoCotizacionDestacadoJavascript(pXML) {
    cotizacionesDestacada = [];
    $(pXML).find('cotizaciones').each(function () {
        var obj = new cotizacion();
        obj.fechaCotizacion = $(this).find('fechaCotizacion').text();
        obj.codigoMoneda = parseInt($(this).find('codigoMoneda').text());
        obj.descripcionMoneda = $(this).find('descripcionMoneda').text();
        obj.codigoTipoCotizacion = parseInt($(this).find('codigoTipoCotizacion').text());
        obj.descripcionTipoCotizacion = $(this).find('descripcionTipoCotizacion').text();
        obj.codigoPuerto = parseInt($(this).find('codigoPuerto').text());
        obj.descripcionPuerto = $(this).find('descripcionPuerto').text();
        obj.codigoProducto = $(this).find('codigoProducto').text();
        obj.descripcionProducto = $(this).find('descripcionProducto').text();
        obj.valor = parseInt($(this).find('valor').text());
        obj.observacion = $(this).find('observacion').text();
        cotizacionesDestacada.push(obj);
    });
    if (cotizacionesDestacada.length > 0) {
        indexCotizacionesDestacada = 0;
        CargaConIndiceDetalleCotizacion(indexCotizacionesDestacada);
    }
}
function CargarParametroEntradaCotizaciones(pCodigoTipoCotizacion, pCodigoTipoCliente, pFechaDesde, pFechaHasta, pProductos, pPuertos, pMonedas) {

    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios" >';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaCotizacionProductoPuertoMoneda>';
    if (pCodigoTipoCotizacion != '') {
        soapRequest += '<codigoTipoCotizacion>' + pCodigoTipoCotizacion + '</codigoTipoCotizacion>';
    }
    if (pCodigoTipoCliente != '') {
        soapRequest += '<codigoTipoCliente>' + pCodigoTipoCliente + '</codigoTipoCliente>';
    }
    if (pFechaDesde != '') {
        soapRequest += '<fechaDesde>' + pFechaDesde + '</fechaDesde>';
    }
    if (pFechaHasta != '') {
        soapRequest += '<fechaHasta>' + pFechaHasta + '</fechaHasta>';
    }
    if (pProductos != '') {
        soapRequest += '<productos>' + pProductos + '</productos>';
    }
    if (pPuertos != '') {
        soapRequest += '<puertos>' + pPuertos + '</puertos>';
    }
    if (pMonedas != '') {
        soapRequest += '<monedas>' + pMonedas + '</monedas>';
    }
    soapRequest += '</ser:consultaCotizacionProductoPuertoMoneda>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';

    return soapRequest;

}
function CargaConIndiceDetalleCotizacion(pIndex) {
    //alert('CargaConIndiceDetalleCotizacion');
    $.ajax({
        type: "POST",
        url: wsUrlCotizacion,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(0), '', cotizacionesDestacada[pIndex].codigoProducto, '', ''),
        success: processSuccessDetalleCotizacion,
        error: processError
    });
}
function processSuccessDetalleCotizacion(data, status, req) {
    if (status == "success") {
        cotizacionesDestacada[indexCotizacionesDestacada].listaDetalle = ObtenerResultadoCotizacionDetalleJavascript(req.responseText);
        if ((cotizacionesDestacada.length - 1) > indexCotizacionesDestacada) {
            indexCotizacionesDestacada++;
            CargaConIndiceDetalleCotizacion(indexCotizacionesDestacada);
        } else {
            indexCotizacionesDestacada = 0;
            if (cotizacionesDestacada.length > 0) {
                CargaCotizacionHistoricaConIndiceDetacado(indexCotizacionesDestacada);
            }
        }
    }
}
function ObtenerResultadoCotizacionDetalleJavascript(pXML) {
    var cotizacionesDetalle = [];
    $(pXML).find('cotizaciones').each(function () {
        var obj = new cotizacion();
        obj.fechaCotizacion = $(this).find('fechaCotizacion').text();
        obj.codigoMoneda = parseInt($(this).find('codigoMoneda').text());
        obj.descripcionMoneda = $(this).find('descripcionMoneda').text();
        obj.codigoTipoCotizacion = parseInt($(this).find('codigoTipoCotizacion').text());
        obj.descripcionTipoCotizacion = $(this).find('descripcionTipoCotizacion').text();
        obj.codigoPuerto = parseInt($(this).find('codigoPuerto').text());
        obj.descripcionPuerto = $(this).find('descripcionPuerto').text();
        obj.codigoProducto = $(this).find('codigoProducto').text();
        obj.descripcionProducto = $(this).find('descripcionProducto').text();
        obj.valor = parseInt($(this).find('valor').text());
        obj.observacion = $(this).find('observacion').text();
        cotizacionesDetalle.push(obj);
    });
    return cotizacionesDetalle;
}
function CargaCotizacionHistoricaConIndiceDetacado(pIndex) {
    //alert('CargaCotizacionHistoricaConIndiceDetacado');
    $.ajax({
        type: "POST",
        url: wsUrlCotizacion,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(-10), obtenerFechaParametroEntrada(0), cotizacionesDestacada[pIndex].codigoProducto, cotizacionesDestacada[pIndex].codigoPuerto, ''),
        success: processSuccessCotizacionHistorica,
        error: processErrorCotizacionHistoricaConIndiceDetacado
    });
}
function ObtenerCotizacionHistoricaConIndiceProductoDestacado(pXML) {
    var listaHistorica = [];
    $(pXML).find('cotizaciones').each(function () {
        var obj = new cotizacion();
        obj.fechaCotizacion = $(this).find('fechaCotizacion').text();
        obj.codigoMoneda = parseInt($(this).find('codigoMoneda').text());
        obj.descripcionMoneda = $(this).find('descripcionMoneda').text();
        obj.codigoTipoCotizacion = parseInt($(this).find('codigoTipoCotizacion').text());
        obj.descripcionTipoCotizacion = $(this).find('descripcionTipoCotizacion').text();
        obj.codigoPuerto = parseInt($(this).find('codigoPuerto').text());
        obj.descripcionPuerto = $(this).find('descripcionPuerto').text();
        obj.codigoProducto = $(this).find('codigoProducto').text();
        obj.descripcionProducto = $(this).find('descripcionProducto').text();
        obj.valor = parseInt($(this).find('valor').text());
        obj.observacion = $(this).find('observacion').text();
        listaHistorica.push(obj);
    });
    return listaHistorica;
}
function processSuccessCotizacionHistorica(data, status, req) {
    if (status == "success") {
        cotizacionesDestacada[indexCotizacionesDestacada].listaHistorico = ObtenerCotizacionHistoricaConIndiceProductoDestacado(req.responseText);
        if ((cotizacionesDestacada.length - 1) > indexCotizacionesDestacada) {
            indexCotizacionesDestacada++;
            CargaCotizacionHistoricaConIndiceDetacado(indexCotizacionesDestacada);
        } else {
            if (window.localStorage) {
                var cotizacionesDestacadaAGuardar = JSON.stringify(cotizacionesDestacada);
                localStorage.setItem('storageListaCotizacionesDestacada', cotizacionesDestacadaAGuardar);
            } else {

            }
            CargarCotizacionesDestacadaHtml();
            //CargaTodasCotizaciones();
        }
    }
}

function CargaTodasCotizaciones() {
    if (isCargarCotizaciones) {
        $.ajax({
            type: "POST",
            url: wsUrlCotizacion,
            contentType: "application/xml; charset=utf-8", //"text/xml",
            dataType: "xml",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(0), '', '', '', ''),
            success: processSuccessTodasCotizaciones,
            error: processErrorTodasCotizaciones
        });
    }
}
function processSuccessTodasCotizaciones(data, status, req) {
    if (status == "success") {
        listaTodasCotizaciones = ObtenerTodasCotizaciones(req.responseText);
        if (window.localStorage) {
            var listaTodasCotizacionesAGuardar = JSON.stringify(listaTodasCotizaciones);
            localStorage.setItem('storageListaTodasCotizaciones', listaTodasCotizacionesAGuardar);
        } else {

        }

        //        if (isCargarNotificaciones) {
        //            CargaNovedades();
        //        } else if (isCargarInformes) {
        //            CargaUltimoInforme();
        //        }else{
        //         finCargarInicial();
        //        }
        //
    }
}
function ObtenerTodasCotizaciones(pXML) {
    var listaTodasCotizaciones = [];
    $(pXML).find('cotizaciones').each(function () {
        var obj = new cotizacion();
        obj.fechaCotizacion = $(this).find('fechaCotizacion').text();
        obj.codigoMoneda = parseInt($(this).find('codigoMoneda').text());
        obj.descripcionMoneda = $(this).find('descripcionMoneda').text();
        obj.codigoTipoCotizacion = parseInt($(this).find('codigoTipoCotizacion').text());
        obj.descripcionTipoCotizacion = $(this).find('descripcionTipoCotizacion').text();
        obj.codigoPuerto = parseInt($(this).find('codigoPuerto').text());
        obj.descripcionPuerto = $(this).find('descripcionPuerto').text();
        obj.codigoProducto = $(this).find('codigoProducto').text();
        obj.descripcionProducto = $(this).find('descripcionProducto').text();
        obj.valor = parseInt($(this).find('valor').text());
        obj.observacion = $(this).find('observacion').text();
        listaTodasCotizaciones.push(obj);
    });
    return listaTodasCotizaciones;
}
function CargarParametroEntradaNovedades(pFechaDesde, pFechaHasta, pCodigoCategoria) {
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaNotificaciones>';
    if (pFechaDesde != '') {
        soapRequest += '<fechaDesde>' + pFechaDesde + '</fechaDesde>';
    }
    if (pFechaHasta != '') {
        soapRequest += '<fechaHasta>' + pFechaHasta + '</fechaHasta>';
    }
    if (pCodigoCategoria != '') {
        soapRequest += '<codigoCategoria>' + pCodigoCategoria + '</codigoCategoria>';
    }
    soapRequest += '</ser:consultaNotificaciones>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';
    return soapRequest;
    //<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">
    //   <soapenv:Header/>
    //   <soapenv:Body>
    //      <ser:consultaNotificaciones>
    //         <fechaDesde>06032015</fechaDesde>
    //         <fechaHasta>18032015</fechaHasta>
    //         <codigoCategoria></codigoCategoria>
    //      </ser:consultaNotificaciones>
    //   </soapenv:Body>
    //</soapenv:Envelope>
}
function CargaNovedades() {
    if (isCargarNotificaciones) {
        $.ajax({
            type: "POST",
            url: wsUrlNovedades,
            contentType: "application/xml; charset=utf-8", //"text/xml",
            dataType: "xml",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: CargarParametroEntradaNovedades(obtenerFechaParametroEntrada(-69), obtenerFechaParametroEntrada(0), ''),
            success: processSuccessNovedades,
            error: processErrorNovedades
        });
    } else {
        CargarNovedadesHtml();
    }
}
function processSuccessNovedades(data, status, req) {
    if (status == "success") {
        listaNovedades = ObtenerNovedades(req.responseText);
        if (window.localStorage) {
            var listaNovedadesAGuardar = JSON.stringify(listaNovedades);
            localStorage.setItem('storageListaNovedades', listaNovedadesAGuardar);
        } else {

        }
        //        if (isCargarInformes) {
        //            CargaUltimoInforme();
        //        }else{
        //         finCargarInicial();
        //        }
        CargarNovedadesHtml();
    }
}
function ObtenerNovedades(pXML) {
    var listaNovedadesAux = [];
    $(pXML).find('notificaciones').each(function () {
        var obj = new novedades();
        obj.codigoNotificacion = parseInt($(this).find('codigoNotificacion').text());
        obj.fecha = $(this).find('fecha').text();
        obj.titulo = $(this).find('titulo').text();
        obj.descripcion = $(this).find('descripcion ').text();
        obj.url = $(this).find('url').text();
        obj.codigoCategoria = parseInt($(this).find('codigoCategoria').text());
        obj.descripcionCategoria = $(this).find('descripcionCategoria').text();
        listaNovedadesAux.push(obj);
    });
    return listaNovedadesAux;
}
function CargaUltimoInforme() {
    if (isCargarInformes) {
        $.ajax({
            type: "POST",
            url: wsUrlInforme,
            contentType: "application/xml; charset=utf-8", //"text/xml",
            dataType: "xml",
            crossDomain: true,
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: true
            },
            data: CargarParametroEntradaInforme('', '', 1),
            success: processSuccessInforme,
            error: processErrorUltimoInforme
        });
    }
}
function CargarParametroEntradaInforme(pFechaDesde, pFechaHasta, pTipoConsulta) {
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaInformes>';
    if (pFechaDesde != '') {
        soapRequest += '<fechaDesde>' + pFechaDesde + '</fechaDesde>';
    }
    if (pFechaHasta != '') {
        soapRequest += '<fechaHasta>' + pFechaHasta + '</fechaHasta>';
    }
    if (pTipoConsulta != '') {
        soapRequest += '<tipoConsulta>' + pTipoConsulta + '</tipoConsulta>';
    }
    soapRequest += '</ser:consultaInformes>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';
    return soapRequest;
}
function processSuccessInforme(data, status, req) {
    if (status == "success") {
        listaInformes = ObtenerImforme(req.responseText);
        if (window.localStorage) {
            var listaInformesAGuardar = JSON.stringify(listaInformes);
            localStorage.setItem('storageListaInformes', listaInformesAGuardar);
        } else {

        }
        //finCargarInicial();
    }
}
function ObtenerImforme(pXML) {
    var listaInformesAUX = [];
    $(pXML).find('informes').each(function () {
        var obj = new informes();
        obj.codigoInforme = parseInt($(this).find('codigoInforme').text());
        obj.fecha = $(this).find('fecha').text();
        obj.titulo = $(this).find('titulo').text();
        obj.texto = $(this).find('texto ').text();
        listaInformesAUX.push(obj);
    });
    return listaInformesAUX;
}
//////////////////

var pushNotification;

function onDeviceReady(){
	alert('onDeviceReady');
    pushNotification = window.plugins.pushNotification;
    try { 
		pushNotification.register(successHandler, errorHandler,{"senderID":"970066199992","ecb":"onNotification"});
	} catch(err) { 
		var txt="There was an error on this page.\n\n"; 
		txt+="Error description: " + err.message + "\n\n"; 
		alert(txt);
	}
//	 var element = document.getElementById('deviceProperties');
//        element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
//                            'Device Cordova: '  + device.cordova  + '<br />' +
//                            'Device Platform: ' + device.platform + '<br />' +
//                            'Device UUID: '     + device.uuid     + '<br />' +
//                            'Device Version: '  + device.version  + '<br />';
	objDatosTelefono.uuid =  device.uuid ;
}

// result contains any message sent from the plugin call


function successHandler (result) {
    alert('Callback Success! Result = '+result);
}

function errorHandler (error) {
    alert(error);
}
function onNotification(e) {
	alert('onNotification');
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    //console.log("Regid " + e.regid);
					
					//document.getElementById("txtClave").value = e.regid;
                    alert('registration id = '+e.regid);
                    objDatosTelefono.regid = e.regid;
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
             // break;
        }
    }
	
	document.addEventListener('deviceready', onDeviceReady, true);
/////////////////