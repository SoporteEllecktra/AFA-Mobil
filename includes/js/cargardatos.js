/*var wsUrlCotizacion = "http://concentrador.afascl.coop:38080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlCotizacionHistorico = "http://concentrador.afascl.coop:38080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlNovedades = "http://concentrador.afascl.coop:38080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlAuditoria = "http://concentrador.afascl.coop:38080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsUrlInforme = "http://concentrador.afascl.coop:38080/Concentrador/webservices/InformeService?wsdl/";
var wsUrlGuardarTelefono = "http://concentrador.afascl.coop:38080/Concentrador/webservices/TelefonoService?wsdl/";*/

var wsUrlCotizacion = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlCotizacionHistorico = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsUrlNovedades = "http://concentrador.afascl.coop:8080/Concentrador/webservices/NotificacionService?wsdl/";
var wsUrlAuditoria = "http://concentrador.afascl.coop:8080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsUrlInforme = "http://concentrador.afascl.coop:8080/Concentrador/webservices/InformeService?wsdl/";
var wsUrlGuardarTelefono = "http://concentrador.afascl.coop:8080/Concentrador/webservices/TelefonoService?wsdl/";

//var wsUrlRegistracionTelefono = 'http://200.58.118.98:50002/registrationinfo/';
var wsUrlRegistracionTelefono = 'http://190.210.143.156:50002/registrationinfo/';

var cotizacionesDestacada = null;
var indexCotizacionesDestacada = null;
var listaTodasCotizaciones = null;
var listaNovedades = null;
var listaTablaModificaciones = null;
var listaInformes = null;

var isCargarCotizaciones = true;
var isCargarNotificaciones = true;
var isCargarInformes = true;

var telefonoDelUsuario = '';

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
    this.valorString = '';
    this.observacion = '';
    this.abreviaturaMoneda = '';
    this.variacion = '';
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
    this.url = '';
}

function FuncionInicio() {
    var isGuardarTelefono = false;
	if (window.localStorage) {
		if (localStorage.getItem("storageTelefono") == null) {
			isGuardarTelefono = isMobile();

			if (!isGuardarTelefono) {
				localStorage.setItem('storageTelefono', '');
			}
		}
		if (isGuardarTelefono) {
			window.location.href = "telefono.html";
		} else {
			CargarAuditoria();
		}
	} // Falta definir q pasa en caso de que no haya soporte al localStorage!!!
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
        // data: '{"username": "' + 'user' + '", "password" : "' + 'pass123' + '"}',        
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Password', 'pass123');
            xhr.setRequestHeader('Username', 'user');
        },
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
    window.location.href = "error.html?status=1";
}

function processSuccessGuardarTelefono(data, status, req) {
    if (status == "success") {
        var codigoRespuesta = 1;
        $(req.responseText).find('return').each(function () {
            codigoRespuesta = parseInt($(this).find('codigoResultado').text());
        });

        if (codigoRespuesta == 0) {
            localStorage.setItem('storageTelefono', telefonoDelUsuario);
        }
        $('#divFondoBloqueo').css('display', 'block');
        window.location.href = "index.html";
        //window.history.go(-1);
    }
}

function CargarAuditoria() {
    listaTablaModificaciones = null;
    $.ajax({
        type: "POST",
        url: wsUrlAuditoria,
        contentType: "application/xml; charset=utf-8",
        dataType: "xml",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        data: CargarParametroEntradaAuditoria(),
        success: processSuccessAuditoria,
        error: processErrorAuditoria
    });
}

