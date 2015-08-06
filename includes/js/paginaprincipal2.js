var swiper = null;
var porcentajeArriba = 0.55;
var porcentajeAbajo = 0.45;

$(document).ready(function () {
    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });	
OcultarDivBloqueo();
	if (!swiper) {
		alert("Ha ocurrido un error al ejecutar la aplicación. Contáctese con su proveedor.");
		processError('', 9000, '');
	} else {
		// Define if its device is a mobile
		if (navigator.userAgent.match(/(Mobile|iPhone|iPod|iPad|Android|BlackBerry)/)) {
			if (window.localStorage) {
				localStorage.setItem('deviceready', 'no');
			}

			document.addEventListener("deviceready", onDeviceReady, false);
		} else {
			getUpdates();
		}
	}
});

function renderLeadingPricesData() {
	if (!localStorage.getItem("leadingPrices")) {
			processError('', 1000, '');
	}
	var leadingPricesObject = localStorage.getItem("leadingPrices");
	var leadingPrices = eval('(' + leadingPricesObject + ')');

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
    resultadoDiv += '<div class="accordion" id="accordion2">';

    var cantValorMoneda = 0;
    for (var i = 0; i < leadingPrices.length; i++) {
        var cantValorMonedaAUX = leadingPrices[i].abreviaturaMoneda.length + String(leadingPrices[i].valorString).length;
        if (cantValorMoneda < cantValorMonedaAUX) {
            cantValorMoneda = cantValorMonedaAUX;
        }
    }
    //alert(cantValorMoneda);
	var index = -1;
    $(leadingPrices).each(function () {
        index++;

        resultadoDiv += '<div class="accordion-group" onclick="onclikAcodeon()">';
        resultadoDiv += '<div class="accordion-heading cssAccordion-heading ">';
        resultadoDiv += '<div class="accordion-toggle" href="#collapse' + index + '" data-toggle="collapse" data-parent="#accordion2">';
        resultadoDiv += '<div class="row cssDestacado">';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionProducto">';
        resultadoDiv += '<div class="cssDestacadoDescripcionProductoMargenes">'; // Margenes
        resultadoDiv += this.descripcionProducto.toUpperCase();
        resultadoDiv += '</div>'; // Fin Margenes
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionPuerto">';
        resultadoDiv += this.descripcionPuerto;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoPrecio">';
        var strCssColorPrecio = 'colRectanguloPrecioGris';
        if (this.variacion == '-') {
            strCssColorPrecio = 'colRectanguloPrecioRojo';
        } else if (this.variacion == '+') {
            strCssColorPrecio = 'colRectanguloPrecioVerde';
        }

        resultadoDiv += '<div class="colRectanguloPrecio ' + strCssColorPrecio + '">'; // rectangulo    
        var cantValorMonedaAUX = this.abreviaturaMoneda.length + String(this.valorString).length;

        var strCantValorMonedaLeft = '';
        var strCantValorMonedaRight = '';
        if (cantValorMonedaAUX < cantValorMoneda) {
            for (var iValorMoneda = cantValorMonedaAUX; iValorMoneda < cantValorMoneda; iValorMoneda++) {
                strCantValorMonedaLeft += '&nbsp;';
                strCantValorMonedaRight += '&nbsp;';
            }
        }

        resultadoDiv += strCantValorMonedaLeft + this.abreviaturaMoneda + ' ' + this.valorString + strCantValorMonedaRight;
        resultadoDiv += '</div>'; // fin rectangulo
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="accordion-body collapse" id="collapse' + index + '" style="height: 0px;">';
        resultadoDiv += '<div class="accordion-inner">';
        // detalle
        if (this.listaDetalle.length > 0) {
            // Encabezado detalle
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
        }
        for (var iDetalle = 0; iDetalle < this.listaDetalle.length; iDetalle++) {
            var strHtmlColorFondo = '';
            if (iDetalle % 2 != 0) {
                strHtmlColorFondo = ' cssDetalleImpar ';
            }
            resultadoDiv += '<div class="row cssDetalle' + strHtmlColorFondo + '">';
            resultadoDiv += '<div class="col-xs-4 colDetalleDescripcionPuerto">';
            resultadoDiv += this.listaDetalle[iDetalle].descripcionPuerto;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-4 colDetallePrecio">';

            resultadoDiv += this.listaDetalle[iDetalle].abreviaturaMoneda + ' ' + this.listaDetalle[iDetalle].valorString;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-4 colDetalleObservacion">';
            resultadoDiv += this.listaDetalle[iDetalle].observacion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        }
        resultadoDiv += '</div>';
        // fin detalle
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';

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
        var index = parseInt(e.target.id.replace('collapse', ''));
        //grabarStorageIndexCotizacionDestacadaSeleccionda(index);
        //CargarCotizacionesHistoricaHtml(index);
        var indexSlide2 = -1;
        for (var i = 0; i < swiper.slides.length; i++) {
            if (swiper.slides[i].id == 'swiper-slide2') {
                indexSlide2 = i;
            }
        }
        if (indexSlide2 != -1) {
            swiper.slideTo(indexSlide2);
            //            setTimeout(function () {
            //                swiper.slideTo(indexSlide2);
            //            }, 200);
        }
        onresizeBody();
        //   $('#swiper-slide2').scrollTop(0);
        /*setTimeout(function () {
            CargarDeNuevoHistorico();
        }, 500);*/
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
	timeOutCallbacks[0] = 1;
}

function CargarDeNuevoHistorico() {
    if (!localStorage.getItem("storageIndexCotizacionDestacadaSeleccionda")) {
		processError('', 1000, '');
		return;
	}

    var index = parseInt(localStorage.getItem('storageIndexCotizacionDestacadaSeleccionda'));
    CargarCotizacionesHistoricaHtml(index);
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

function CargarCotizacionesHistoricaHtml(pIndex) {
	if (!cotizacionesDestacada[pIndex] || (cotizacionesDestacada[pIndex] && !cotizacionesDestacada[pIndex].listaHistorico)) {
		processError('', 1000, '');
		return;
	}
    var resultadoDiv = '';
    if (cotizacionesDestacada[pIndex].listaHistorico.length > 0) {
        resultadoDiv += '<div id="divParteFijaCotizacionHistorica" >'; // div parte fija
        resultadoDiv += '<div class="row">';
        resultadoDiv += '<div class="col-xs-11 colHistoricoTitulo">';
        resultadoDiv += 'Cotizaci&#243;n hist&#243;rica: ' + cotizacionesDestacada[pIndex].descripcionProducto.toUpperCase();
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
        $(cotizacionesDestacada[pIndex].listaHistorico).each(function () {
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
        resultadoDiv += varNoSeEncuentraRegistroHistorica;
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
    if (cotizacionesDestacada[pIndex].listaHistorico.length > 0) {
        porcentajeArriba = 0.55;
        porcentajeAbajo = 0.45;
        onresizeBody();
    }
}

function renderNewsData() {
	if (!localStorage.getItem("notifications")) {
			processError('', 1000, '');
	}
	var notificationsObject = localStorage.getItem("notifications");
	var notifications = eval('(' + notificationsObject + ')');

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

function saveLeadingPricesData(xmlText) {
    var leadingPrices = [];
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
        leadingPrices.push(obj);
 
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
    });

	if (window.localStorage) {
		localStorage.setItem('leadingPrices', JSON.stringify(leadingPrices));
	} else {
		processError('', 1000, '');
	}
}

function saveNewsData(textXML) {
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

	if (window.localStorage) {
		localStorage.setItem('notifications', JSON.stringify(notifications));
	} else {
		processError('', 1000, '');
	}
}

function renderLeadingPrices(loadFromWS) {
	if (loadFromWS) {
		var body = getLPBodyRequest(1, 14, obtenerFechaParametroEntrada(0), '', '', '', '', '');
		var request = getRequest(body);
		getInformationFromWS(pricesURL, request, saveLeadingPricesData, renderLeadingPricesData);
	} else {
		renderLeadingPricesData();
	}
}

function getLPBodyRequest(priceCode, customerCode, from, to, orderType, product, port, money) {
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
		getInformationFromWS(notificationsURL, request, saveNewsData, renderNewsData);
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

function saveHistoricalPrices(loadLPFromWS) {
	if (loadLPFromWS) {
		var body = getLPBodyRequest(1, 11, obtenerFechaParametroEntrada(0), '', '', '', '', '');
		var request = getRequest(body);
		getInformationFromWS(pricesURL, request, saveHistoricalLeadingPricesData, function() {;});
	}
}

function saveHistoricalLeadingPricesData(textXML) {
    var allLeadingPrices = [];
    $(textXML).find('cotizaciones').each(function () {
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

        allLeadingPrices.push(obj);
    });

	if (window.localStorage) {
		localStorage.setItem('historicalLeadingPrices', JSON.stringify(allLeadingPrices));
	} else {
		processError('', 1000, '');
	}
}

function saveReports(loadFromWS) {
	if (loadFromWS) {
		var body = getReportsBodyRequest('', '', 1);
		var request = getRequest(body);
		getInformationFromWS(reportsURL, request, saveReportsData, function() {;});
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

function saveReportsData(textXML) {
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

	if (window.localStorage) {
		localStorage.setItem('reports', JSON.stringify(reports));
	} else {
		processError('', 1000, '');
	}
}