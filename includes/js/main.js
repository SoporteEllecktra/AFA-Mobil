$(document).ready(function () {
	// Define if its device is a mobile
	if (navigator.userAgent.match(/(Mobile|iPhone|iPod|iPad|Android|BlackBerry)/)) {
		storage['deviceready'] = 'no';
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		getUpdates();
	}
});

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

	var priceClass = '';
    $(leadingPrices).each(function () {
		html += '<ul class="producto" onclick="setInformationsProduct(' + this.codigoProducto + ')">';
			html += '<li class="col1">' + this.descripcionProducto.toUpperCase() + '</li>';
			html += '<li class="col2">' + this.descripcionPuerto + '</li>';

			priceClass = 'grey';
			if (this.variacion === '-') {
				priceClass = 'red';
			} else if (this.variacion === '+') {
				priceClass = 'green';
			}

			html += '<li class="col3"><span class="' + priceClass + '">' + this.abreviaturaMoneda + ' ' + this.valorString + '</span></li>';
		html += '</ul>';

		html += '<div class="details inactive" id="' + this.codigoProducto + '_details" style="display: none;"></div>';
    });
	
		html += '</div>';
	html += '</div>';

    html += '<div onclick="renderAllPricesData()" class="btn_vermas">+ VER M&Aacute;S</div>';

	var element = $('#leadingPrices');
    element.html(html);

	//resetPanelHeight('vertical', element.height(), 'vertical_content_scroller', vertical_scroll_object);
}

function setInformationsProduct(productCode) {
	renderInformationsPrices(productCode);
    renderLastPrices(productCode);
}

// VER MAS section
function renderAllPricesData() {
	if (!storage["allPrices"]) {
		processError('', 1005, '');
	}
	var allPricesObject = storage["allPrices"];
	var allPrices = JSON.parse(allPricesObject);

	if (!allPrices || (allPrices && allPrices.length == 0)) {
		processError('', 1006, '');
		return;
	}

	var html = '<div class="panel_vermas">';
		html += '<div class="head">';
			html += '<h2>Cotizaciones</h2>';
			html += '<span id="all_prices" onclick="togglePanelHeight(this.id, true);" class="toggle up"></span>';
			html += '<ul class="titulo">';
				html += '<li class="col1">PRODUCTO</li>';
				html += '<li class="col2">PUERTO</li>';
				html += '<li class="col3">PRECIO P/TN</li>';
				html += '<li class="col4">OBSERVACI&Oacute;N</li>';
			html += '</ul>';

			html += '<div class="detalles bkg_campo">';

	var iPrices = 0;
	var className = '';
    $(allPrices).each(function () {
		className = (iPrices % 2 == 0) ? ' par' : '';
		
		html += '<ul class="producto' + className + '" onclick="setInformationsProduct(' + this.codigoProducto + ')">';
			html += '<li class="col1">' + this.descripcionProducto.toUpperCase() + '</li>';
			html += '<li class="col2">' + this.descripcionPuerto + '</li>';
			html += '<li class="col3">' + this.abreviaturaMoneda + ' ' + this.valorString + '</li>';
			html += '<li class="col4">' + this.observacion + '</li>';
		html += '</ul>';

		iPrices++;
    });

			html += '</div>';
		html += '</div>';
	html += '</div>';

    $('#slider').html(html);
	togglePanelHeight('all_prices', false);
}

function renderLastPricesData() {
	if (!storage["lastPrices"]) {
			processError('', 1007, '');
	}
	var lastPricesObject = storage["lastPrices"];
	var lastPrices = JSON.parse(lastPricesObject);

	if (!lastPrices || (lastPrices && lastPrices.length == 0)) {
		processError('', 1008, '');
		return;
	}

    var html = '<div class="historicas bkg_campo">';
		html += '<div class="head">';
			html += '<h2>&Uacute;ltimas cotizaciones';
			if (lastPrices.length > 0) { html += ': ' + lastPrices[0].descripcionProducto.toUpperCase(); }
			html += '</h2>';
			html += '<span id="last_prices_panel" onclick="togglePanelHeight(this.id, false);" class="toggle up"></span>';
			html += '<ul class="titulo">';
				html += '<li class="col1">FECHA</li>';
				html += '<li class="col2">PRECIO P/TN</li>';
			html += '</ul>';
		html += '</div>';

		html += '<div class="detalles">';

        var iPrices = -1;
		var className = '';
        $(lastPrices).each(function () {
            className = (iPrices % 2 === 0) ? ' par' : '';

			html += '<ul class="fechaprecio' + className + '">';
				html += '<li class="col1">' + dateFormat(this.fechaCotizacion) + '</li>';
				html += '<li class="col2">' + this.abreviaturaMoneda + ' ' + this.valorString + '</li>';
			html += '</ul>';

			iPrices++;
        });

		html += '</div>';
		html += '</div>';
	html += '</div>';

	slider_3 = html;

	$('#slider').html(html);
	currentPage = 2;
	slideToLeft();

	resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
}

