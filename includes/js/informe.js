$(document).ready(function () {
    MostrarDivBloqueo();
    CargarHtmlFechaMenuPrincipal();
    var listaInformesGuardada = localStorage.getItem("storageListaInformes");
    listaInformes = eval('(' + listaInformesGuardada + ')');
    CargarPantallaCompletaInformeHtml();
    OcultarDivBloqueo();
    onresizeBody();
});

function CargarPantallaCompletaInformeHtml() {
    var informesHtml = '';
    for (var i = 0; i < listaInformes.length; i++) {
        informesHtml += '<div id="divInformeTitulo" class="cssInformeTitulo">' + listaInformes[i].titulo + '</div>';
        informesHtml += '<div id="divInformeFecha" class="cssInformeFecha">' + obtenerFechaMostrar(listaInformes[i].fecha) + '</div>';
        informesHtml += '<div id="divInformeDescripcion" class="cssInformeDescripcion">' + listaInformes[i].texto;
        if (listaInformes[i].url != '') {
            informesHtml += '<div id="divInformeUrl" class="cssInformeUrl" onclick="loadURL(\'' + listaInformes[i].url + '\');">'; //+ 
            //informesHtml += '<a href="javascript:loadURL(\'' + listaInformes[i].url + '\');" >';
            informesHtml += '<div class="btnDescargarPDF" >';
            informesHtml += '<img class="cssImgDescargarPDF" alt="descargar" src="img/material/ampliarAbajo.svg" />';
            informesHtml += ' &nbsp;&nbsp;DESCARGAR EN ARCHIVO';
            //informesHtml += '<img src="img/material/icono-doc.svg" alt="novedades" class="cssImgNovedades" />';
            informesHtml += '</div>';
            //informesHtml += '</a>';
            informesHtml += '</div>';
        }
        informesHtml += '</div>';
        break;
    }
    $('#divResultadoInforme').html(informesHtml);
}

function onresizeBody() {
    var altura = ($(document).height() - $('#header').outerHeight()); //- ($('#divInformeFecha').height() +$('#cssInformeTitulo').height())
    $('#divResultadoInforme').css('height', altura);
    $('#divInformeDescripcion').css('height', $('#divResultadoInforme').innerHeight() - ($('#divInformeFecha').outerHeight() + $('#divInformeTitulo').outerHeight()));
}

function onclickFullScreenInformesAbajo() {
    //  window.location.href = "index.html?r=1";
    RedireccionarPagIndex();
}