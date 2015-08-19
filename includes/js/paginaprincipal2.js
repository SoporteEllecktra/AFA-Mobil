var swiper = null;
var porcentajeArriba = 0.55;
var porcentajeAbajo = 0.45;

$(document).ready(function () {
	// Define if its device is a mobile
	if (navigator.userAgent.match(/(Mobile|iPhone|iPod|iPad|Android|BlackBerry)/)) {
		storage['deviceready'] = 'no';
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		getUpdates();
	}
});

function onclikAcodeon() {
    //alert('Ok');
}

function renderLeadingPricesData() {
	if (!storage["leadingPrices"]) {
		processError('', 1003, '');
	}
	var leadingPricesObject = storage["leadingPrices"];
	var leadingPrices = JSON.parse(leadingPricesObject);

	if (!leadingPrices || (leadingPrices && leadingPrices.length == 0)) {
		processError('', 1004, '');
		return;
	}

	var html = '<div class="panel_destacados" id="Scroll_V">';
		html += '<div class="destacados">';
			html += '<ul class="titulo">';
				html += '<li class="col1">PRODUCTO</li>';
				html += '<li class="col2">PUERTO</li>';
				html += '<li class="col3">PRECIO P/TN</li>';
			html += '</ul>';

    $(leadingPrices).each(function () {
		html += '<ul class="producto" onclick="setInformationsProduct(' + this.codigoProducto + ')">';
			html += '<li class="col1">' + this.descripcionProducto.toUpperCase() + '</li>';
			html += '<li class="col2">' + this.descripcionPuerto + '</li>';

			var priceClass = 'grey';
			if (this.variacion == '-') {
				priceClass = 'red';
			} else if (this.variacion == '+') {
				priceClass = 'green';
			}

			html += '<li class="col3"><span class="' + priceClass + '">' + this.abreviaturaMoneda + ' ' + this.valorString + '</span></li>';
		html += '</ul>';

		html += '<div id="' + this.codigoProducto + '_details" class="detalles"></div>';
    });
	
		html += '</div>';
	html += '</div>';

    html += '<div class="btn_vermas">+ VER M&Aacute;S</div>';

    $('#leadingPrices').html(html);

	//OcultarDivBloqueo();
	timeOutCallbacks[0] = 1;
}

function setInformationsProduct(productCode) {
	renderInformationsPrices(productCode);
    //renderLastPrices(productCode);
}

