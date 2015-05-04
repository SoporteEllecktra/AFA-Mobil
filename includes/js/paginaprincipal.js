var swiper = null;
$(document).ready(function () {

    //CargaDatosInicio();
    var varParametroUrl = obtenerParametroGetHtml('r');
    if (varParametroUrl == '') {
        MostrarDivBloqueo();
        FuncionInicio();
    } else {
        if (localStorage.getItem("storageListaCotizacionesDestacada") == null) {

        } else {
            var cotizacionesDestacadaGuardada = localStorage.getItem("storageListaCotizacionesDestacada");
            cotizacionesDestacada = eval('(' + cotizacionesDestacadaGuardada + ')');
        }
        if (localStorage.getItem("storageListaNovedades") == null) {

        } else {
            var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
            listaNovedades = eval('(' + listaNovedadesGuardada + ')');
        }
        if (localStorage.getItem("storageListaInformes") == null) {

        } else {
            var listaInformesGuardada = localStorage.getItem("storageListaInformes");
            listaInformes = eval('(' + listaInformesGuardada + ')');
        }

        CargarCotizacionesDestacadaHtml();
        CargarNovedadesHtml();
    }
    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
    onresizeBody();
});
//function onclickFacebook() {
//    var u = 'www.rosario3.com';
//    var t = 'title';
//    window.open('http://facebook.com/sharer/sharer.php?u=' + u + '&t=' + encodeURIComponent(t), 'sharer');
//    //  m.facebook.com
//    //https://m.facebook.com/
//    //window.open('http://facebook.com/sharer/sharer.php?u='+u+'&t='+encodeURIComponent(t),'sharer');    
//    return false;
//}
function onresizeBody() {
    //
    var altura = ($(document).height() - $('#header').height());
    var alturaCotizacionesDestacada = altura * 0.55;
    var alturaParteAbajo = altura * 0.45;
    $('#divCotizacionesDestacada').css('height', alturaCotizacionesDestacada);
    $('#divBarraAbajo').css('height', alturaParteAbajo);
    //
    $('.swiper-slide').css('height', $('#divBarraAbajo').height());

    $('#divRowParteScrollNovedades').css('height', $('#divBarraAbajo').height());
    $('#divParteScrollCotizacionHistorica').css('height', $('#divBarraAbajo').height() - $('#divParteFijaCotizacionHistorica').height());

    // $('#divInformeDescripcion').css('height', $('#divBarraAbajo').height() - $('#divInformeTitulo').height());
    $('#divInformeDescripcion').css('height', $('#divBarraAbajo').height() - ($('#divInformeFecha').outerHeight() + $('#divInformeTitulo').outerHeight())); // 
}
function CargarCotizacionesDestacadaHtml() {
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
            //$('#headerFecha').html(obtenerFechaMostrarMenuInicio(this.fechaCotizacion));
            grabarStorageFechaCotizacion(this.fechaCotizacion);
            CargarHtmlFechaMenuPrincipal();
        }
        // Fin Fecha

        resultadoDiv += '<div class="accordion-group">';
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
        resultadoDiv += '<div class="colRectanguloPrecio colRectanguloPrecioVerde">'; // rectangulo
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
            resultadoDiv += this.listaDetalle[iDetalle].descripcionMoneda + ' ' + this.listaDetalle[iDetalle].valor;
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
        //$('.accordion-heading').removeClass('cssAccordion-headingActivo');
        //$(e.target).prev('.accordion-heading').addClass('cssAccordion-headingActivo');
        //alert(e.target);
        var index = parseInt(e.target.id.replace('collapse', ''));
        grabarStorageIndexCotizacionDestacadaSeleccionda(index);
        CargarCotizacionesHistoricaHtml(index);

        swiper.slideTo(1);
        onresizeBody(); //////////////////
        $('#swiper-slide2').scrollTop(0);
        if (swiper.slides.length == 2) {
            swiper.appendSlide('<div class="swiper-slide">' + CargarInformeHtml() + '</div>');
            onresizeBody();
        }
    });
    $('.collapse').on('hide.bs.collapse', function (e) {
        //$(e.target).prev('.accordion-heading').removeClass('cssAccordion-headingActivo');
        //$('#swiper-slide2').html('');
        swiper.removeSlide(2);
        swiper.removeSlide(1);
        swiper.slideTo(0);
        $('#swiper-slide1').scrollTop(0);

    });
    onresizeBody();
}
function onclickVerMas() {
    window.location.href = "todascotizaciones.html";
}