function renderNewsData() {
	if (slider_1 !== '') {
		$('#slider').html(slider_1);
		return;
	}

	if (!storage["notifications"]) {
			processError('', 1010, '');
	}
	var notificationsObject = storage["notifications"];
	var notifications = JSON.parse(notificationsObject);

    var html = '<div class="novedades ">';
		html += '<span id="news_panel" onclick="togglePanelHeight(this.id, false);" class="toggle up"></span>';
			html += '<ul class="news">';

	if (!notifications || (notifications && notifications.length == 0)) {
		html = '';
	}

	$(notifications).each(function () {
		html += '<li class="col1">';
			if (this.url != '') {
				html += '<a href="javascript:loadURL(\'' + this.url + '\');" >';
					html += '<img src="img/icono-doc.png">';
				html += '</a>';
			} else {
				html += '<img src="img/icono-doc.png">';
			}
		html += '</li>';
		
		html += '<li class="col2">';
			html += '<h3>' + this.titulo + '</h3>';
			html += '<span class="date">' + dateFormat(this.fecha) + '</span>';
			html += '<span class="tag">' + this.descripcionCategoria + '</span>';
			html += '<p>' + this.descripcion + '</p>';
		html += '</li>';
	});

		html += '</ul>';
	html += '</div>';

	slider_1 = html;

	$('#slider').html(html);
	resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
}

function savePricesData(keyStorage, xmlText) {
    var prices = [];

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
        obj.valorString = (obj.valor).toString().replace('.', ',');
        obj.observacion = $(this).find('observacion').text();
        obj.abreviaturaMoneda = $(this).find('abreviaturaMoneda').text();
        obj.variacion = $(this).find('variacion').text();

		prices.push(obj);
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
		var body = getPricesBodyRequest(1, 14, formatDate4Query(0), '', '', '', '', '');
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
		var body = getPricesBodyRequest(1, 11, formatDate4Query(0), '', '', '', '', '');
		var request = getRequest(body);
		getInformationFromWS(pricesURL, request, 'allPrices', savePricesData, function() {;});
	}
}

function saveReports(loadFromWS) {
	if (loadFromWS) {
		var body = getReportsBodyRequest('', '', 1);
		var request = getRequest(body);
		getInformationFromWS(reportsURL, request, 'reports', saveReportsData, function() {;});
	}
}

function renderReportsData() {
	if (slider_2 !== '') {
		$('#slider').html(slider_2);
		return;
	}

	if (!storage["reports"]) {
		processError('', 1003, '');
	}
	var reportsObject = storage["reports"];
	var reports = JSON.parse(reportsObject);

	if (!reports) {
		processError('', 1004, '');
		return;
	}

	var html = '<div class="informe">';
		html += '<span id="reports_panel" onclick="togglePanelHeight(this.id, false);" class="toggle up"></span>';
			html += '<ul class="info">';

    $(reports).each(function () {
        html += '<li class="col1">';
			html += '<h3>' + this.titulo + '</h3>';
			html += '<div>' + dateFormat(this.fecha) + '</div>';
			html += '<p>' + this.texto + '</p>';
		html += '</li>';
    });
					
		html += '</ul>';
	html += '</div>';
	
	slider_2 = html;

	$('#slider').html(html);
	resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
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
	var body = getPricesBodyRequest(1, 11, formatDate4Query(-15), formatDate4Query(0), 9, productCode, '', '');
	var request = getRequest(body);
	getInformationFromWS(pricesURL, request, 'lastPrices', savePricesData, renderLastPricesData);
}


