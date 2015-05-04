$(document).ready(function () {
    MostrarDivBloqueo();
    CargarHtmlFechaMenuPrincipal();
    var listaTodasCotizacionesGuardada = localStorage.getItem("storageListaTodasCotizaciones");
    listaTodasCotizaciones = eval('(' + listaTodasCotizacionesGuardada + ')');
    CargarTodasCotizacionesHtml();
    OcultarDivBloqueo();
    onresizeBody();
});

function onresizeBody() {
    var altura = ($(document).height() - $('#header').height());
    $('#divResultadoTodasCotizaciones').css('height', altura);
    
    $('#divParteScrollTodasCotizaciones').css('height', altura - ($('#divRowTodasCotizacionesTitulo').height() +  $('#divRowTodasCotizacionesEncabezado').height()));
}
function CargarTodasCotizacionesHtml() {
    var resultadoDiv = '';
    if (listaTodasCotizaciones.length > 0) {
        resultadoDiv += '<div id="divRowTodasCotizacionesTitulo" class="row">';
        resultadoDiv += '<div class="col-xs-10 cssColTodasCotizacionesTitulo">';
        resultadoDiv += 'Cotizaciones de hoy';
        resultadoDiv += '</div>';
        //
        resultadoDiv += '<div class="col-xs-2 cssAmpliarAchicar" >';//onclick="onclickFullScreenVerMasCotizacionesAbajo()"
        //resultadoDiv += '<img src="img/material/ampliarAbajo.svg" alt="ampliar bajo" class="cssImgAmpliar" onclick="onclickFullScreenVerMasCotizacionesAbajo()"/>';
        resultadoDiv += '<input type="button" class="cssImgImputButtonAchicar"  onclick="onclickFullScreenVerMasCotizacionesAbajo(); return false;"/>';
        resultadoDiv += '</div>';
        //
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
        
        resultadoDiv += '<div id="divParteScrollTodasCotizaciones">';// parte scroll
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
            resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-3 cssTodasCotizacionesObservacion">';
            resultadoDiv += this.observacion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
          resultadoDiv += '</div>';// fin parte scroll
    }
    $('#divResultadoTodasCotizaciones').html(resultadoDiv);
}
function onclickFullScreenVerMasCotizacionesAbajo(){
 window.location.href = "index.html?r=1";
}