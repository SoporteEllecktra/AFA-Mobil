$(document).ready(function () {
    var isVolverIndex = true;
    if (!localStorage.getItem("storageTelefono")) {
        isVolverIndex = false;
    }
    if (isVolverIndex) {
        window.location.href = "index.html";
    } else {
		ActualizarAltoFondoBloqueo();
        OcultarDivBloqueo();
    }
});

function onclickIngresarTelefono() {
    if (!$.trim($('#txtTelefonoArea').val()).length || !$.trim($('#txtTelefono').val()).length) { // zero-length string AFTER a trim
		alert('Existe un error en la aplicación. Contáctese con su proveedor.');
    } else {
        var varTelefono = $('#txtTelefonoArea').val() + $('#txtTelefono').val();
        if (varTelefono != '') {
            if (varTelefono.length == 10) {
                funGuardarTelefono(varTelefono);
            } else {
                alert('Formato del número incorrecto');
            }
        }
    }
}

function justNumbers(e) {
//    var keynum = window.event ? window.event.keyCode : e.which;
//    if ((keynum == 8)) //|| (keynum == 46)
//        return true;
//    return /\d/.test(String.fromCharCode(keynum));
    var key = window.Event ? e.which : e.keyCode;
	return (key >= 48 && key <= 57);
}