function processSuccessAuditoria(data, status, req) {
	// codigoTabla == 1:"Cotizaciones", 2:"Notificaciones", 3:"Informes"   
	isCargarCotizaciones = false;
	isCargarNotificaciones = false;
	isCargarInformes = false;
	if (!req || (req && req.responseText.length == 0)) {
		processError('', '', '');
	}
	CargarResultadoAuditoriaJavascript(req.responseText);
	if (listaTablaModificaciones && (listaTablaModificaciones.length > 0)) {
		//alert("HAY #UPDATES == " + listaTablaModificaciones.length);
		for (var i = 0; i < listaTablaModificaciones.length; i++) {
			//alert(i+1);
			//console.log(listaTablaModificaciones[i]);
			if (listaTablaModificaciones[i].codigoTabla == 1) { // Cotizaciones
				if (!localStorage.getItem("storageTablaModificaciones1")) {
					//alert("HAY UPDATES COTIS SIN ALMACENAR");
					isCargarCotizaciones = true;
					var tablaModificacionesCotizacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
					localStorage.setItem('storageTablaModificaciones1', tablaModificacionesCotizacionesAGuardar);
				} else {
					var fechaCotizacionesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
					var fechaCotizacionesGuardada = localStorage.getItem("storageTablaModificaciones1");
					var TablaModificacionesCotizaciones = eval('(' + fechaCotizacionesGuardada + ')');
					var fechaCotizacionesUTC = obtenerFechaUTC(TablaModificacionesCotizaciones.fecha, TablaModificacionesCotizaciones.hora);
					if (fechaCotizacionesNuevaUTC > fechaCotizacionesUTC) {
						//alert("HAY UPDATES COTIS NUEVAS");
						isCargarCotizaciones = true;
						// Solo se envía un update del tipo 1
						var tablaModificacionesCotizacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
						localStorage.setItem('storageTablaModificaciones1', tablaModificacionesCotizacionesAGuardar);
					}
				}
			} else 
			if (listaTablaModificaciones[i].codigoTabla == 2) { //Notificaciones
				if (localStorage.getItem("storageTablaModificaciones2") == null) {
					//alert("HAY UPDATES NOTIF SIN ALMACENAR");
					isCargarNotificaciones = true;
					var tablaModificacionesNotificacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
					localStorage.setItem('storageTablaModificaciones2', tablaModificacionesNotificacionesAGuardar);
				} else {
					var fechaNotificacionesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
					var fechaNotificacionesGuardada = localStorage.getItem("storageTablaModificaciones2");
					var TablaModificacionesNotificaciones = eval('(' + fechaNotificacionesGuardada + ')');
					var fechaNotificacionesUTC = obtenerFechaUTC(TablaModificacionesNotificaciones.fecha, TablaModificacionesNotificaciones.hora);
					if (fechaNotificacionesNuevaUTC > fechaNotificacionesUTC) {
						//alert("HAY UPDATES NOTIF NUEVAS");
						isCargarNotificaciones = true;
						var tablaModificacionesNotificacionesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
						localStorage.setItem('storageTablaModificaciones2', tablaModificacionesNotificacionesAGuardar);
					}
				}
			} else
			if (listaTablaModificaciones[i].codigoTabla == 3) { //Informes
				if (localStorage.getItem("storageTablaModificaciones3") == null) {
					//alert("HAY UPDATES INFORMES SIN ALMACENAR");
					isCargarInformes = true;
					var tablaModificacionesInformesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
					localStorage.setItem('storageTablaModificaciones3', tablaModificacionesInformesAGuardar);
				} else {
					var fechaInformesNuevaUTC = obtenerFechaUTC(listaTablaModificaciones[i].fecha, listaTablaModificaciones[i].hora);
					var fechaInformesGuardada = localStorage.getItem("storageTablaModificaciones3");
					var TablaModificacionesInformes = eval('(' + fechaInformesGuardada + ')');
					var fechaInformesUTC = obtenerFechaUTC(TablaModificacionesInformes.fecha, TablaModificacionesInformes.hora);
					if (fechaInformesNuevaUTC > fechaInformesUTC) {
						//alert("HAY UPDATES INFORMES NUEVOS");
						isCargarInformes = true;
						var tablaModificacionesInformesAGuardar = JSON.stringify(listaTablaModificaciones[i]);
						localStorage.setItem('storageTablaModificaciones3', tablaModificacionesInformesAGuardar);
					}
				}
			}
		}
		// NO hay updates o lo nuevo ya se tiene guardado, obtener la info desde lo almacenado
		// Hay que tener en cuenta q si NO hay soporte al Local Storage,
		// al startup de la app esto debe dar error porque NO hay nada almacenado
		if (!window.localStorage) {
			processError('', '', '');
		}
		if (!isCargarCotizaciones) {
			if (!localStorage.getItem("storageListaCotizacionesDestacada")) {
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
	}

	/*isCargarCotizaciones = true;
	listaNovedades = true;
	listaInformes = true;*/
	//$.when(
	CargaCotizacionDestacada(); 
	CargaNovedades(); 
	CargaTodasCotizaciones(); 
	CargaUltimoInforme();
	//).done(funDoneAjax);
}

/*function funDoneAjax(a, b, c, d) {
    // a es un array con los argumentos que recibiria de la primer request,
    // b lo mismo pero para la segunda request.
    //console.log(a[2].responseText);
    //console.log(b[2].responseText);
}*/

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
		if (obj.codigoTabla != 1 && obj.codigoTabla != 2 && obj.codigoTabla != 3) {
			processError('', '', '');
			return;
		}

        obj.fecha = $(this).find('fecha').text();
		if (!obj.fecha || 
			(obj.fecha && obj.fecha.length == 0) || 
			(obj.fecha && obj.fecha.length > 0 && !isValidDate(obj.fecha))) {
			processError('', '', '');
			return;
		}

		obj.hora = $(this).find('hora').text();
		if (!obj.hora || obj.hora.length == 0) {
			processError('', '', '');
			return;
		}

        listaTablaModificaciones.push(obj);
    });
}

