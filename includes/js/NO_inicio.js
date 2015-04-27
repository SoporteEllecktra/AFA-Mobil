var wsUrl = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var cotizaciones = [];

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
}
function CargarResultadoObjetoJavascript(pXML) {
    cotizaciones = [];
    $(pXML).find('cotizaciones').each(function () {
        var obj = new cotizacion();
        obj.fechaCotizacion = $(this).find('fechaCotizacion').text();
        obj.codigoMoneda = parseInt($(this).find('codigoMoneda').text());
        obj.descripcionMoneda = $(this).find('descripcionMoneda').text();
        obj.codigoTipoCotizacion = parseInt($(this).find('codigoTipoCotizacion').text());
        obj.descripcionTipoCotizacion = $(this).find('descripcionTipoCotizacion').text();
        obj.codigoPuerto = parseInt($(this).find('codigoPuerto').text());
        obj.descripcionPuerto = $(this).find('descripcionPuerto').text();
        obj.codigoProducto = parseInt($(this).find('codigoProducto').text());
        obj.descripcionProducto = $(this).find('descripcionProducto').text();
        obj.valor = parseInt($(this).find('valor').text());
        obj.observacion = $(this).find('observacion').text();
        cotizaciones.push(obj);
    });
}
function obtenerObjetoJavascriptANT(pXML) {
    CargarResultadoObjetoJavascript(pXML);
    var resultadoDiv = '';
    $(cotizaciones).each(function () {
        resultadoDiv += '<div>Fecha Cotizacion: ' + this.fechaCotizacion + '</div>';
        resultadoDiv += '<div>Codigo Moneda: ' + this.codigoMoneda + '</div>';
        resultadoDiv += '<div>descripcionMoneda: ' + this.descripcionMoneda + '</div>';
        resultadoDiv += '<div>codigoTipoCotizacion: ' + this.codigoTipoCotizacion + '</div>';
        resultadoDiv += '<div>descripcionTipoCotizacion: ' + this.descripcionTipoCotizacion + '</div>';
        resultadoDiv += '<div>codigoPuerto: ' + this.codigoPuerto + '</div>';
        resultadoDiv += '<div>descripcionPuerto: ' + this.descripcionPuerto + '</div>';
        resultadoDiv += '<div>codigoProducto: ' + this.codigoProducto + '</div>';
        resultadoDiv += '<div>descripcionProducto: ' + this.descripcionProducto + '</div>';
        resultadoDiv += '<div>valor: ' + this.valor + '</div>';
        resultadoDiv += '<div>observacion: ' + this.observacion + '</div>';
        resultadoDiv += '<br/>' + '<br/>';
    });
    $('#slide01').html(resultadoDiv);

}
function obtenerObjetoJavascriptANT_01(pXML) {
    CargarResultadoObjetoJavascript(pXML);
    var resultadoDiv = '';
    resultadoDiv += '<div class="row">';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PRODUCTO</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PUERTO</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PRECIO P/TN</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '</div>';
    $(cotizaciones).each(function () {


        resultadoDiv += '<div class="row">';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionMoneda;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionPuerto;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
        resultadoDiv += '</div>';

        resultadoDiv += '</div>';
    });
    //   resultadoDiv +=  '</div>';
    $('#slide01').html(resultadoDiv);

}
function obtenerObjetoJavascript(pXML) {
    CargarResultadoObjetoJavascript(pXML);
    var resultadoDiv = '';
    resultadoDiv += '<div class="row">';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PRODUCTO</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PUERTO</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += '<b>PRECIO P/TN</b>';
    resultadoDiv += '</div>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="accordion" id="accordion2">';
    var index = 0;
    $(cotizaciones).each(function () {

        index++;
        resultadoDiv += '<div class="accordion-group">';
        resultadoDiv += '<div class="accordion-heading">';
        resultadoDiv += '<div class="accordion-toggle" href="#collapse' + index + '" data-toggle="collapse" data-parent="#accordion2">';

        resultadoDiv += '<div class="row">';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionMoneda;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionPuerto;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4">';
        resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; // '<div class="row">';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; //'<div class="accordion-heading">';
        resultadoDiv += '<div class="accordion-body collapse" id="collapse' + index + '" style="height: 0px;">';
        resultadoDiv += '<div class="accordion-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'; resultadoDiv += 'enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate'; resultadoDiv += 'velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>';
        resultadoDiv += '</div>';

        resultadoDiv += '</div>'; //'<div class="accordion-group">';
    });
    resultadoDiv += '</div>';
    $('#slide01').html(resultadoDiv);

    $('.collapse').on('show.bs.collapse', function () {
        $otherPanels = $(this).parents('.accordion-group').siblings('.accordion-group');
        $('.collapse', $otherPanels).removeClass('in');
    });
}

function CargarParametroEntrada(pCodigoTipoCotizacion, pCodigoTipoCliente, pFechaDesde, pFechaHasta, pProductos, pPuertos, pMonedas) {

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
function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}
function obtenerFecha(pDia) {
    var milisegundos = parseInt(pDia * 24 * 60 * 60 * 1000);
    var fecha = new Date();
    var tiempo = fecha.getTime();
    fecha.setTime(tiempo + milisegundos);

    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return toString00(dia) + toString00(mes) + anio.toString();
}
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: wsUrl,
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
        data: CargarParametroEntrada(1, 15, obtenerFecha(0), '', '', '', ''),
        success: processSuccessDetalleCotizacion,
        error: processError
    });
});

function processSuccessDetalleCotizacion(data, status, req) {
    if (status == "success") {
        // alert(req.responseText);
        //('#response').html(req.responseText);
        obtenerObjetoJavascript(req.responseText);
    }

    //obtenerObjetoJavascript(req.responseText);
}
function processError(data, status, req) {
    alert('Error');
}
