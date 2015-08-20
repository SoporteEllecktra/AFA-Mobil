//var port = '38080';
var port = '8080';

var updatesURL = "http://concentrador.afascl.coop:"+port+"/Concentrador/webservices/AuditoriaService?wsdl/";
var pricesURL = "http://concentrador.afascl.coop:"+port+"/Concentrador/webservices/CotizacionCerealPuertoService?wsdl/";
var notificationsURL = "http://concentrador.afascl.coop:"+port+"/Concentrador/webservices/NotificacionService?wsdl/";
var reportsURL = "http://concentrador.afascl.coop:"+port+"/Concentrador/webservices/InformeService?wsdl/";
var savePhoneNumberURL = "http://concentrador.afascl.coop:"+port+"/Concentrador/webservices/TelefonoService?wsdl/";

function updatesObject() {
    this.codigoTabla = 0;
    this.fecha = '';
    this.hora = '';
}

// Definir los objetos a recuperar/almacenar con toda la info para renderizar la app
function price() {
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

function notification() {
    this.codigoNotificacion = 0;
    this.fecha = '';
    this.titulo = '';
    this.descripcion = '';
    this.url = '';
    this.codigoCategoria = 0;
    this.descripcionCategoria = '';
}

function report() {
    this.codigoInforme = 0;
    this.fecha = '';
    this.titulo = '';
    this.texto = '';
    this.url = '';
}

function getUpdates() {
    $.ajax({
        type: "POST",
        url: updatesURL,
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

	// Obtener las actualizaciones parseadas como objetos y analizarlas
	var updates = updatesParser(req.responseText);
	if (updates && (updates.length > 0)) {
		// Hay actualizaciones, definir si las mismas son diferentes que las almacenadas
		setstorage(updates);
	} else {
		// Si no hay actualizaciones (o no llegan) ==> entonces renderizar la app con lo que esta almacenado
		var loadFromWS = [];
		loadFromWS.push(false);
		for (var i = 1; i < 5; i++) {
			loadFromWS.push(false);
			loadInformation(i, loadFromWS);
		}
	}
}

function updatesParser(xmlText) {
    var updates = [];
	var pricesDate = '';
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


		if (obj.codigoTabla === 1) {
			pricesDate = obj.fecha;
		}

        updates.push(obj);
    });

	$('#datetime_container').html(verboseDate(pricesDate));
	$('#datetime_container_hidden').html(pricesDate);

	return updates;
}

// Just update the keys to be updated in the storage, the idea is to minimize calls to the outside
function setstorage(updates) {
	var labelTableStorage = "updatesInfo";
	var loadFromWS = [];
	loadFromWS.push(false);
	//alert("HAY #UPDATES == " + updates.length);
	for (var i = 0; i < updates.length; i++) {
		//console.log(updates[i]);
		loadFromWS.push(false);

		var tableNameKey = labelTableStorage + updates[i].codigoTabla;
		if (!storage[tableNameKey]) {
			storage[tableNameKey] = JSON.stringify(updates[i]);
			loadFromWS[updates[i].codigoTabla] = true;
		} else {
			var newDate = (updates[i].fecha + updates[i].hora);
			var updateStorage = storage[tableNameKey];
			var updateStorageObject = JSON.parse(updateStorage);
			//console.log(tableNameKey + ' - Almacenado ==> ');//console.log(updateStorageObject);
			storageDate = (updateStorageObject.fecha + updateStorageObject.hora);
			
			//console.log('fecha Nueva => '+newDate);
			//console.log('fecha Guardada => '+storageDate);
			//console.log('compara fechas');
			if (newDate != storageDate) {
				//console.log('Recargar ' + tableNameKey);
				storage[tableNameKey] = JSON.stringify(updates[i]);
				loadFromWS[updates[i].codigoTabla] = true;
			}
		}
	}

	//console.log(loadFromWS);
	$.when(loadInformation(1, loadFromWS),
		   loadInformation(2, loadFromWS)
		  ).done(function() {
			  loadInformation(4, loadFromWS);
			  loadInformation(3, loadFromWS);
		  });
}