function renderInformationsPrices(productCode) {
	var body = getPricesBodyRequest(1, 11, formatDate4Query(0), '', '', productCode, '', '');
	var request = getRequest(body);
	getInformationFromWS(pricesURL, request, 'informationsPrice', savePricesData, renderInformationsPricesData);
}

function renderInformationsPricesData() {
	if (!storage["informationsPrice"]) {
			processError('', 1010, '');
	}
	var informationsPricesObject = storage["informationsPrice"];
	var informationsPrices = JSON.parse(informationsPricesObject);

    var html = '<div class="detalles">';
		html += '<ul class="titulo">';
			html += '<li class="col1">PUERTO</li>';
			html += '<li class="col2">PRECIO P/TN</li>';
			html += '<li class="col3">OBSERVACI&Oacute;N</li>';
		html += '</ul>';
	
	if (!informationsPrices || (informationsPrices && informationsPrices.length == 0)) {
		html = '<div class="detalles">';
	}

	var productCode = informationsPrices[0].codigoProducto;

	var iDetalle = -1;
	var className = '';
	$(informationsPrices).each(function () {
		className = (iDetalle % 2 === 0) ? ' par' : '';

		html += '<ul class="producto' + className + '">';
			html += '<li class="col1">' + this.descripcionPuerto + '</li>'
			html += '<li class="col2">' + this.abreviaturaMoneda + ' ' + this.valorString + '</li>';
			html += '<li class="col3">' + this.observacion + '</li>';
		html += '</ul>';

		iDetalle++;
	});

	html += '</div>';

	var element = $('#' + productCode + '_details');

	if (element.css('display') === 'none') {
		element.html(html);

		$('.active').each(function () { 
			$(this).html(''); 
			$(this).hide();

			$(this).removeClass('active');
			$(this).addClass('inactive');
		});
		if (element.hasClass('inactive')) { 
			element.removeClass('inactive');
			element.addClass('active');
		}

		element.css("display", "block");

		resetPanelHeight('vertical', (iDetalle*90), 'vertical_content_scroller', vertical_scroll_object);
	} else {
		if (element.hasClass('active')) {
			element.removeClass('active');
			element.addClass('inactive');
		}

		element.css("display", "none");

		if ($('.active').length === 0) {
			vertical_scroll_object.scrollTo( 0, 0);
			resetPanelHeight('vertical', 0, 'vertical_content_scroller', vertical_scroll_object);
		}

		slideToLeft();
		resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
	}
}

// swipe effect all compatibility webkit mobiles
var direction = "";
var currentPage = 1;
var swipeElement = document.getElementById('horizontal_content_scroller');
var mc = new Hammer(swipeElement);

mc.on('panright panleft', function(event) {
	// Deactive swipe on full screen div container
	if (fullScreen) {
		resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
		horizontal_scroll_object.scrollTo(0, 0);
		return; 
	}
	//console.log(event.deltaX);
    if (event.deltaX < -120) {
		slideToLeft();
		resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
		horizontal_scroll_object.scrollTo(0, 0);
	} else if (event.deltaX > 120) {
		slideToRight();
		resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
		horizontal_scroll_object.scrollTo(0, 0);
	}
});

function slideToLeft() {
	if (currentPage === 1) {
		renderReportsData();

		$('#slider').html(slider_2);
		currentPage = 2;
	} else if (currentPage === 2) {
		if (slider_3 !== '') {
			$('#slider').html(slider_3);
			currentPage = 3;
		} else {
			$('#slider').html(slider_1);
			currentPage = 1;
		}
	} else if (currentPage === 3) {
		$('#slider').html(slider_1);
		currentPage = 1;
	}
}

function slideToRight() {
	if (currentPage === 1) {
		if (slider_3 !== '') {
			$('#slider').html(slider_3);
			currentPage = 3;
		} else {
			renderReportsData();

			$('#slider').html(slider_2);
			currentPage = 2;
		}
	} else if (currentPage === 2) {
		$('#slider').html(slider_1);
		currentPage = 1;
	} if (currentPage === 3) {
		renderReportsData();

		$('#slider').html(slider_2);
		currentPage = 2;
	}
}