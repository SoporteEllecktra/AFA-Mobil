var swiper = null;
var porcentajeArriba = 0.55;
var porcentajeAbajo = 0.45;

$(document).ready(function () {
    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });	
//OcultarDivBloqueo();
	if (!swiper) {
		alert("Ha ocurrido un error al ejecutar la aplicación. Contáctese con su proveedor.");
		processError('', 9000, '');
	} else {
		// Define if its device is a mobile
		if (navigator.userAgent.match(/(Mobile|iPhone|iPod|iPad|Android|BlackBerry)/)) {
			storage['deviceready'] = 'no';
			document.addEventListener("deviceready", onDeviceReady, false);
		} else {
			getUpdates();
		}
	}
});

function onclikAcodeon() {
    //alert('Ok');
}

function renderLeadingPricesData() {
	if (!storage["leadingPrices"]) {
			processError('', 1000, '');
	}
	var leadingPricesObject = storage["leadingPrices"];
	var leadingPrices = JSON.parse(leadingPricesObject);

	if (!leadingPrices || (leadingPrices && leadingPrices.length == 0)) {
		processError('', 1000, '');
		return;
	}

    var resultadoDiv = '<div class="row cssDestacadoEncabezado ">';
		resultadoDiv += '<div class="col-xs-4">';
			resultadoDiv += 'PRODUCTO';
		resultadoDiv += '</div>';
		resultadoDiv += '<div class="col-xs-4 cssDestacadoPuertoTitulo">';
			resultadoDiv += 'PUERTO';
		resultadoDiv += '</div>';
		resultadoDiv += '<div class="col-xs-4 cssDestacadoPrecioTitulo">';
			resultadoDiv += 'PRECIO P/TN';
		resultadoDiv += '</div>';
    resultadoDiv += '</div>';

    resultadoDiv += '<div class="accordion" id="accordion2">'; // 6
	var index = -1;
    $(leadingPrices).each(function () {
        index++;

        resultadoDiv += '<div class="accordion-group" onclick="onclikAcodeon()">'; // 5
			resultadoDiv += '<div class="accordion-heading cssAccordion-heading ">'; // 4
				resultadoDiv += '<div class="accordion-toggle" href="#collapse' + this.codigoProducto + '" data-toggle="collapse" data-parent="#accordion2">'; // 3
					resultadoDiv += '<div class="row cssDestacado">'; // 2

						resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionProducto">';
							resultadoDiv += '<div class="cssDestacadoDescripcionProductoMargenes">'; // Margenes
								resultadoDiv += this.descripcionProducto.toUpperCase();
							resultadoDiv += '</div>'; // Fin Margenes
						resultadoDiv += '</div>';

						resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionPuerto">';
							resultadoDiv += this.descripcionPuerto;
						resultadoDiv += '</div>';

						resultadoDiv += '<div class="col-xs-4 cssDestacadoPrecio">'; // 1

							var strCssColorPrecio = 'colRectanguloPrecioGris';
							if (this.variacion == '-') {
								strCssColorPrecio = 'colRectanguloPrecioRojo';
							} else if (this.variacion == '+') {
								strCssColorPrecio = 'colRectanguloPrecioVerde';
							}

							resultadoDiv += '<div class="colRectanguloPrecio ' + strCssColorPrecio + '">'; // rectangulo    
								resultadoDiv += this.abreviaturaMoneda + ' ' + this.valorString;
							resultadoDiv += '</div>'; // fin rectangulo
						resultadoDiv += '</div>'; // 1

					resultadoDiv += '</div>'; // 2
				resultadoDiv += '</div>'; // 3
			resultadoDiv += '</div>'; // 4
			
			resultadoDiv += '<div class="accordion-body collapse" id="collapse' + this.codigoProducto + '" style="height: 0px;"></div>';

        resultadoDiv += '</div>';
    });
    // VER MAS
    resultadoDiv += '<div class="colVerMas" onclick="onclickVerMas()">';
    resultadoDiv += '+ VER MAS';
    resultadoDiv += '</div>';
    //FIN VER MAS

    resultadoDiv += '</div>';
    $('#divCotizacionesDestacada').html(resultadoDiv);

    $('.collapse').on('show.bs.collapse', function (e) {
        $otherPanels = $(this).parents('.accordion-group').siblings('.accordion-group');
        $('.collapse', $otherPanels).removeClass('in');
    });
    $('.collapse').on('show.bs.collapse', function (e) {
        var productCode = parseInt(e.target.id.replace('collapse', ''));
        renderInformationsPrices(productCode);
        renderLastPrices(productCode);
        var indexSlide2 = -1;
        for (var i = 0; i < swiper.slides.length; i++) {
            if (swiper.slides[i].id == 'swiper-slide2') {
                indexSlide2 = i;
            }
        }
        if (indexSlide2 != -1) {
            swiper.slideTo(indexSlide2);
        }
    });

    $('.collapse').on('hide.bs.collapse', function (e) {
        var indexSlide3 = -1;
        var indexSlide2 = -1;
        var indexSlide1 = -1;
        for (var i = 0; i < swiper.slides.length; i++) {
            if (swiper.slides[i].id == 'swiper-slide2') {
                indexSlide2 = i;
            } else if (swiper.slides[i].id == 'swiper-slide3') {
                indexSlide3 = i;
            } else if (swiper.slides[i].id == 'swiper-slide1') {
                indexSlide1 = i;
            }
        }
        if (indexSlide2 != -1) {
            swiper.removeSlide(indexSlide2);
        }
        if (indexSlide1 != -1) {
            swiper.slideTo(indexSlide1);
            $('#swiper-slide1').scrollTop(0);
        } else {
            porcentajeArriba = 1;
            porcentajeAbajo = 0;
        }
    });

	CargarHtmlFechaMenuPrincipal();
	OcultarDivBloqueo();
	timeOutCallbacks[0] = 1;
}

