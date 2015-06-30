//////////////////
var pushNotification;

function infoRegistracion() {
    this.uuid = '';
    this.type = ''; //"gcm" (Android), "apn" (iOS) y "mpn" (Windows Phone)
    this.regid = '';
    this.fecha = '';
    this.platform = '';
}
var objDatosTelefono = null;

document.addEventListener('deviceready', onDeviceReady, true);

function LlamarFuncionRegistracionTelefono(pUrlCargaDatosTel) {
    $.ajax({
        url: pUrlCargaDatosTel,
        type: 'GET',
        data: {},
        success: function (data) {
            //called when successful
            //  alert(data);
        },
        error: function (e) {
            //called when there is an error
            //  alert('CargaDatosTel:' + e);
            //window.location.href = "error.html";
        }
    });
}

function onDeviceReady() {
    //alert('onDeviceReady');
    objDatosTelefono = new infoRegistracion();
    pushNotification = window.plugins.pushNotification;
    objDatosTelefono.platform = device.platform;

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"

    if (device.platform == 'android' || device.platform == 'Android') {
        try {
            pushNotification.register(successHandler, errorHandler, {
                "senderID": "970066199992",
                "ecb": "onNotification"
            });
        } catch (err) {
            var txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            alert(txt);
        }
    } else if (device.platform == 'iOS') {
        try {
            //alert('pushNotificationiOS');
            pushNotification.register(tokenHandler, errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            }); // required!
        } catch (err) {
            //alert('pushNotificationiOS - error');
            alert('pushNotificationiOS - error: ' + err.message);
        }
    } else if (device.platform == 'WinCE' || device.platform == 'Win32NT') {
        var channelName = '34923EIGApp.EIGPush';
        try {
            pushNotification.register(
                channelHandler,
                errorHandler, {
                    "channelName": channelName,
                    "ecb": "onNotificationWP8",
                    "uccb": "channelHandler",
                    "errcb": "jsonErrorHandler"
                });
        } catch (err) {
            alert(err.message);
        }
    }
    objDatosTelefono.uuid = device.uuid;
    //alert(device.platform);
    if (localStorage.getItem("storagePlatform") == null) {
        localStorage.setItem('storagePlatform', device.platform);
    }

}

function successHandler(result) {
    //  alert('Callback Success! Result = '+result);
}

function errorHandler(error) {
    alert('errorHandler: ' + error);
}

function onNotification(e) {
        //alert('onNotification');
        switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                objDatosTelefono.regid = e.regid;
                objDatosTelefono.type = 'gcm';
                var urlCargaDatosTel = wsUrlRegistracionTelefono + objDatosTelefono.uuid + '/' + objDatosTelefono.type + '/' + objDatosTelefono.regid;
                LlamarFuncionRegistracionTelefono(urlCargaDatosTel);

            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            //alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);

            // alert(e.message); //'mensaje = ' 
            //CargarVentanaAlerta('', JSON.stringify(e));
            if (e.message != '') {
                CargarVentanaAlerta(e.payload.title, e.message);
            }
            break;

        case 'error':
            alert('GCM error = ' + e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            // break;
        }
    }
    /// inicio iOS

function onNotificationAPN(event) {

    //    if (event.alert) {
    //        navigator.notification.alert(event.alert);
    //    }
    if (event.body) {
        CargarVentanaAlerta(event.title, event.body);
    }
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

function tokenHandler(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        //alert('device token = ' + result);
        objDatosTelefono.regid = result;
        objDatosTelefono.type = 'apn';
        var urlCargaDatosTel = wsUrlRegistracionTelefono + objDatosTelefono.uuid + '/' + objDatosTelefono.type + '/' + objDatosTelefono.regid;

        LlamarFuncionRegistracionTelefono(urlCargaDatosTel);
    }
    /// fin iOS

/// inicio WP8
function channelHandler(event) {
    //objDatosTelefono.regid = event.uri;    
    objDatosTelefono.regid = event.uri.replace(/\//g, 'ELLECKTRACODE');
    objDatosTelefono.type = 'mpn';
    var urlCargaDatosTel = wsUrlRegistracionTelefono + objDatosTelefono.uuid + '/' + objDatosTelefono.type + '/' + objDatosTelefono.regid;
    LlamarFuncionRegistracionTelefono(urlCargaDatosTel);
    //alert(event.uri);
}

//handle MPNS notifications for WP8
function onNotificationWP8(e) {
        if (e.jsonContent) {
            CargarVentanaAlerta(e.jsonContent["wp:Text1"], e.jsonContent["wp:Text2"]);
        }
        if (e.type == "toast" && e.jsonContent) {
            pushNotification.showToastNotification(successHandler, errorHandler, {
                "Title": e.jsonContent["wp:Text1"],
                "Subtitle": e.jsonContent["wp:Text2"],
                "NavigationUri": e.jsonContent["wp:Param"]
            });
        }
        if (e.type == "raw" && e.jsonContent) {
            //alert(JSON.stringify(e));
            //alert(e.jsonContent.Body);
            CargarVentanaAlerta(JSON.stringify(e), e.jsonContent.Body);
        }
    }
    //function onNotificationWP8(e) {
    //    if (e.type == "toast" && e.jsonContent) {
    //        pushNotification.showToastNotification(successHandler, errorHandler,
    //        {
    //            "Title": e.jsonContent["wp:Text1"], "Subtitle": e.jsonContent["wp:Text2"], "NavigationUri": e.jsonContent["wp:Param"]
    //        });
    //    }
    //    if (e.type == "raw" && e.jsonContent) {
    //        alert(e.jsonContent.Body);
    //    }
    //}
function jsonErrorHandler(error) {
        //$("#app-status-ul").append('<li style="color:red;">error:' + error.code + '</li>');
        //    $("#app-status-ul").append('<li style="color:red;">error:' + error.message + '</li>');
        alert('jsonErrorHandler' + error.message);
    }
    /// fin WP8
    /////////////////