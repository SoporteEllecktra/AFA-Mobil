var swiper = null;
var porcentajeArriba = 0.55;
var porcentajeAbajo = 0.45;
$(document).ready(function () {
    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    CargaDeLosDatosPrevioTelefono();
});
$(document).ajaxStop(function () {
    finCargarInicial();
});

function CargaDeLosDatosPrevioTelefono() {
    // alert(localStorage.getItem("storagePlatform"));
    if (localStorage.getItem("storagePlatform") == null) {
        setTimeout(function () {
            CargaDeLosDatosPrevioTelefono();
        }, 100);
    } else {
        var varParametroUrl = '';
        if (localStorage.getItem("storageIndexVolver") == null) {
            varParametroUrl = '';
        } else {
            varParametroUrl = localStorage.getItem("storageIndexVolver");
        }
        if (varParametroUrl == '') {
            MostrarDivBloqueo();
            FuncionInicio();
        } else {
            //
            localStorage.setItem('storageIndexVolver', '');
            //
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
            CargarHtmlFechaMenuPrincipal();
            CargarCotizacionesDestacadaHtml();
            CargarNovedadesHtml();
            if (listaNovedades == null) {
                porcentajeArriba = 1;
                porcentajeAbajo = 0;
            } else if (listaNovedades.length == 0) {
                porcentajeArriba = 1;
                porcentajeAbajo = 0;
            }
            onresizeBody();
        }
    }
}


var isMoverAmpliar = false;
var cantNN = 0;

function onmousedownAmpliar(e) {
    isMoverAmpliar = true;
    //return false;
}

function onmouseoverAmpliar(e) {
    isMoverAmpliar = false;
    cantNN = 0;
}

function onmousemoveAmpliar(e) {
    if (isMoverAmpliar) {
        if (cantNN == 0) {
            cantNN = e.clientY;
        } else {
            if (cantNN < e.clientY) {
                porcentajeArriba = porcentajeArriba + 0.001;
                porcentajeAbajo = porcentajeAbajo - 0.001;
            } else {
                porcentajeArriba = porcentajeArriba - 0.001;
                porcentajeAbajo = porcentajeAbajo + 0.001;
            }
            cantNN = e.clientY;
            onresizeBody();
        }
    }
}

function onmouseupAmpliar(e) {
    isMoverAmpliar = false;
    cantNN = 0;
    //return false;
}

function onresizeBody() {
    //
    var altura = ($(document).height() - $('#header').outerHeight());
    var alturaCotizacionesDestacada = altura * porcentajeArriba; //0.55;
    // incio redondear para abajo
    var arrAlturaCotizacionesDestacada = alturaCotizacionesDestacada.toString().split(".");
    var enteroAlturaCotizacionesDestacada = 0;
    var decimalAlturaCotizacionesDestacada = 0;
    if (arrAlturaCotizacionesDestacada.length == 2) {
        enteroAlturaCotizacionesDestacada = parseInt(arrAlturaCotizacionesDestacada[0]);
        decimalAlturaCotizacionesDestacada = parseInt(arrAlturaCotizacionesDestacada[1]);
    } else {
        enteroAlturaCotizacionesDestacada = parseInt(arrAlturaCotizacionesDestacada[0]);
    }
    // fin redondear para abajo
    var alturaParteAbajo = altura * porcentajeAbajo; // 0.45;
    // incio redondear para arriba
    var arrAlturaParteAbajo = alturaParteAbajo.toString().split(".");
    var enteroAlturaParteAbajo = 0;
    var decimalAlturaParteAbajo = 0;
    if (arrAlturaParteAbajo.length == 2) {
        enteroAlturaParteAbajo = parseInt(arrAlturaParteAbajo[0]);
        decimalAlturaParteAbajo = parseInt(arrAlturaParteAbajo[1]);
    } else {
        enteroAlturaParteAbajo = parseInt(arrAlturaParteAbajo[0]);
    }
    if (decimalAlturaCotizacionesDestacada > 0) {
        enteroAlturaParteAbajo = enteroAlturaParteAbajo + 1;
    }
    $('#divCotizacionesDestacada').css('height', enteroAlturaCotizacionesDestacada);
    $('#divBarraAbajo').css('height', enteroAlturaParteAbajo);

    var cantPxBotonesSlider = parseInt($('.swiper-pagination').css('bottom').replace('px', '')) + $('.swiper-pagination').outerHeight() + 12; //2;+ 12

    $('.swiper-slide').css('height', $('#divBarraAbajo').outerHeight());
    var cantPaddingNovedadesSlider = 0;
    if (document.getElementById('swiper-slide1')) {
        cantPaddingNovedadesSlider = parseInt($('#swiper-slide1').css('padding-top').replace('px', ''));
    }

    $('#divRowParteScrollNovedades').css('height', ($('#divBarraAbajo').outerHeight() - (cantPxBotonesSlider + cantPaddingNovedadesSlider)));
    $('#divParteScrollCotizacionHistorica').css('height', $('#divBarraAbajo').outerHeight() - ($('#divParteFijaCotizacionHistorica').outerHeight() + cantPxBotonesSlider));
    $('#divInformeDescripcion').css('height', $('#divBarraAbajo').outerHeight() - ($('#divInformeFecha').outerHeight() + $('#divInformeTitulo').outerHeight() + cantPxBotonesSlider)); // 
}

