function CargarCotizacionesDestacada() {
    var resultadoDiv = '';
    resultadoDiv += '<div class="row cssDestacadoEncabezado ">';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += 'PRODUCTO';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += 'PUERTO';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="col-xs-4">';
    resultadoDiv += 'PRECIO P/TN';
    resultadoDiv += '</div>';
    resultadoDiv += '</div>';
    resultadoDiv += '<div class="accordion" id="accordion2">';
    var index = -1;
    $(cotizacionesDestacada).each(function () {
        index++;
        // Fecha
        if (index == 0) {
            $('#headerFecha').html(this.fechaCotizacion);
        }
        // Fin Fecha

        resultadoDiv += '<div class="accordion-group">';
        resultadoDiv += '<div class="accordion-heading cssAccordion-heading ">';
        resultadoDiv += '<div class="accordion-toggle" href="#collapse' + index + '" data-toggle="collapse" data-parent="#accordion2">';

        resultadoDiv += '<div class="row cssDestacado">';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionProducto">';
        resultadoDiv += this.descripcionProducto.toUpperCase();
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoDescripcionPuerto">';
        resultadoDiv += this.descripcionPuerto;
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-4 cssDestacadoPrecio">';
        resultadoDiv += '<div class="colRectanguloPrecio">'; // rectangulo
        resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
        resultadoDiv += '</div>'; // fin rectangulo
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; // '<div class="row">';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; //'<div class="accordion-heading">';
        resultadoDiv += '<div class="accordion-body collapse" id="collapse' + index + '" style="height: 0px;">';
        resultadoDiv += '<div class="accordion-inner">';
        // detallle
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
            resultadoDiv +=  this.listaDetalle[iDetalle].descripcionMoneda + ' ' + this.listaDetalle[iDetalle].valor;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-4 colDetalleObservacion">';
            resultadoDiv += this.listaDetalle[iDetalle].observacion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>'; // '<div class="row">';
        }
        
    
        
        
        
        resultadoDiv += '</div>'; // '<div class="container">';
        // fin detallle
        resultadoDiv += '</div>'; //'<div class="accordion-inner">';
        resultadoDiv += '</div>'; //'<div class="accordion-body collapse" id="collapse' + index + '" style="height: 0px;">';

        resultadoDiv += '</div>'; //'<div class="accordion-group">';
    });
    // VER MAS
            resultadoDiv += '<div class="row">';
            resultadoDiv += '<div class="col-xs-12">';
            resultadoDiv += '<div class="colVerMas">';
            resultadoDiv += '+ VER MAS';
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
    //FIN VER MAS
    
    resultadoDiv += '</div>';
    $('#divCotizacionesDestacada').html(resultadoDiv);

    $('.collapse').on('show.bs.collapse', function (e) {
        $otherPanels = $(this).parents('.accordion-group').siblings('.accordion-group');
        $('.collapse', $otherPanels).removeClass('in');
    });
    $('.collapse').on('show.bs.collapse', function (e) {
        //$('.accordion-heading').removeClass('cssAccordion-headingActivo');
        //$(e.target).prev('.accordion-heading').addClass('cssAccordion-headingActivo');
        //alert(e.target);
        var index = parseInt(e.target.id.replace('collapse', ''));
        CargarCotizacionesHistorica(index);
        // alert(index);
    });
    $('.collapse').on('hide.bs.collapse', function (e) {
        //$(e.target).prev('.accordion-heading').removeClass('cssAccordion-headingActivo');
        $('#swiper-slide1').html('');
    });
    
onresizeBody();

}
function onresizeBody(){
    //
    var altura =  ($( document ).height() - $('#header').height()) / 2;
    $('#divCotizacionesDestacada').css('height', altura);
    $('#divBarraAbajo').css('height', altura);
    //
    $('.swiper-slide').css('height', $('#divBarraAbajo').height());
}
function CargarCotizacionesHistorica(pIndex) {
    var resultadoDiv = '';
    if (cotizacionesDestacada[pIndex].listaHistorico.length > 0) {
        resultadoDiv += '<div class="row cssHistorico">';
        resultadoDiv += '<div class="col-xs-12 colHistoricoTitulo">';
        resultadoDiv += 'Cotizaci&#243;n hist&#243;rica: ' + cotizacionesDestacada[pIndex].descripcionProducto.toUpperCase() ;
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="row cssHistorico">';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoFecha">';
        resultadoDiv += 'FECHA';
        resultadoDiv += '</div>';
        resultadoDiv += '<div class="col-xs-6 colHistoricoEncabezadoPrecio">';
        resultadoDiv += 'PRECIO P/TN';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>';
        var indexHistorico = -1;
        $(cotizacionesDestacada[pIndex].listaHistorico).each(function () {
            indexHistorico++;
            var strHtmlColorFondo = '';
            if (indexHistorico % 2 != 0) {
                strHtmlColorFondo = ' cssHistoricoImpar ';
            }
            resultadoDiv += '<div class="row cssHistorico ' + strHtmlColorFondo + '">';
            resultadoDiv += '<div class="col-xs-6 colHistoricoFecha">';
            resultadoDiv += this.fechaCotizacion;
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-xs-6 colHistoricoPrecio">';
            resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
    }
    $('#swiper-slide1').html(resultadoDiv);
}