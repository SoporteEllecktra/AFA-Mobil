var wsUrlCotizacion = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlNovedades = "http://concentrador.afascl.coop:8080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlAuditoria = "http://concentrador.afascl.coop:38080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsUrlInforme = "http://concentrador.afascl.coop:38080/Concentrador/webservices/InformeService?wsdl/";

var cotizacionesDestacada = null;
var indexCotizacionesDestacada = null;
var listaTodasCotizaciones = null;
var listaNovedades = null;
var listaTablaModificaciones = null;
var listaInformes = null;
//
var isCargarCotizaciones = false;
var isCargarNotificaciones = false;
var isCargarInformes = false;
//

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
function informes(){
    this.codigoInforme = 0;
    this.fecha = '';
    this.titulo = '';
    this.texto = '';
}
function FuncionInicio() {
    CargarAuditoria();

}
//function CargaDatosInicio() {
//    //localStorage.removeItem("storageListaCotizacionesDestacada");
//    //localStorage.removeItem("storageListaNovedades");
//    //CargarAuditoria();
//    if (!(localStorage.getItem("storageListaCotizacionesDestacada") == null)) {
//        // alert(2);
//        var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
//        cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
//        CargarCotizacionesDestacadaHtml();
//        if (!(localStorage.getItem("storageListaNovedades") == null)) {
//            var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
//            listaNovedades = eval('(' + listaNovedadesGuardada + ')');
//            CargarNovedadesHtml();
//            OcultarDivBloqueo();
//        } else {
//            CargaNovedades();
//        }
//    } else {
//        // alert(3);
//        CargaCotizacionDestacada();
//    }
//
//}
function CargarAuditoria() {
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
        error: processError
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
        if (isCargarCotizaciones) {
            CargaCotizacionDestacada();
        } else if (isCargarNotificaciones) {
            CargarCotizacionesDestacadaHtml();
            CargaNovedades();
        } else if (isCargarInformes) {
            //
            CargarCotizacionesDestacadaHtml();
            CargarNovedadesHtml();
            CargaUltimoInforme();           
            //
        } else {
            CargarCotizacionesDestacadaHtml();
            CargarNovedadesHtml();
            //CargarInformeHtml();
            OcultarDivBloqueo();
        }
    }
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
        error: processError
    });
}
function processSuccessCotizacionDestacada(data, status, req) {
    if (status == "success") {
        CargarResultadoCotizacionDestacadoJavascript(req.responseText);
    }
}
function processError(data, status, req) {
    OcultarDivBloqueo();
    //alert('Error');
}

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
        error: processError
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
            CargaTodasCotizaciones();
        }
    }
}

function CargaTodasCotizaciones() {
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
        error: processError
    });
}
function processSuccessTodasCotizaciones(data, status, req) {
    if (status == "success") {
        listaTodasCotizaciones = ObtenerTodasCotizaciones(req.responseText);
        if (window.localStorage) {
            var listaTodasCotizacionesAGuardar = JSON.stringify(listaTodasCotizaciones);
            localStorage.setItem('storageListaTodasCotizaciones', listaTodasCotizacionesAGuardar);
        } else {

        }
        if (isCargarNotificaciones) {
            CargaNovedades();
        } else if (isCargarInformes) {
            CargaUltimoInforme();
        }else{
          OcultarDivBloqueo();
        }
        CargarCotizacionesDestacadaHtml();
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
    $.ajax({
        type: "POST",
        url: wsUrlNovedades,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: CargarParametroEntradaNovedades(obtenerFechaParametroEntrada(-49), obtenerFechaParametroEntrada(0), ''),
        success: processSuccessNovedades,
        error: processError
    });
}
function processSuccessNovedades(data, status, req) {
    if (status == "success") {
        listaNovedades = ObtenerNovedades(req.responseText);
        if (window.localStorage) {
            var listaNovedadesAGuardar = JSON.stringify(listaNovedades);
            localStorage.setItem('storageListaNovedades', listaNovedadesAGuardar);
        } else {

        }              
        if (isCargarInformes) {
            CargaUltimoInforme();
        }else{
         OcultarDivBloqueo();
        }
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
        error: processError
    });
}
function CargarParametroEntradaInforme(pFechaDesde,pFechaHasta,pTipoConsulta){
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
        listaInformes =  ObtenerImforme(req.responseText);
        if (window.localStorage) {
            var listaInformesAGuardar = JSON.stringify(listaInformes);
            localStorage.setItem('storageListaInformes', listaInformesAGuardar);
        } else {

        }                
        //CargarInformeHtml();
        OcultarDivBloqueo();
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