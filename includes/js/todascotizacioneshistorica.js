
$(document).ready(function () {
    MostrarDivBloqueo();
    CargarHtmlFechaMenuPrincipal();
    var indexCotizacionDestacadaSeleccionda = obtenerStorageIndexCotizacionDestacadaSeleccionda();
    if (localStorage["storageListaCotizacionesDestacada"]) {
        var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
        cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
    }
    CargarCotizacionesHistoricaFullscreenHtml(indexCotizacionDestacadaSeleccionda);
    OcultarDivBloqueo();
    onresizeBody();
});

function onresizeBody() {
    var altura = ($(document).height() - $('#header').height());
    $('#divResultadoTodasCotizacionesHistorica').css('height', altura);    
    $('#divRowParteScrollTodosHistoricoCotizaciones').css('height', altura - ($('#divRowTodosHistoricoCotizacionesTitulo').height() +  $('#divRowTodosHistoricoCotizacionesEncabezado').height()));
}

function CargarCotizacionesHistoricaFullscreenHtml(pIndex) {
    var resultadoDiv = '';
    if (cotizacionesDestacada != null){
    if (cotizacionesDestacada[pIndex].listaHistorico.length > 0) {
        resultadoDiv += '<div id="divRowTodosHistoricoCotizacionesTitulo" class="row">';
        resultadoDiv += '<div class="col-xs-10 colHistoricoTitulo">';
        resultadoDiv += 'Cotizaci&#243;n hist&#243;rica: ' + cotizacionesDestacada[pIndex].descripcionProducto.toUpperCase();
        resultadoDiv += '</div>';
        //
        resultadoDiv += '<div class="col-xs-2 cssAmpliarAchicar" >';//onclick="onclickFullScreenCotizacionesHistoricaAbajo()"
        //resultadoDiv += '<img src="img/material/ampliarAbajo.svg" alt="ampliar bajo" class="cssImgAmpliar" />';
         resultadoDiv += '<input type="button" class="cssImgImputButtonAchicar"  onclick="onclickFullScreenCotizacionesHistoricaAbajo(); return false;"/>';
        resultadoDiv += '</div>';
        //
        resultadoDiv += '</div>';
        resultadoDiv += '<div id="divRowTodosHistoricoCotizacionesEncabezado" class="row cssHistoricoEncabezado">';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoFecha">';
        resultadoDiv += 'FECHA';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoPrecio">';
        resultadoDiv += 'PRECIO P/TN';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        
        resultadoDiv += '<div id="divRowParteScrollTodosHistoricoCotizaciones">'; // parte scroll
        var indexHistorico = -1;
        $(cotizacionesDestacada[pIndex].listaHistorico).each(function () {
            indexHistorico++;
            var strHtmlColorFondo = '';
            if (indexHistorico % 2 == 0) {
                strHtmlColorFondo = ' cssHistoricoImpar ';
            }
            
            resultadoDiv += '<div class="row cssHistorico ' + strHtmlColorFondo+ '">';
            resultadoDiv += '<div class="col-xs-6 colHistoricoFecha">';
            resultadoDiv += obtenerFechaMostrar(this.fechaCotizacion);
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-6 colHistoricoPrecio">';
            resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
        resultadoDiv += '</div>'; // fin parte scroll
    }
    }
    $('#divResultadoTodasCotizacionesHistorica').html(resultadoDiv);
}
function onclickFullScreenCotizacionesHistoricaAbajo() {
    window.location.href = "index.html?r=1";

}