function CargaCotizacionDestacada() {
    if (isCargarCotizaciones) {
        $.ajax({
            type: "POST",
            url: wsUrlCotizacion,
            contentType: "application/xml; charset=utf-8",
            dataType: "xml",
            crossDomain: true,
            xhrFields: { withCredentials: true },
            //data: CargarParametroEntradaCotizaciones(1, 14, obtenerFechaParametroEntrada(0), '', '', '', ''),
            data: CargarParametroEntradaCotizaciones_Ordenada(1, 14, obtenerFechaParametroEntrada(0), '', '', '', '', ''),
            success: processSuccessCotizacionDestacada,
            error: processErrorCotizacionDestacada
        });
    } else {
        CargarCotizacionesDestacadaHtml();
    }
}

function processSuccessCotizacionDestacada(data, status, req) {
    CargarResultadoCotizacionDestacadoJavascript(req.responseText);
}

/*function loadInfoOffline(loadAuditInfo, loadNews) {
	if (loadAuditInfo) {
		if (localStorage.getItem("storageListaCotizacionesDestacada") == null) {
			processError(data, status, req);
			return;
		} else {
			var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
			cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
		}
		if (localStorage.getItem("storageListaTodasCotizaciones") == null) {
			processError(data, status, req);
			return;
		} else {
			var listaTodasCotizacionesGuardada = localStorage.getItem("storageListaTodasCotizaciones");
			listaTodasCotizaciones = eval('(' + listaTodasCotizacionesGuardada + ')');
		}

		if (localStorage.getItem("storageTablaModificaciones1") == null) {
			processError(data, status, req);
			return;
		} else {
			var tablaModificaciones1Guardada = localStorage.getItem("storageTablaModificaciones1");
			listaTablaModificaciones = eval('(' + tablaModificaciones1Guardada + ')');
		}

		CargarCotizacionesDestacadaHtml();
	}

	if (loadNews) {
		if (localStorage.getItem("storageListaInformes") == null) {
			processError(data, status, req);
			return;
		} else {
			var listaInformesGuardada = localStorage.getItem("storageListaInformes");
			listaInformes = eval('(' + listaInformesGuardada + ')');
		}

		if (localStorage.getItem("storageListaNovedades") == null) {
			processError(data, status, req);
			return;
		} else {
			var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
			listaNovedades = eval('(' + listaNovedadesGuardada + ')');
		}

		CargarNovedadesHtml();
	}
}*/
/* Inicio Error */
function processError(data, status, req) {
    //OcultarDivBloqueo();
    window.location.href = "error.html";
}
function processErrorAuditoria(data, status, req) {
    //alert('CargarAuditoria Error');
	/*if (window.localStorage) {
		loadInfoOffline(true, true);
	} else {*/
		processError(data, status, req);
	//}
}
function processErrorCotizacionDestacada(data, status, req) {
	/*if (window.localStorage) {
		loadInfoOffline(true, false);
	} else {*/
		processError(data, status, req);
	//}
}
function processErrorCargaConIndiceDetalleCotizacion(data, status, req) {
    processError(data, status, req);
}
function processErrorCotizacionHistoricaConIndiceDetacado(data, status, req) {
    processError(data, status, req);
}
function processErrorNovedades(data, status, req) {
	/*if (window.localStorage) {
		loadInfoOffline(false, true);
	} else {*/
		processError(data, status, req);
	//}
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
	var maxUtcValue = 0;
	var maxDate = '';
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
        obj.valor = parseFloat($(this).find('valor').text());
        obj.valorString = convertValorImporte(obj.valor);
        obj.observacion = $(this).find('observacion').text();
        obj.abreviaturaMoneda = $(this).find('abreviaturaMoneda').text();
        obj.variacion = $(this).find('variacion').text();
        cotizacionesDestacada.push(obj);
 
		// fechaCotizacion format: yyyy-mm-ddThh:mm:ss-xx:xx where +/-xx:xx is GMT zone time value (-03:00 for Argentina)
		maxDate = obj.fechaCotizacion;
		var fechaData = obj.fechaCotizacion.split('T');
		var fecha = fechaData[0].replace(/-/g, '/');
		var newUtcValue = obtenerFechaUTC(fecha, fechaData[1]);
		if (newUtcValue > maxUtcValue) {
			maxUtcValue = newUtcValue;
			maxDate = obj.fechaCotizacion;
		}
    });

    if (cotizacionesDestacada.length > 0) {
        // Inicio Cargar Fecha Actual
        grabarStorageFechaCotizacion(obtenerFechaMostrarDsdCotizacionesDestacada(maxDate));
        // Fin Cargar Fecha Actual
        indexCotizacionesDestacada = 0;
        CargaConIndiceDetalleCotizacion(indexCotizacionesDestacada);
    }
}