function renderLastPricesData() {
	if (!storage["lastPrices"]) {
			processError('', 1005, '');
	}
	var lastPricesObject = storage["lastPrices"];
	var lastPrices = JSON.parse(lastPricesObject);

	if (!lastPrices || (lastPrices && lastPrices.length == 0)) {
		processError('', 1006, '');
		return;
	}

    var resultadoDiv = '';
    if (lastPrices.length > 0) {
        resultadoDiv += '<div id="divParteFijaCotizacionHistorica" >'; // div parte fija
        resultadoDiv += '<div class="row">';
        resultadoDiv += '<div class="col-xs-11 colHistoricoTitulo">';
        resultadoDiv += 'Ultimas cotizaciones: ' + lastPrices[0].descripcionProducto.toUpperCase();
        resultadoDiv += '</div>';
        //
        resultadoDiv += '<div class="col-xs-1 cssAmpliarAchicar" >'; // onclick="onclickFullScreenCotizacionesHistorica()"
        resultadoDiv += '</div>';
        //
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="row cssHistoricoEncabezado">';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoFecha">';
        resultadoDiv += 'FECHA';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoPrecio">';
        resultadoDiv += 'PRECIO P/TN';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';

        resultadoDiv += '</div>'; // fin div parte fija

        resultadoDiv += '<div id="divParteScrollCotizacionHistorica" >'; // div scroll
        var indexHistorico = -1;
        $(lastPrices).each(function () {
            indexHistorico++;
            var strHtmlColorFondo = '';
            if (indexHistorico % 2 == 0) {
                strHtmlColorFondo = ' cssHistoricoImpar ';
            }
            resultadoDiv += '<div class="row cssHistorico ' + strHtmlColorFondo + '">';
            resultadoDiv += '<div class="col-xs-6 colHistoricoFecha"><span style="opacity:1;">';
            resultadoDiv += obtenerFechaMostrar(this.fechaCotizacion);
            resultadoDiv += '</span></div>';
            resultadoDiv += '<div class="col-xs-6 colHistoricoPrecio">';

            resultadoDiv += this.abreviaturaMoneda + ' ' + this.valorString;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
        resultadoDiv += '</div>'; // fin div scroll
    } else {
        resultadoDiv += '<div id="divParteFijaCotizacionHistorica" >'; // div parte fija
        resultadoDiv += '<div class="divNoSeEncuentraRegistro" >'; // 
        resultadoDiv += 'NADAAAAA';
        resultadoDiv += '</div>'; // 
        resultadoDiv += '</div>'; // fin div scroll
    }
    var isAgregarSlides2 = true;
    for (var i = 0; i < swiper.slides.length; i++) {
        if (swiper.slides[i].id == 'swiper-slide2') {
            isAgregarSlides2 = false;
            break;
        }
    }
    if (isAgregarSlides2) {
        swiper.appendSlide('<div id="swiper-slide2" class="swiper-slide">' + resultadoDiv + '</div>');
    } else {
        $('#swiper-slide2').html(resultadoDiv);
    }
    if (lastPrices.length > 0) {
        porcentajeArriba = 0.55;
        porcentajeAbajo = 0.45;
        //onresizeBody();
    }
}

function CargarInformeCierreMercado() {
	if (!listaInformes) {
		processError('', 1007, '');
		return;
	}

    var isTimeoutInformeCierreMercado = true;
	if (listaInformes.length > 0) {
		isTimeoutInformeCierreMercado = false;
		var indexSlide3 = -1;
		for (var i = 0; i < swiper.slides.length; i++) {
			if (swiper.slides[i].id == 'swiper-slide3') {
				indexSlide3 = i;
			}
		}
		/*if (indexSlide3 == -1) {
			swiper.appendSlide('<div id="swiper-slide3" class="swiper-slide">' + CargarInformeHtml() + '</div>');
		} else {
			$('#swiper-slide3').html(CargarInformeHtml());
		}*/
	}

    if (isTimeoutInformeCierreMercado) {
        setTimeout(function () {
            CargarInformeCierreMercado();
        }, 115);
    }
}

function onclickVerMas() {
    window.location.href = "todascotizaciones.html";
}

function renderNewsData() {
	if (!storage["notifications"]) {
			processError('', 1008, '');
	}
	var notificationsObject = storage["notifications"];
	var notifications = JSON.parse(notificationsObject);

    var html = '<div class="novedades bkg_campo">';
		html += '<span class="toggle up"></span>';
			html += '<ul class="news">';

	if (!notifications || (notifications && notifications.length == 0)) {
		html = '';
	}

	$(notifications).each(function () {
		html += '<li class="col1">';
			if (this.url != '') {
				html += '<a href="javascript:loadURL(\'' + this.url + '\');" >';
					html += '<img src="icono-doc.png">';
				html += '</a>';
			} else {
				html += '<img src="icono-doc.png">';
			}
		html += '</li>';
		
		html += '<li class="col2">';
			html += '<h3>' + this.titulo + '</h3>';
			html += '<span class="date">' + obtenerFechaMostrar(this.fecha) + '</span>';
			html += '<span class="tag">' + this.descripcionCategoria + '</span>';
			html += '<p>' + this.descripcion + '</p>';
		html += '</li>';
	});

		html += '</ul>';
	html += '</div>';

	$('#slider_1').html(html);
}

f/*unction CargarInformeHtml() {
	if (!listaInformes) {
		processError('', 1009, '');
		return;
	}

    var informesHtml = '';
    for (var i = 0; i < listaInformes.length; i++) {
        //alert(listaInformes[i].titulo);
        informesHtml += '<div id="divInformeTitulo" class="cssInformeTitulo">' + listaInformes[i].titulo + '</div>';
        informesHtml += '<div id="divInformeFecha" class="cssInformeFecha">' + obtenerFechaMostrar(listaInformes[i].fecha) + '</div>';
        informesHtml += '<div id="divInformeDescripcion" class="cssInformeDescripcion">' + listaInformes[i].texto + '</div>';
        //informesHtml += ;+ '<br/>' + '<a href="javascript:loadURL(\''+ 'http://www.ejemplo.com/archivo.pdf' +'\');" >pdf </a>' 
        break;
    }
    return informesHtml;
}*/

function onclickFullScreenNovedades() {
    window.location.href = "novedades.html";
}

function onclickFullScreenCotizacionesHistorica() {
    window.location.href = "todascotizacioneshistorica.html";
}

function onclickFullScreenButtonAmpliar() {
    if (swiper.slides[swiper.activeIndex].id == 'swiper-slide1') {
        window.location.href = "novedades.html";
    } else if (swiper.slides[swiper.activeIndex].id == 'swiper-slide2') {
        window.location.href = "todascotizacioneshistorica.html";
    } else if (swiper.slides[swiper.activeIndex].id == 'swiper-slide3') {
        window.location.href = "informe.html";
    }
}

function savePricesData(keyStorage, xmlText) {
    var prices = [];
	var maxUtcValue = 0;
	var maxDate = '';

    $(xmlText).find('cotizaciones').each(function () {
        var obj = new price();
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
        prices.push(obj);
 
		if (keyStorage == 'leadingPrices') {
			// fechaCotizacion format: yyyy-mm-ddThh:mm:ss-xx:xx where +/-xx:xx is GMT zone time value (-03:00 for Argentina)
			maxDate = obj.fechaCotizacion;
			var fechaData = obj.fechaCotizacion.split('T');

			var fechaPartes = fechaData[0].split('-');
			var fecha = fechaPartes[2]+'/'+fechaPartes[1]+'/'+fechaPartes[0]; // new format: dd/mm/yyyy
			var horaPartes = fechaData[1].split('-');
			var newUtcValue = obtenerFechaUTC(fecha, horaPartes[0]);
			if (newUtcValue > maxUtcValue) {
				maxUtcValue = newUtcValue;
				maxDate = fecha;
			}
		}
    });

	storage[keyStorage] = JSON.stringify(prices);
}

function saveNewsData(keyStorage, textXML) {
    var notifications = [];
    $(textXML).find('notificaciones').each(function () {
        var obj = new notification();
        obj.codigoNotificacion = parseInt($(this).find('codigoNotificacion').text());
        obj.fecha = $(this).find('fecha').text();
        obj.titulo = $(this).find('titulo').text();
        obj.descripcion = $(this).find('descripcion ').text();
        obj.url = $(this).find('url').text();
        obj.codigoCategoria = parseInt($(this).find('codigoCategoria').text());
        obj.descripcionCategoria = $(this).find('descripcionCategoria').text();

        notifications.push(obj);
    });

	storage[keyStorage] = JSON.stringify(notifications);
}

function renderLeadingPrices(loadFromWS) {
	if (loadFromWS) {
		var body = getPricesBodyRequest(1, 14, obtenerFechaParametroEntrada(0), '', '', '', '', '');
		var request = getRequest(body);
		getInformationFromWS(pricesURL, request, 'leadingPrices', savePricesData, renderLeadingPricesData);
	} else {
		renderLeadingPricesData();
	}
}

function getPricesBodyRequest(priceCode, customerCode, from, to, orderType, product, port, money) {
	var body = '<ser:consultaCotizacionProductoPuertoMonedaOrdenada>';

	if (priceCode != '') {
        body += '<codigoTipoCotizacion>' + priceCode + '</codigoTipoCotizacion>';
    }
    if (customerCode != '') {
        body += '<codigoTipoCliente>' + customerCode + '</codigoTipoCliente>';
    }
    if (from != '') {
        body += '<fechaDesde>' + from + '</fechaDesde>';
    }
    if (orderType != '') {
        body += '<tipoOrden>' + orderType + '</tipoOrden>';
    }
    if (to != '') {
        body += '<fechaHasta>' + to + '</fechaHasta>';
    }
    if (product != '') {
        body += '<productos>' + product + '</productos>';
    }
    if (port != '') {
        body += '<puertos>' + port + '</puertos>';
    }
    if (money != '') {
        body += '<monedas>' + money + '</monedas>';
    }

	body += '</ser:consultaCotizacionProductoPuertoMonedaOrdenada>';

    return body;
}

function renderNews(loadFromWS) {
	if (loadFromWS) {
		var body = getNewsBodyRequest('', '', '');
		var request = getRequest(body);
		getInformationFromWS(notificationsURL, request, 'notifications', saveNewsData, renderNewsData);
	} else {
		renderNewsData();
	}
}

function getNewsBodyRequest(from, to, categoryCode) {
    var body = '<ser:consultaNotificaciones>';

    if (from != '') {
        body += '<fechaDesde>' + from + '</fechaDesde>';
    }
    if (to != '') {
        body += '<fechaHasta>' + to + '</fechaHasta>';
    }
    if (categoryCode != '') {
        body += '<codigoCategoria>' + categoryCode + '</codigoCategoria>';
    }

    body += '</ser:consultaNotificaciones>';
	
	return body;
}

function saveAllPrices(loadFromWS) {
	if (loadFromWS) {
		var body = getPricesBodyRequest(1, 11, obtenerFechaParametroEntrada(0), '', '', '', '', '');
		var request = getRequest(body);
		getInformationFromWS(pricesURL, request, 'allPrices', savePricesData, function() {;});
	}
}

function renderReports(loadFromWS) {
	if (loadFromWS) {
		var body = getReportsBodyRequest('', '', 1);
		var request = getRequest(body);
		getInformationFromWS(reportsURL, request, 'reports', saveReportsData, renderReportsData);
	}
}

function renderReportsData() {
	if (!storage["reports"]) {
		processError('', 1003, '');
	}
	var reportsObject = storage["reports"];
	var reports = JSON.parse(reportsObject);

	if (!reports) {
		processError('', 1004, '');
		return;
	}

	var html = '<div class="informe bkg_campo">';
		html += '<span class="toggle up"></span>';
			html += '<ul class="info">';

    $(reports).each(function () {
        html += '<li class="col1">';
			html += '<h3>' + this.titulo + '</h3>';
			html += '<div>' + obtenerFechaMostrar(this.fecha) + '</div>';
			html += '<p>' + this.texto + '</p>';
		html += '</li>';
    });
					
		html += '</ul>';
	html += '</div>';

	$('#slider_2').html(html);
}

function getReportsBodyRequest(from, to, requestType) {
    var body = '<ser:consultaInformes>';

    if (from != '') {
        body += '<fechaDesde>' + from + '</fechaDesde>';
    }
    if (to != '') {
        body += '<fechaHasta>' + to + '</fechaHasta>';
    }
    if (requestType != '') {
        body += '<tipoConsulta>' + requestType + '</tipoConsulta>';
    }

    body += '</ser:consultaInformes>';

    return body;
}

function saveReportsData(keyStorage, textXML) {
    var reports = [];
    $(textXML).find('informes').each(function () {
        var obj = new report();
        obj.codigoInforme = parseInt($(this).find('codigoInforme').text());
        obj.fecha = $(this).find('fecha').text();
        obj.titulo = $(this).find('titulo').text();
        obj.texto = $(this).find('texto').text();
        obj.url = $(this).find('url').text();

		reports.push(obj);
    });

	storage[keyStorage] = JSON.stringify(reports);
}

// Esta parte es la reactiva----on demand web services
function renderLastPrices(productCode) {
	var body = getPricesBodyRequest(1, 11, obtenerFechaParametroEntrada(-15), obtenerFechaParametroEntrada(0), 9, productCode, '', '');
	var request = getRequest(body);
	getInformationFromWS(pricesURL, request, 'lastPrices', savePricesData, renderLastPricesData);
}


function renderInformationsPrices(productCode) {
	var body = getPricesBodyRequest(1, 11, obtenerFechaParametroEntrada(0), '', '', productCode, '', '');
	var request = getRequest(body);
	getInformationFromWS(pricesURL, request, 'informationsPrice', savePricesData, renderInformationsPricesData);
}

function renderInformationsPricesData() {
	if (!storage["informationsPrice"]) {
			processError('', 1010, '');
	}
	var informationsPricesObject = storage["informationsPrice"];
	var informationsPrices = JSON.parse(informationsPricesObject);

    var html = '<div id="divRowParteScrollNovedades">'; // parte scroll

	if (!informationsPrices || (informationsPrices && informationsPrices.length == 0)) {
		resultadoDiv = '';
	}

			resultadoDiv += '<div class="accordion-inner">';

					resultadoDiv += '<div class="row">';

						resultadoDiv += '<div class="row cssDetalleEncabezado">';
							resultadoDiv += '<div class="col-xs-4">';
								resultadoDiv += 'PUERTO';
							resultadoDiv += '</div>';
							resultadoDiv += '<div class="col-xs-4">';
								resultadoDiv += 'PRECIO P/TN';
							resultadoDiv += '</div>';
							resultadoDiv += '<div class="col-xs-4">';
								resultadoDiv += 'OBSERVACI&#211;N';
							resultadoDiv += '</div>';
						resultadoDiv += '</div>';
						
		// fin Encabezado detalle
        var iDetalle = 0;
		var productCode = informationsPrices[0].codigoProducto;

	$(informationsPrices).each(function () {
            var strHtmlColorFondo = '';
            if (iDetalle % 2 != 0) {
                strHtmlColorFondo = ' cssDetalleImpar ';
            }
            resultadoDiv += '<div class="row cssDetalle' + strHtmlColorFondo + '">';
            resultadoDiv += '<div class="col-xs-4 colDetalleDescripcionPuerto">';
            resultadoDiv += this.descripcionPuerto;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-4 colDetallePrecio">';

            resultadoDiv += this.abreviaturaMoneda + ' ' + this.valorString;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-4 colDetalleObservacion">';
            resultadoDiv += this.observacion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
			
        resultadoDiv += '</div>';
		iDetalle++;
	});

	        // fin detalle
	resultadoDiv += '</div>';
	resultadoDiv += '</div>';
	
	$('#collapse' + productCode).html(resultadoDiv);
	
	
}