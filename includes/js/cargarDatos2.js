/*var wsCotizacion = "http://concentrador.afascl.coop:38080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsCotizacionHistorico = "http://concentrador.afascl.coop:38080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsNovedades = "http://concentrador.afascl.coop:38080/Concentrador/webservices/NotificacionService?wsdl/";
var wsAuditoria = "http://concentrador.afascl.coop:38080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsInforme = "http://concentrador.afascl.coop:38080/Concentrador/webservices/InformeService?wsdl/";
var wsGuardarTelefono = "http://concentrador.afascl.coop:38080/Concentrador/webservices/TelefonoService?wsdl/";*/

var wsCotizacion = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsCotizacionHistorica = "http://concentrador.afascl.coop:8080/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var wsNovedades = "http://concentrador.afascl.coop:8080/Concentrador/webservices/NotificacionService?wsdl/";
var wsAuditoria = "http://concentrador.afascl.coop:8080/Concentrador/webservices/AuditoriaService?wsdl/";
var wsInforme = "http://concentrador.afascl.coop:8080/Concentrador/webservices/InformeService?wsdl/";
var wsGuardarTelefono = "http://concentrador.afascl.coop:8080/Concentrador/webservices/TelefonoService?wsdl/";

// Only use for PUSH Notifications
var wsRegistracionTelefono = 'http://190.210.143.156:50002/registrationinfo/';

function updatesObject() {
    this.codigoTabla = 0;
    this.fecha = '';
    this.hora = '';
}

function getUpdates() {
    $.ajax({
        type: "POST",
        url: wsAuditoria,
        contentType: "application/xml; charset=utf-8",
        dataType: "xml",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        data: getRequest('<ser:consultaModificaciones/>'),
        success: updatesAnalizer
    });
}

function updatesAnalizer(data, status, req) {
	// No se pudo traer la info auditoria de las actualizaciones
	if (!req || (req && req.responseText.length == 0)) {
		processError('', 3000, '');
	}

	// Obtener las actualizaciones como objetos y analizarlas
	var updates = updatesParser(req.responseText);
	if (updates && (updates.length > 0)) {
		// Hay actualizaciones, definir si las mismas son diferentes que las almacenadas
		setLocalStorage(updates);
	}
	//t = setInterval(timeController, 1000);
}

function updatesParser(xmlText) {
    var updates = [];
	// Object updates format: {codigoTabla: 1|2|3, fecha: "dd/mm/yyyy", hora: "hh:mm:ss"}
    $(xmlText).find('modificaciones').each(function () {
        var obj = new updatesObject();
        obj.codigoTabla = parseInt($(this).find('codigoTabla').text());
		if (obj.codigoTabla != 1 && obj.codigoTabla != 2 && obj.codigoTabla != 3) {
			processError('', 2001, '');
			return;
		}

        obj.fecha = $(this).find('fecha').text();
		if (!obj.fecha || 
			(obj.fecha && obj.fecha.length == 0) || 
			(obj.fecha && obj.fecha.length > 0 && !isValidDate(obj.fecha))) {
			processError('', 2002, '');
			return;
		}

		obj.hora = $(this).find('hora').text();
		if (!obj.hora || 
			(obj.hora && obj.hora.length == 0) || 
			(obj.hora && obj.hora.length > 0 && !isValidTime(obj.hora))) {
			processError('', 2003, '');
			return;
		}

        updates.push(obj);
    });

	return updates;
}

// Just update the keys to be updated in the localStorage, the idea is to minimize calls to the outside
function setLocalStorage(updates) {
	var labelTableStorage = "storageTablaModificaciones";
	var loadFromWS = [];
	loadFromWS.push(false);
	//alert("HAY #UPDATES == " + updates.length);
	for (var i = 0; i < updates.length; i++) {
		console.log(updates[i]);
		loadFromWS.push(false);

		var tableNameKey = labelTableStorage + updates[i].codigoTabla;
		if (!localStorage.getItem(tableNameKey)) {
			localStorage.setItem(tableNameKey, JSON.stringify(updates[i]));
			loadFromWS[updates[i].codigoTabla] = true;
		} else {
			var newDate = obtenerFechaUTC(updates[i].fecha, updates[i].hora);
			var updateStorage = localStorage.getItem(tableNameKey);
			var updateStorageObject = eval('(' + updateStorage + ')');
			//console.log(tableNameKey + ' - Almacenado ==> ');console.log(updateStorageObject);
			storageDate = obtenerFechaUTC(updateStorageObject.fecha, updateStorageObject.hora);
			/*var d = new Date(newDate);
			console.log('fecha Nueva => '+ d + ', stamp='+newDate);
			d = new Date(storageDate);
			console.log('fecha Guardada => '+d + ', stamp=' + storageDate);
			console.log('compara fechas');*/
			if (newDate != storageDate) {
				//console.log('Recargar ' + tableNameKey);
				localStorage.setItem(tableNameKey, JSON.stringify(updates[i]));
				loadFromWS[updates[i].codigoTabla] = true;
			}
		}
	}

	$.when(renderInformation(1, loadFromWS),
		   renderInformation(2, loadFromWS)
		  ).done(function() {
			  renderInformation(4, loadFromWS);
			  renderInformation(3, loadFromWS);
		  });
}

/*function timeController() {
	startTime--;

	var timeOut = 1;
	for (var i = 0; i < timeOutCallbacks.length; i++) {
		timeOut *= parseInt(timeOutCallbacks[i]);
	}

	if (startTime == 1) {
		clearTimeout(t);
		OcultarDivBloqueo();
		if (timeOut == 0) {
			//alert("TIMEOUT");
			processError('', 5000, '');
		}
	} else {
		if (timeOut == 1) {
			clearTimeout(t);
			OcultarDivBloqueo();
			console.log('Tardo en cargar la info necesaria ==> ' + startTime + 'seg');
		}
	}
}*/