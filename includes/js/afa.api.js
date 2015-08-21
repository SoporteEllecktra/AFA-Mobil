var vertical_scroll_object = null;
var horizontal_scroll_object = null;

var storage;
try {
    if (localStorage.getItem) {
        storage = localStorage;
    }
} catch(e) {
    storage = {};
}

/*var startTimeOut = 30;
var startTime = startTimeOut;
var t = 0;*/
var appVersion = '2.0';

var slider_1 = '';
var slider_2 = '';
var slider_3 = '';

var months = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function loadURL(url) {
    try {
        if (storage['platform'] == 'Android' || storage['platform'] == 'android') {
            navigator.app.loadUrl(url, {
                openExternal: true
            });
        } else if (storage['platform'] == 'iOS') {
            window.open(url, '_system');
        } else if (storage['platform'] == 'WinCE' || storage['platform'] == 'Win32NT') {
            window.open(url, '_system');
        }
    } catch (ex) {
        alert('No se puede acceder al recurso externo. Intente nuevamente.');
    }
}


/* Dates functions */
function validateDateFormat(date) {
	var regExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
	return (date.match(regExPattern) && (date != ''));
}

function checkDate(date) {
	// date format: dd/mm/yyyy
	var dateParts = date.split("/");
	var d = parseInt(dateParts[0]);
	var m = parseInt(dateParts[1]);
	var y = parseInt(dateParts[2]);
	return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function isValidDate(date) {
	return (validateDateFormat(date) && checkDate(date));
}

function validateTimeFormat(time) { 
	var regExPattern = /^(0[1-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
	return (time.match(regExPattern) && (time != ''));
}

function checkTime(time) {
	// time format: hh:mm:ss
	var timeParts = time.split(":");
	var h = parseInt(timeParts[0]);
	var m = parseInt(timeParts[1]);
	var s = parseInt(timeParts[2]);
	return h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59;
}

function isValidTime(time) {
	return (validateTimeFormat(time) && checkTime(time));
}

function dateFormat(date) {
    var dateData = date.substring(0, 10).split('-');

	return (dateData[2] + '/' + dateData[1] + '/' + dateData[0]);
}

function verboseDate(date) {
	// date format: dd/mm/yyyy
	var dateParts = date.split("/");
	var d = dateParts[0];
	var m = parseInt(dateParts[1]);
	var y = dateParts[2];

	return (d + ' de ' + months[m] + ' de ' + y);
}

function str2Time(date, hours) {
    var dateData = date.split('/');
    var day = parseInt(dateData[0]);
    var month = parseInt(dateData[1]) - 1;
    var year = parseInt(dateData[2]);

    var hourData = hours.split(':');
    var hour = parseInt(hourData[0]);
    var minutes = parseInt(hourData[1]);
    var seconds = parseInt(hourData[2]);

    return (Date.UTC(year, month, day, hour, minutes, seconds, 0));
}

/************************************/
function getAppVersion() {
	var html = '<div style="text-align: center;">';
		html += '<div style="margin-left: 43%;">';
			html += '<img src="img/material/Logo.svg" title="AFA Móvil" class="cssLogoAfaModal" />';
		html += '</div>';
		html += '<span>';
			html += '<b>AFA Móvil</b>';
		html += '</span><br />';
		html += '<span>';
			html += 'Versión: ' + appVersion;
		html += '</span>';
	html += '</div>';

	return html;
}

if (window.jQuery) {
	$(document).ready(function () {
		$.ajaxSetup({
			error: function( jqXHR, textStatus, errorThrown ) {
					var error_id = 50; // unknown
					if (jqXHR.status === 0) {
						alert('Not connect: Verify Network.');
						error_id = 100;
					} else if (jqXHR.status == 404) {
						alert('Requested page not found [404]');
						error_id = 110;
					} else if (jqXHR.status == 500) {
						alert('Internal Server Error [500].');
						error_id = 120;
					} else if (textStatus === 'parsererror') {
						alert('Requested JSON parse failed.');
						error_id = 130;
					} else if (textStatus === 'timeout') {
						alert('Time out error.');
						error_id = 140;
					} else if (textStatus === 'abort') {
						alert('Ajax request aborted.');
						error_id = 150;
					} else {
						alert('Uncaught Error: ' + jqXHR.responseText);
						error_id = 160;
				   }

				   //window.location.href = "error.html?id=" + error_id;
				}
		});
	});
}

function mobileEventsHandler(event) {
	//alert(event.target.isIndex);
	if (event.target.isIndex) {
		document.addEventListener("backbutton", exitApplication, false);
	} else {
		document.addEventListener("backbutton", onBackKeyDown, false);
	}
}

function onBackKeyDown() {
	if (!window.localStorage) {
		processError('', 1002, '');
		return;
	}

	//alert('onBackKeyDown button pressed!!!');
	RedireccionarPagIndex();
}

function exitApplication() {
	navigator.app.exitApp();
}


/*** New Functions ****/
function getRequest(body) {
    var request = '<?xml version="1.0" encoding="utf-8"?>';
    request += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://www.afascl.coop/servicios">';
    request += '<soapenv:Header/>';
    request += '<soapenv:Body>';

	request += body;

    request += '</soapenv:Body>';
    request += '</soapenv:Envelope>';

    return request;
}

function processError(data, status, req) {
	var id = -1;
	if (status > 0) {
		id = status;
	}

    window.location.href = "error.html?id=" + id;
}

function getInformationFromWS(wsURL, request, keyStorage, saveStorageFunction, renderFunction) {
	$.ajax({
		type: "POST",
		url: wsURL,
		contentType: "application/xml; charset=utf-8",
		dataType: "xml",
		crossDomain: true,
		xhrFields: { withCredentials: true },
		data: request,
		success: function (data) {
					saveStorageFunction(keyStorage, data);
					renderFunction();
		}
	});
}

function loadInformation(informationCode, loadFromWS) {
	switch (informationCode) {
		case 1: renderLeadingPrices(loadFromWS[informationCode]); break; // Mostrar las Cotizaciones Destacadas
		case 2: renderNews(loadFromWS[informationCode]); break; // Mostrar las Novedades
		case 3: saveReports(loadFromWS[informationCode]); break; // Renderizar la data de los Informes
		case 4: saveAllPrices(loadFromWS[1]); break; // Guardar la data de todas las Cotizaciones
		default: processError('', 1001, '');
	}
}

function showAlertWindow(title, body) {
    $('#window_modal_title').html(title);
    $('#window_modal_body').html(body);
    if (body != '') {
        $('#window_modal_container').css('display', 'block');
    }
}

function closeAlertWindow() {
    $('#window_modal_container').css('display', 'none');
}

var fullScreen = false;
function togglePanelHeight(id, replace) {
	// full screen values
	var verticalHeight = parseInt(document.getElementById('vertical').style.height);
	var horizontalHeight = 0;
	var classNameValue = '';
	var height = $(document).height();
	if (verticalHeight > 0) {
		verticalHeight = 0;
		horizontalHeight = parseInt(height) - 53;
		classNameValue = 'toggle down';
		fullScreen = true;
	} else {
		verticalHeight = parseInt(height * 0.70) - 28;
		horizontalHeight = parseInt(height * 0.30) - 25;
		classNameValue = 'toggle up';
		fullScreen = false;
	}

	document.getElementById('vertical').style.height = verticalHeight + 'px';
	document.getElementById('horizontal').style.height = horizontalHeight + 'px';

	document.getElementById(id).className = classNameValue;

	if (replace) {
		$('#slider').html(slider_1);
		resetPanelHeight('slider', 0, 'horizontal_content_scroller', horizontal_scroll_object);
	}
}

function resetPanelHeight(elementId1, valueAdded, panelId, scrollerObject) {
	var infoHeight = parseInt(document.getElementById(elementId1).offsetHeight);
	infoHeight += valueAdded;
	document.getElementById(panelId).style.height = infoHeight + 'px';

	scrollerObject.refresh();
}

// Social Sharing code
function socialSharing() {
	if (!window.plugins) {
		//alert(getInformation2Share());
		showAlertWindow('Error:', 'Su sistema no permite compartir contenido de esta aplicación.');
		return;
	}

    try {
        cordova.exec(function() {;}, function() {;}, "Clipboard", "copy", [getInformation2Share()]);
    } catch (Exception) {
		showAlertWindow('Error:', 'No se ha logrado copiar al portapeles el contenido a compartir.');
    }

    if (storage['platform'] === 'WinCE' || storage['platform'] === 'Win32NT') {
        window.plugins.socialsharing.share(getInformation2Share(), null, null, null);
    } else {
        window.plugins.socialsharing.share(getInformation2Share());
    }
}

function getInformation2Share() {
    //AFA SCL 17/06: SOJA 2000 / 219 Jul - SORGO 1050/ 113 Jul.Ago - MAIZ 920 / 100 Ago Grado II - GIRASOL 1850 - TRIGO
    //'AFA SCL 08/04: SOJA 1930 / 220 May - SORGO 1030/ 117 May - MAIZ 960 c.desc / 1000 s.desc / 114 May - GIRASOL s/c - ARVEJA USD 180 // Más información en www.afascl.coop'    
   
    var info2Share = 'AFA SCL ' + ($('#datetime_container_hidden').html()).substring(0, 5) + ':';

	var leadingPricesObject = storage["leadingPrices"];
	var leadingPrices = JSON.parse(leadingPricesObject);

    if (leadingPrices) {
        var index = 0;
        $(leadingPrices).each(function () {
            if (index != 0) {
                info2Share += ' /';
            }
            info2Share += ' ' + this.descripcionProducto.toUpperCase() + ' ' + this.valor;
            index++;
        });
    }

    return info2Share;
}

function reload() {
	window.location.href = 'index.html'
}

function formatDate4Query(dayValue) {
    var miliseconds = parseInt(dayValue * 24 * 60 * 60 * 1000);
    var date = new Date();
    var time = date.getTime();
    date.setTime(time + miliseconds);

    var day = date.getDate();
	day = (day.toString().length == 1) ? '0' + day : day;
    var month = date.getMonth() + 1;
	month = (month.toString().length == 1) ? '0' + month : month;
    var year = date.getFullYear();

	return (day + month + year.toString());
}