function CargarCotizacionesHistoricaHtml(pIndex) {
    var resultadoDiv = '';
    if (cotizacionesDestacada[pIndex].listaHistorico.length > 0) {
        //        resultadoDiv += '<div class="containerCotizacionHistorica">'; //container
        //        resultadoDiv +='<br/>';
        //        resultadoDiv += '<div class="containerCotizacionHistoricaHijo">'; //container hijo
        resultadoDiv += '<div id="divParteFijaCotizacionHistorica" >'; // div parte fija
        resultadoDiv += '<div class="row">';
        resultadoDiv += '<div class="col-xs-10 colHistoricoTitulo">';
        resultadoDiv += 'Cotizaci&#243;n hist&#243;rica: ' + cotizacionesDestacada[pIndex].descripcionProducto.toUpperCase();
        resultadoDiv += '</div>';
        //
        resultadoDiv += '<div class="col-xs-2 cssAmpliarAchicar" >'; // onclick="onclickFullScreenCotizacionesHistorica()"
        //        //resultadoDiv += '<img src="img/material/ampliar.svg" alt="ampliar" class="cssImgAmpliar"  />';
        //        resultadoDiv += '<input type="button" class="cssImgImputButtonAmpliar"  onclick="onclickFullScreenCotizacionesHistorica(); return false;"/>';
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
            resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
        });
        resultadoDiv += '</div>'; // fin div scroll


        //        resultadoDiv +='</div>'; //container hijo
        //        //resultadoDiv +='<br/>';
        //        resultadoDiv += '</div>';// fin container
    }
    //$('#swiper-slide2').html(resultadoDiv);
    if (swiper.slides.length == 1) {
        swiper.appendSlide('<div id="swiper-slide2" class="swiper-slide">' + resultadoDiv + '</div>');
    } else {
        $('#swiper-slide2').html(resultadoDiv);
    }
}

function CargarNovedadesHtml() {
    var resultadoDiv = '';
    if (listaNovedades != null) {
        //    if (listaNovedades.length > 0)
        //    {
        //        resultadoDiv += '<div class="row">';
        //        resultadoDiv += '<div class="col-xs-12 cssColImgAmpliar">';
        //        resultadoDiv += '<img src="img/material/ampliar.svg" alt="ampliar" class="cssImgAmpliar" />';
        //        resultadoDiv += '</div>';     
        //        resultadoDiv += '</div>';     
        //    }
        resultadoDiv += '<div id="divRowParteScrollNovedades">';   // parte scroll      
        var indiceNovedades = -1;
        $(listaNovedades).each(function () {
            indiceNovedades++;
            resultadoDiv += '<div class="row">';
            resultadoDiv += '<div class="col-xs-1 cssColImgNovedades">';
            resultadoDiv += '<img src="img/material/icono-doc.svg" alt="novedades" class="cssImgNovedades" />';
            resultadoDiv += '</div>';
            //
            resultadoDiv += '<div class="col-xs-11 ">';
            //
            // Primer fila novedades
            resultadoDiv += '<div class="row">';
            //            if (indiceNovedades == 0) {
            //                resultadoDiv += '<div class="col-xs-10 cssNovedadesTitulo">';
            //                resultadoDiv += this.titulo;
            //                resultadoDiv += '</div>';
            //                resultadoDiv += '<div class="col-xs-2 cssAmpliarAchicar" >'; //onclick="onclickFullScreenNovedades()"
            //                //resultadoDiv += '<img src="img/material/ampliar.svg" alt="ampliar" class="cssImgAmpliar" />';
            //                resultadoDiv += '<input type="button" class="cssImgImputButtonAmpliar"  onclick="onclickFullScreenNovedades(); return false;"/>';
            //                resultadoDiv += '</div>';
            //            } else {
            //                resultadoDiv += '<div class="col-xs-12 cssNovedadesTitulo">';
            //                resultadoDiv += this.titulo;
            //                resultadoDiv += '</div>';
            //            }
            resultadoDiv += '<div class="col-xs-12 cssNovedadesTitulo">';
            resultadoDiv += this.titulo;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
            // fin  Primer fila novedades
            resultadoDiv += '<div class="row ">';
            resultadoDiv += '<div class="col-sm-3 cssNovedadesFecha">';
            resultadoDiv += obtenerFechaMostrar(this.fecha);
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-sm-9 cssNovedadesCategoria">';
            resultadoDiv += this.descripcionCategoria;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="row">';
            resultadoDiv += '<div class="col-xs-12 cssNovedadesDescripcion">';
            resultadoDiv += this.descripcion;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
            //
            resultadoDiv += '</div>';
            //
        });
        resultadoDiv += '</div>';   // fin parte scroll   
    }
    $('#swiper-slide1').html(resultadoDiv);
}
function CargarInformeHtml() {
    var informesHtml = '';
    for (var i = 0; i < listaInformes.length; i++) {
        //alert(listaInformes[i].titulo);
        informesHtml += '<div id="divInformeTitulo" class="cssInformeTitulo">' + listaInformes[i].titulo + '</div>';
        informesHtml += '<div id="divInformeFecha" class="cssInformeFecha">' + obtenerFechaMostrar(listaInformes[i].fecha) + '</div>';
        informesHtml += '<div id="divInformeDescripcion" class="cssInformeDescripcion">' + listaInformes[i].texto + '</div>';
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
    //alert (swiper.activeIndex);
    if (swiper.activeIndex == 0) {
        window.location.href = "novedades.html";
    } else if (swiper.activeIndex == 1) {
        window.location.href = "todascotizacioneshistorica.html";
    } else if (swiper.activeIndex == 2) {
        window.location.href = "informe.html";
    }
}