function onclikAcodeon() {
    //alert('Ok');
}

function CargarCotizacionesDestacadaHtml() {
    var resultadoDiv = '';
    resultadoDiv += '<div class="row cssDestacadoEncabezado ">';
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
    var index = -1;
    var cantValorMoneda = 0;
    for (var i = 0; i < cotizacionesDestacada.length; i++) {
        var cantValorMonedaAUX = cotizacionesDestacada[i].abreviaturaMoneda.length + String(cotizacionesDestacada[i].valorString).length;
        if (cantValorMoneda < cantValorMonedaAUX) {
            cantValorMoneda = cantValorMonedaAUX;
        }
    }
    //alert(cantValorMoneda);
    $(cotizacionesDestacada).each(function () {
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
        //var cantValorMonedaAUX = this.descripcionMoneda.length + String(this.valor).length;
        var cantValorMonedaAUX = this.abreviaturaMoneda.length + String(this.valorString).length;
        //var strCantValorMoneda ='';
        var strCantValorMonedaLeft = '';
        var strCantValorMonedaRight = '';
        if (cantValorMonedaAUX < cantValorMoneda) {
            for (var iValorMoneda = cantValorMonedaAUX; iValorMoneda < cantValorMoneda; iValorMoneda++) {
                //strCantValorMoneda += '&nbsp;' + '&nbsp;' ;//+ '&nbsp;' + '&nbsp;'+ '&nbsp;' + '&nbsp;'+ '&nbsp;' + '&nbsp;'
                strCantValorMonedaLeft += '&nbsp;';
                strCantValorMonedaRight += '&nbsp;';
            }
        }
        //resultadoDiv += strCantValorMoneda + this.descripcionMoneda + ' ' + this.valor;
        resultadoDiv += strCantValorMonedaLeft + this.abreviaturaMoneda + ' ' + this.valorString + strCantValorMonedaRight;
        resultadoDiv += '</div>'; // fin rectangulo
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; // '<div class="row">';
        resultadoDiv += '</div>';
        resultadoDiv += '</div>'; //'<div class="accordion-heading">';
        resultadoDiv += '<div class="accordion-body collapse" id="collapse' + index + '" style="height: 0px;">';
        resultadoDiv += '<div class="accordion-inner">';
        // detallle
        var cantValorMonedaDetalle = 0;
        for (var iDetalleMoneda = 0; iDetalleMoneda < this.listaDetalle.length; iDetalleMoneda++) {
            var cantValorMonedaDetalleAUX = this.listaDetalle[iDetalleMoneda].abreviaturaMoneda.length + String(this.listaDetalle[iDetalleMoneda].valorString).length;
            if (cantValorMonedaDetalle < cantValorMonedaDetalleAUX) {
                cantValorMonedaDetalle = cantValorMonedaDetalleAUX;
            }
        }
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
            //resultadoDiv += this.listaDetalle[iDetalle].descripcionMoneda + ' ' + this.listaDetalle[iDetalle].valor;
            var cantValorMonedaAUXDetalle = this.listaDetalle[iDetalle].abreviaturaMoneda.length + String(this.listaDetalle[iDetalle].valorString).length;
            var strCantValorMonedaDetalle = '';
            //            if (cantValorMonedaAUXDetalle < cantValorMonedaDetalle) {
            //                for (var iValorMonedaDetalle = cantValorMonedaAUXDetalle; iValorMonedaDetalle < cantValorMonedaDetalle; iValorMonedaDetalle++) {
            //                    strCantValorMonedaDetalle += '&nbsp;' + '&nbsp;';
            //                }
            //            }
            resultadoDiv += strCantValorMonedaDetalle + this.listaDetalle[iDetalle].abreviaturaMoneda + ' ' + this.listaDetalle[iDetalle].valorString;
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
        var index = parseInt(e.target.id.replace('collapse', ''));
        grabarStorageIndexCotizacionDestacadaSeleccionda(index);
        CargarCotizacionesHistoricaHtml(index);
        var indexSlide2 = -1;
        for (var i = 0; i < swiper.slides.length; i++) {
            if (swiper.slides[i].id == 'swiper-slide2') {
                indexSlide2 = i;
            }
        }
        if (indexSlide2 != -1) {
            //swiper.slideTo(0);
            swiper.slideTo(indexSlide2);
            //            setTimeout(function () {
            //                swiper.slideTo(indexSlide2);
            //            }, 200);
        }
        onresizeBody(); //////////////////
        //   $('#swiper-slide2').scrollTop(0);
        setTimeout(function () {
            CargarDeNuevoHistorico();
        }, 200);
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
            onresizeBody();
            //  setTimeout(function () { onresizeBody(); }, 500);
        }
    });
    onresizeBody();
    //setTimeout(function () { onresizeBody(); }, 500);
}

