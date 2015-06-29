$(document).ready(function () {
    // localStorage.clear();
    //localStorage.setItem('storagePlatform', 'Android');
    var isVolverIndex = true;
    if (localStorage.getItem("storageTelefono") == null) {
        isVolverIndex = false;
    }
    if (isVolverIndex) {
        window.location.href = "index.html";
    } else {
        OcultarDivBloqueo();
    }
    onresizeBody();
});

function onresizeBody() {
    //var altura = ($(document).height() - $('#header').height());
    //$('#divResultadoNovedades').css('height', altura);
    ActualizarAltoFondoBloqueo();
}

function CargarTodasNovedadesHtml() {
    // var resultadoDiv = '';
    // if (listaNovedades != null) {
    //  }
    //  $('#divResultadoNovedades').html(resultadoDiv);
}

function onclickIngresarTelefono() {
    //if (localStorage.getItem("storageTelefono") == null) {
    //        isGuardarTelefono = true;
    //    } 

    if (!$.trim($('#txtTelefonoArea').val()).length || !$.trim($('#txtTelefono').val()).length) { // zero-length string AFTER a trim
        //  alert('Ok');
    } else {
        var varTelefono = $('#txtTelefonoArea').val() + $('#txtTelefono').val();
        if (varTelefono != '') {
            if (varTelefono.length == 10) {
                //alert('Ok');
                funGuardarTelefono(varTelefono);
            } else {
                alert('Formato del número incorrecto');
            }
        }
    }
}

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8)) //|| (keynum == 46)
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}