var wsUrlCotizacion = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlNovedades = "http://concentrador.afascl.coop:8080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlAuditoria = "http://concentrador.afascl.coop:38080/Concentrador/webservices/AuditoriaService?wsdl/";

var cotizacionesDestacada = null;
var indexCotizacionesDestacada = null;
var listaTodasCotizaciones = null;
//var indexCotizacionesDetalle = null;
var listaNovedades = null;

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
function CargarAuditoria_Prueba() {
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
        data: CargarParametroEntradaAuditoria_Prueba(),
        success: processSuccessAuditoria_Prueba,
        error: processError
    });
}
function processSuccessAuditoria_Prueba(data, status, req) {
    if (status == "success") {
   
        alert(req.responseText);
    }
}
function CargarParametroEntradaAuditoria_Prueba( ) {

    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaModificaciones/>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';
//    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">
//   <soapenv:Header/>
//   <soapenv:Body>
//      <ser:consultaModificaciones/>
//   </soapenv:Body>
//</soapenv:Envelope>

    return soapRequest;

}

function CargaDatosInicio() {
    //localStorage.removeItem("storageListaCotizacionesDestacada");
    //localStorage.removeItem("storageListaNovedades");
    CargarAuditoria_Prueba();
    if (!(localStorage.getItem("storageListaCotizacionesDestacada") == null)) {
       // alert(2);
        var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
        cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
        CargarCotizacionesDestacadaHtml();
        if (!(localStorage.getItem("storageListaNovedades") == null)) {
            var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
            listaNovedades = eval('(' + listaNovedadesGuardada + ')');
            CargarNovedadesHtml();
            OcultarDivBloqueo();
        } else {
            CargaNovedades();
        }
    } else {
       // alert(3);
        CargaCotizacionDestacada();
    }
   
//        var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
//        cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
//        CargarCotizacionesDestacadaHtml();
//        var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
//        listaNovedades = eval('(' + listaNovedadesGuardada + ')');
//        CargarNovedadesHtml();
//        OcultarDivBloqueo();
        //     CargaCotizacionDestacada();
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
        CargaNovedades();
//        if (!(localStorage.getItem("storageListaNovedades") === null)) {
//            var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
//            listaNovedades = eval('(' + listaNovedadesGuardada + ')');
//            CargarNovedadesHtml();
//            OcultarDivBloqueo();
//        } else {
//            CargaNovedades();
//        }
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
        CargarNovedadesHtml();
        OcultarDivBloqueo();
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