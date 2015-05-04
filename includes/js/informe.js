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
        //alert(listaInformes[i].titulo);
        informesHtml += '<div id="divInformeTitulo" class="cssInformeTitulo">'+ listaInformes[i].titulo +'</div>'; 
        informesHtml += '<div id="divInformeFecha" class="cssInformeFecha">'+ obtenerFechaMostrar(listaInformes[i].fecha) +'</div>';
        informesHtml += '<div id="divInformeDescripcion" class="cssInformeDescripcion">' +   listaInformes[i].texto +'</div>'; 
        break;
    }
   $('#divResultadoInforme').html(informesHtml);
}
function onresizeBody() {
    var altura = ($(document).height() - $('#header').height()) ;//- ($('#divInformeFecha').height() +$('#cssInformeTitulo').height()  )
    $('#divResultadoInforme').css('height', altura);
    $('#divInformeDescripcion').css('height', $('#divResultadoInforme').innerHeight() - ($('#divInformeFecha').outerHeight() + $('#divInformeTitulo').outerHeight() ));// 
}
function onclickFullScreenInformesAbajo() {
    window.location.href = "index.html?r=1";
}