function CargarParametroEntradaCotizaciones_Ordenada(pCodigoTipoCotizacion, pCodigoTipoCliente, pFechaDesde, pFechaHasta, pTipoOrden, pProductos, pPuertos, pMonedas) {
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>';
    soapRequest += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios" >';
    soapRequest += '<soapenv:Header/>';
    soapRequest += '<soapenv:Body>';
    soapRequest += '<ser:consultaCotizacionProductoPuertoMonedaOrdenada>';
    if (pCodigoTipoCotizacion != '') {
        soapRequest += '<codigoTipoCotizacion>' + pCodigoTipoCotizacion + '</codigoTipoCotizacion>';
    }
    if (pCodigoTipoCliente != '') {
        soapRequest += '<codigoTipoCliente>' + pCodigoTipoCliente + '</codigoTipoCliente>';
    }
    if (pFechaDesde != '') {
        soapRequest += '<fechaDesde>' + pFechaDesde + '</fechaDesde>';
    }
    if (pTipoOrden != '') {
        soapRequest += '<tipoOrden>' + pTipoOrden + '</tipoOrden>';
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
    soapRequest += '</ser:consultaCotizacionProductoPuertoMonedaOrdenada>';
    soapRequest += '</soapenv:Body>';
    soapRequest += '</soapenv:Envelope>';

    return soapRequest;
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
        //data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(0), '', cotizacionesDestacada[pIndex].codigoProducto, '', ''),
        data: CargarParametroEntradaCotizaciones_Ordenada(1, 11, obtenerFechaParametroEntrada(0), '', '', cotizacionesDestacada[pIndex].codigoProducto, '', ''),
        success: processSuccessDetalleCotizacion,
        error: processErrorCargaConIndiceDetalleCotizacion
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
        obj.valor = parseFloat($(this).find('valor').text());
        obj.valorString = convertValorImporte(obj.valor);
        obj.observacion = $(this).find('observacion').text();
        obj.abreviaturaMoneda = $(this).find('abreviaturaMoneda').text();
        obj.variacion = $(this).find('variacion').text();
        cotizacionesDetalle.push(obj);
    });
    return cotizacionesDetalle;
}