function CargarDeNuevoHistorico() {
    if (localStorage.getItem("storageIndexCotizacionDestacadaSeleccionda") == null) {} else {
        var index = parseInt(localStorage.getItem('storageIndexCotizacionDestacadaSeleccionda'));
        CargarCotizacionesHistoricaHtml(index);
        var indexSlide2 = -1;
        for (var i = 0; i < swiper.slides.length; i++) {
            if (swiper.slides[i].id == 'swiper-slide2') {
                indexSlide2 = i;
            }
        }
        if (indexSlide2 != -1) {
            swiper.slideTo(indexSlide2);
        }
        onresizeBody();
    }
}

function CargarInformeCierreMercado() {
    var isTimeoutInformeCierreMercado = true;
    if (listaInformes != null) {
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
        //
        var cantValorMonedaHistorico = 0;
        for (var iHistoricoMoneda = 0; iHistoricoMoneda < cotizacionesDestacada[pIndex].listaHistorico.length; iHistoricoMoneda++) {
            var cantValorMonedaHistoricoAUX = cotizacionesDestacada[pIndex].listaHistorico[iHistoricoMoneda].abreviaturaMoneda.length + String(cotizacionesDestacada[pIndex].listaHistorico[iHistoricoMoneda].valorString).length;
            if (cantValorMonedaHistorico < cantValorMonedaHistoricoAUX) {
                cantValorMonedaHistorico = cantValorMonedaHistoricoAUX;
            }
        }
        //

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
            var cantValorMonedaAUXHistorico = this.abreviaturaMoneda.length + String(this.valorString).length;
            var strCantValorMonedaHistorico = '';
            //            if (cantValorMonedaAUXHistorico < cantValorMonedaHistorico) {
            //                for (var iValorMonedaHistorico = cantValorMonedaAUXHistorico; iValorMonedaHistorico < cantValorMonedaHistorico; iValorMonedaHistorico++) {
            //                    strCantValorMonedaHistorico += '&nbsp;' + '&nbsp;';
            //                }
            //            }
            //resultadoDiv += this.descripcionMoneda + ' ' + this.valor;
            resultadoDiv += strCantValorMonedaHistorico + this.abreviaturaMoneda + ' ' + this.valorString;
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
        //         setTimeout(function () {
        //           $('#swiper-slide2').width('100%');
        //        }, 200); 
    }
    //alert('AA');
}

