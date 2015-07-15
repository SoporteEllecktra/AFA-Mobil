$(document).ready(function () {
    MostrarDivBloqueo();
    CargarHtmlFechaMenuPrincipal();
	if (localStorage.getItem("storageListaTodasCotizaciones")) {
		var listaTodasCotizacionesGuardada = localStorage.getItem("storageListaTodasCotizaciones");
		listaTodasCotizaciones = eval('(' + listaTodasCotizacionesGuardada + ')');
		CargarTodasCotizacionesHtml();
		OcultarDivBloqueo();
		onresizeBody();
	} else {
		processError('', '', '');
	}
});

function onresizeBody() {
    var altura = ($(document).height() - ($('#header').outerHeight() + $('#StatusBar').outerHeight()));
    $('#divResultadoTodasCotizaciones').css('height', altura);

    $('#divParteScrollTodasCotizaciones').css('height', altura - ($('#divRowTodasCotizacionesTitulo').outerHeight() + $('#divRowTodasCotizacionesEncabezado').outerHeight()));
}

function CargarTodasCotizacionesHtml() {
    var resultadoDiv = '';
    if (listaTodasCotizaciones.length > 0) {
        resultadoDiv += '<div id="divRowTodasCotizacionesTitulo" class="row">';
        resultadoDiv += '<div class="col-xs-10 cssColTodasCotizacionesTitulo">';
        resultadoDiv += 'Cotizaciones';
        resultadoDiv += '</div>';

        resultadoDiv += '<div class="col-xs-2 cssAmpliarAchicar" >'; //onclick="onclickFullScreenVerMasCotizacionesAbajo()"
        //resultadoDiv += '<img src="img/material/ampliarAbajo.svg" alt="ampliar bajo" class="cssImgAmpliar" onclick="onclickFullScreenVerMasCotizacionesAbajo()"/>';
        resultadoDiv += '<input type="button" class="cssImgImputButtonAchicar"  onclick="onclickFullScreenVerMasCotizacionesAbajo(); return false;"/>';
        resultadoDiv += '</div>';

        resultadoDiv += '</div>';

        resultadoDiv += '<div id="divRowTodasCotizacionesEncabezado" class="row cssTodasCotizacionesEncabezado">';
        resultadoDiv += '<div class="col-xs-3">';
        resultadoDiv += 'PRODUCTO';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-3">';
        resultadoDiv += 'PUERTO';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-3">';
        resultadoDiv += 'PRECIO P/TN';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-3">';
        resultadoDiv += 'OBSERVACI&#211;N';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';

		// No se usa la variable cantValorMonedaTodasCotizaciones, NO vale la pena recorrer listaTodasCotizaciones
        /*var cantValorMonedaTodasCotizaciones = 0;
        for (var i = 0; i < listaTodasCotizaciones.length; i++) {
            var cantValorMonedaAUXTodasCotizaciones = listaTodasCotizaciones[i].abreviaturaMoneda.length + String(listaTodasCotizaciones[i].valorString).length;
            if (cantValorMonedaTodasCotizaciones < cantValorMonedaAUXTodasCotizaciones) {
                cantValorMonedaTodasCotizaciones = cantValorMonedaAUXTodasCotizaciones;
            }
        }*/

        resultadoDiv += '<div id="divParteScrollTodasCotizaciones">'; // parte scroll
        var indexTodasCotizaciones = -1;
        $(listaTodasCotizaciones).each(function () {
            indexTodasCotizaciones++;
            var strHtmlColorFondo = '';
            if (indexTodasCotizaciones % 2 == 0) {
                strHtmlColorFondo = ' cssTodasCotizacionesImpar ';
            }
            resultadoDiv += '<div class="row cssTodasCotizaciones' + strHtmlColorFondo + '">';
            resultadoDiv += '<div class="col-xs-3 cssTodasCotizacionesProducto">';
            resultadoDiv += this.descripcionProducto.toUpperCase();
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-3 cssTodasCotizacionesPuerto">';
            resultadoDiv += this.descripcionPuerto;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-3 cssTodasCotizacionesPrecio">';
            //resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            //var cantValorMonedaAUXTodasCotizaciones = this.abreviaturaMoneda.length + String(this.valorString).length;
            //var strCantValorMonedaTodasCotizaciones = '';
            //            if (cantValorMonedaAUXTodasCotizaciones < cantValorMonedaTodasCotizaciones) {
            //                for (var iValorMonedaTodasCotizaciones = cantValorMonedaAUXTodasCotizaciones; iValorMonedaTodasCotizaciones < cantValorMonedaTodasCotizaciones; iValorMonedaTodasCotizaciones++) {
            //                    strCantValorMonedaTodasCotizaciones += '&nbsp;' + '&nbsp;';
            //                }
            //            }
            resultadoDiv += /*strCantValorMonedaTodasCotizaciones + */this.abreviaturaMoneda + ' ' + this.valorString;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-3 cssTodasCotizacionesObservacion">';
            resultadoDiv += this.observacion + ' - Fecha: ' + this.fechaCotizacion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
        resultadoDiv += '</div>'; // fin parte scroll
    }
    $('#divResultadoTodasCotizaciones').html(resultadoDiv);
}

function onclickFullScreenVerMasCotizacionesAbajo() {
    RedireccionarPagIndex();
}