function CargaCotizacionHistoricaConIndiceDetacado(pIndex) {
    //alert('CargaCotizacionHistoricaConIndiceDetacado');
    $.ajax({
        type: "POST",
        url: wsUrlCotizacionHistorico,
        contentType: "application/xml; charset=utf-8", //"text/xml",
        dataType: "xml",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        //data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(-10), obtenerFechaParametroEntrada(0), cotizacionesDestacada[pIndex].codigoProducto, cotizacionesDestacada[pIndex].codigoPuerto, ''),
        //"Por Fecha Descendente"
        //data: CargarParametroEntradaCotizaciones_Ordenada(1, 11, obtenerFechaParametroEntrada(-10), obtenerFechaParametroEntrada(0), 8, cotizacionesDestacada[pIndex].codigoProducto, cotizacionesDestacada[pIndex].codigoPuerto, ''),
        data: CargarParametroEntradaCotizaciones_Ordenada(1, 11, obtenerFechaParametroEntrada(-10), obtenerFechaParametroEntrada(0), 9, cotizacionesDestacada[pIndex].codigoProducto, '', ''),
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
        obj.valor = parseFloat($(this).find('valor').text());
        obj.valorString = convertValorImporte(obj.valor);
        obj.observacion = $(this).find('observacion').text();
        obj.abreviaturaMoneda = $(this).find('abreviaturaMoneda').text();
        obj.variacion = $(this).find('variacion').text();
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
				processError('', '', '');
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
            //data: CargarParametroEntradaCotizaciones(1, 11, obtenerFechaParametroEntrada(0), '', '', '', ''),
            data: CargarParametroEntradaCotizaciones_Ordenada(1, 11, obtenerFechaParametroEntrada(0), '', '', '', '', ''),
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
			processError('', '', '');
        }
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
        obj.valor = parseFloat($(this).find('valor').text());
        obj.valorString = convertValorImporte(obj.valor);
        obj.observacion = $(this).find('observacion').text();
        obj.abreviaturaMoneda = $(this).find('abreviaturaMoneda').text();
        obj.variacion = $(this).find('variacion').text();
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
            data: CargarParametroEntradaNovedades('', '', ''),
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
			processError('', '', '');
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
        listaInformes = ObtenerInforme(req.responseText);
        if (window.localStorage) {
            var listaInformesAGuardar = JSON.stringify(listaInformes);
            localStorage.setItem('storageListaInformes', listaInformesAGuardar);
        } else {
			processError('', '', '');
        }
    }
}

function ObtenerInforme(pXML) {
    var listaInformesAUX = [];
    $(pXML).find('informes').each(function () {
        var obj = new informes();
        obj.codigoInforme = parseInt($(this).find('codigoInforme').text());
        obj.fecha = $(this).find('fecha').text();
        obj.titulo = $(this).find('titulo').text();
        obj.texto = $(this).find('texto').text();
        obj.url = $(this).find('url').text();
        listaInformesAUX.push(obj);
    });
    return listaInformesAUX;
}