function CargarNovedadesHtml() {
    var resultadoDiv = '';
    if (listaNovedades != null) {

        resultadoDiv += '<div id="divRowParteScrollNovedades">'; // parte scroll      
        var indiceNovedades = -1;
        $(listaNovedades).each(function () {
            indiceNovedades++;
            resultadoDiv += '<div class="row">';
            resultadoDiv += '<div class="col-xs-1 cssColImgNovedades">';
            if (this.url != '') {
                resultadoDiv += '<a href="javascript:loadURL(\'' + this.url + '\');" >';
                resultadoDiv += '<img src="img/material/icono-doc.svg" alt="novedades" class="cssImgNovedades" />';
                resultadoDiv += '</a>';
            } else {
                resultadoDiv += '<img src="img/material/icono-doc.svg" alt="novedades" class="cssImgNovedades" />';
            }
            resultadoDiv += '</div>';
            //
            resultadoDiv += '<div class="col-xs-11 ">';
            //
            // Primer fila novedades
            resultadoDiv += '<div class="row">';
            resultadoDiv += '<div class="col-xs-12 cssNovedadesTitulo">';
            resultadoDiv += this.titulo;
            resultadoDiv += '</div>';
            resultadoDiv += '</div>';
            // fin  Primer fila novedades
            resultadoDiv += '<div class="row ">';
            //            resultadoDiv += '<div class="col-xs-3 cssNovedadesFecha">';//col-sm-3
            //            resultadoDiv += obtenerFechaMostrar(this.fecha);
            //            resultadoDiv += '</div>';
            //            resultadoDiv += '<div class="col-xs-9 cssNovedadesCategoria">';//col-sm-9
            //            resultadoDiv += this.descripcionCategoria;
            //            resultadoDiv += '</div>';
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
            //
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
        resultadoDiv += '</div>'; // fin parte scroll   
    }

    if (listaNovedades != null) {
        if (listaNovedades.length > 0) {

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
    }

    //    var isTimeoutInformeCierreMercado = true;
    //    if (listaInformes != null) {
    //        if (listaInformes.length > 0) {
    //            isTimeoutInformeCierreMercado = false;
    //            CargarInformeCierreMercado();
    //        }
    //    }
    //    if (isTimeoutInformeCierreMercado) {
    //        setTimeout(function () {
    //            CargarInformeCierreMercado();
    //        }, 500);
    //    }
    CargarInformeCierreMercado();
}

function CargarInformeHtml() {
    var informesHtml = '';
    for (var i = 0; i < listaInformes.length; i++) {
        //alert(listaInformes[i].titulo);
        informesHtml += '<div id="divInformeTitulo" class="cssInformeTitulo">' + listaInformes[i].titulo + '</div>';
        informesHtml += '<div id="divInformeFecha" class="cssInformeFecha">' + obtenerFechaMostrar(listaInformes[i].fecha) + '</div>';
        informesHtml += '<div id="divInformeDescripcion" class="cssInformeDescripcion">' + listaInformes[i].texto + '</div>'
            //informesHtml += ;+ '<br/>' + '<a href="javascript:loadURL(\''+ 'http://www.agirregabiria.net/g/sylvainaitor/principito.pdf' +'\');" >pdf </a>' 
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

function finCargarInicial() {
    CargarHtmlFechaMenuPrincipal();
    OcultarDivBloqueo();
    if (listaNovedades == null) {
        porcentajeArriba = 1;
        porcentajeAbajo = 0;
    } else if (listaNovedades.length == 0) {
        porcentajeArriba = 1;
        porcentajeAbajo = 0;
    }

    onresizeBody();
}