function renderLastPricesData() {
	if (!storage["lastPrices"]) {
			processError('', 1000, '');
	}
	var lastPricesObject = storage["lastPrices"];
	var lastPrices = JSON.parse(lastPricesObject);

	if (!lastPrices || (lastPrices && lastPrices.length == 0)) {
		processError('', 1000, '');
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
		processError('', 1000, '');
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
		if (indexSlide3 == -1) {
			swiper.appendSlide('<div id="swiper-slide3" class="swiper-slide">' + CargarInformeHtml() + '</div>');
		} else {
			$('#swiper-slide3').html(CargarInformeHtml());
		}
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
			processError('', 1000, '');
	}
	var notificationsObject = storage["notifications"];
	var notifications = JSON.parse(notificationsObject);

    var resultadoDiv = '<div id="divRowParteScrollNovedades">'; // parte scroll

	if (!notifications || (notifications && notifications.length == 0)) {
		resultadoDiv = '';
	}

	var indiceNovedades = -1;
	$(notifications).each(function () {
		indiceNovedades++;
		resultadoDiv += '<div class="row">';
		resultadoDiv += '<div class="col-xs-1 cssColImgNovedades">';
		if (this.url != '') {
			resultadoDiv += '<a href="javascript:loadURL(\'' + this.url + '\');" >';
			resultadoDiv += '<img src="img/material/icono-doc-link.svg" alt="novedades" class="cssImgNovedades" />';
			resultadoDiv += '</a>';
		} else {
			resultadoDiv += '<img src="img/material/icono-doc.svg" alt="novedades" class="cssImgNovedades" />';
		}
		resultadoDiv += '</div>';
		resultadoDiv += '<div class="col-xs-11 ">';
		// Primer fila novedades
		resultadoDiv += '<div class="row">';
		resultadoDiv += '<div class="col-xs-12 cssNovedadesTitulo">';
		resultadoDiv += this.titulo;
		resultadoDiv += '</div>';
		resultadoDiv += '</div>';
		// fin  Primer fila novedades
		resultadoDiv += '<div class="row ">';
		resultadoDiv += '<div class="col-xs-12">';
		resultadoDiv += '<table>';
		resultadoDiv += '<tr>';
		resultadoDiv += '<td>';
		resultadoDiv += '<div class="cssNovedadesFecha">';
		resultadoDiv += obtenerFechaMostrar(this.fecha);
		resultadoDiv += '</div>';
		resultadoDiv += '</td>';
		resultadoDiv += '<td>';
		resultadoDiv += '<div class="cssNovedadesCategoria">';
		resultadoDiv += this.descripcionCategoria;
		resultadoDiv += '</div>';
		resultadoDiv += '</td>';
		resultadoDiv += '</table>';
		resultadoDiv += '</tr>';
		resultadoDiv += '</div>';

		resultadoDiv += '</div>';
		resultadoDiv += '<div class="row">';
		resultadoDiv += '<div class="col-xs-12 cssNovedadesDescripcion">';
		resultadoDiv += this.descripcion;
		resultadoDiv += '</div>';
		resultadoDiv += '</div>';

		resultadoDiv += '</div>';
	});
	resultadoDiv += '</div>'; // fin parte scroll

	if (notifications.length > 0) {

		var indexSlide1 = -1;
		for (var i = 0; i < swiper.slides.length; i++) {
			if (swiper.slides[i].id == 'swiper-slide1') {
				indexSlide1 = i;
			}
		}
		if (indexSlide1 == -1) {
			swiper.appendSlide('<div id="swiper-slide1" class="swiper-slide">' + resultadoDiv + '</div>');
		} else {
			$('#swiper-slide1').html(resultadoDiv);
		}
	}

    //CargarInformeCierreMercado();
	//timeOutCallbacks[1] = 1;
}

function CargarInformeHtml() {
	if (!listaInformes) {
		processError('', 1000, '');
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
}

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

function saveReports(loadFromWS) {
	if (loadFromWS) {
		var body = getReportsBodyRequest('', '', 1);
		var request = getRequest(body);
		getInformationFromWS(reportsURL, request, 'reports', saveReportsData, function() {;});
	}
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
			processError('', 1000, '');
	}
	var informationsPricesObject = storage["informationsPrice"];
	var informationsPrices = JSON.parse(informationsPricesObject);

    var resultadoDiv = '<div id="divRowParteScrollNovedades">'; // parte scroll

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