$(document).ready(function () {

    onresizeBody();
});
function onresizeBody() {
    //var altura = ($(document).height() - $('#header').height());
    //$('#divResultadoNovedades').css('height', altura);
}
function CargarTodasNovedadesHtml() {
   // var resultadoDiv = '';
   // if (listaNovedades != null) {
   //  }
   //  $('#divResultadoNovedades').html(resultadoDiv);
}
function onclickIngresarTelefono(){
//if (localStorage.getItem("storageTelefono") == null) {
//        isGuardarTelefono = true;
//    } 
  var varTelefono = $('#txtTelefono').val();
    if (varTelefono != ''){
        funGuardarTelefono(varTelefono);
    }
}
function justNumbers(e)
{
var keynum = window.event ? window.event.keyCode : e.which;
if ((keynum == 8) )//|| (keynum == 46)
return true;
 
return /\d/.test(String.fromCharCode(keynum));
}