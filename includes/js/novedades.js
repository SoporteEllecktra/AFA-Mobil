$(document).ready(function () {
    MostrarDivBloqueo();
    CargarHtmlFechaMenuPrincipal();
    var listaNovedadesGuardada = localStorage.getItem("storageListaNovedades");
    listaNovedades = eval('(' + listaNovedadesGuardada + ')');
    CargarTodasNovedadesHtml();
    OcultarDivBloqueo();
    onresizeBody();
});
function onresizeBody() {
    var altura = ($(document).height() - $('#header').height());
    $('#divResultadoNovedades').css('height', altura);
}
function CargarTodasNovedadesHtml() {
    var resultadoDiv = '';
    if (listaNovedades != null) {
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
            if (indiceNovedades == 0) {
                resultadoDiv += '<div class="col-xs-11 cssNovedadesTitulo">';
                resultadoDiv += this.titulo;
                resultadoDiv += '</div>';
                resultadoDiv += '<div class="col-xs-1 " onclick="onclickFullScreenNovedadesAbajo()">';//onclick="onclickFullScreenNovedadesAbajo()"
                //resultadoDiv += '<img src="img/material/ampliarAbajo.svg" alt="ampliar bajo" class="cssImgAmpliar" />';
                resultadoDiv += '<input type="button" class="cssImgImputButtonAchicar"  onclick="onclickFullScreenNovedadesAbajo(); return false;"/>';
                resultadoDiv += '</div>';
            } else {
                resultadoDiv += '<div class="col-xs-12 cssNovedadesTitulo">';
                resultadoDiv += this.titulo;
                resultadoDiv += '</div>';
            }
            resultadoDiv += '</div>';
            // fin  Primer fila novedades
            resultadoDiv += '<div class="row ">';
            resultadoDiv += '<div class="col-sm-2 cssNovedadesFecha">';
            resultadoDiv += obtenerFechaMostrar(this.fecha);
            resultadoDiv += '</div>';
            resultadoDiv += '<div class="col-sm-10 cssNovedadesCategoria">';
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

    }
    $('#divResultadoNovedades').html(resultadoDiv);
}
function onclickFullScreenNovedadesAbajo() {
    window.location.href = "index.html?r=1";

}