//////////////////

var pushNotification;
function infoRegistracion() {
    this.uuid = '';
    this.type = ''; //"gcm" (Android), "apn" (iOS) y "mpn" (Windows Phone)
    this.regid = '';
    this.fecha = '';
}
var objDatosTelefono = null;

document.addEventListener('deviceready', onDeviceReady, true);

function onDeviceReady() {
    //alert('onDeviceReady');
    objDatosTelefono = new infoRegistracion();
    pushNotification = window.plugins.pushNotification;

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"

    if (device.platform == 'android' || device.platform == 'Android') {
        try {
            pushNotification.register(successHandler, errorHandler, { "senderID": "970066199992", "ecb": "onNotification" });
        } catch (err) {
            var txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            alert(txt);
        }
    } else if (device.platform == 'iOS') {
        try {
             //alert('pushNotificationiOS');
            pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });	// required!
        } catch (err) {
              //alert('pushNotificationiOS - error');
            alert('pushNotificationiOS - error: ' + err.message);
        }
    } else if (device.platform == 'WinCE' || device.platform == 'Win32NT') {
        try {
            pushNotification.register(
                channelHandler,
                errorHandler,
                {
                    "channelName": channelName,
                    "ecb": "onNotificationWP8",
                    "uccb": "channelHandler",
                    "errcb": "jsonErrorHandler"
                });
        } catch (err) {
            alert(err.message);
        }
    }
    //    


    //try {
    //    pushNotification.register(successHandler, errorHandler, { "senderID": "970066199992", "ecb": "onNotification" });
    //} catch (err) {
    //    var txt = "There was an error on this page.\n\n";
    //    txt += "Error description: " + err.message + "\n\n";
    //    alert(txt);
    //}
    //	 var element = document.getElementById('deviceProperties');
    //        element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
    //                            'Device Cordova: '  + device.cordova  + '<br />' +
    //                            'Device Platform: ' + device.platform + '<br />' +
    //                            'Device UUID: '     + device.uuid     + '<br />' +
    //                            'Device Version: '  + device.version  + '<br />';
    objDatosTelefono.uuid = device.uuid;
}

// result contains any message sent from the plugin call

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
                //console.log("Regid " + e.regid);

                //document.getElementById("txtClave").value = e.regid;
                // alert('registration id = '+e.regid);
                objDatosTelefono.regid = e.regid;
                objDatosTelefono.type = 'gcm';
                var urlCargaDatosTel = wsUrlRegistracionTelefono + objDatosTelefono.uuid + '/' + objDatosTelefono.type + '/' + objDatosTelefono.regid;

                $.ajax({
                    url: urlCargaDatosTel,
                    type: 'GET',
                    data: {},
                    success: function (data) {
                        //called when successful
                      //  alert(data);
                    },
                    error: function (e) {
                        //called when there is an error
                        alert(e);
                    }
                });

            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            //alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
            alert(e.message);//'mensaje = ' 
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
    if (event.alert) {
        navigator.notification.alert(event.alert);
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

                $.ajax({
                    url: urlCargaDatosTel,
                    type: 'GET',
                    data: {},
                    success: function (data) {
                        //called when successful
                      //  alert(data);
                    },
                    error: function (e) {
                        //called when there is an error
                        alert(e);
                    }
                });
    
}


/// fin iOS

/// inicio WP8
//handle MPNS notifications for WP8
function onNotificationWP8(e) {

    if (e.type == "toast" && e.jsonContent) {
        pushNotification.showToastNotification(successHandler, errorHandler,
        {
            "Title": e.jsonContent["wp:Text1"], "Subtitle": e.jsonContent["wp:Text2"], "NavigationUri": e.jsonContent["wp:Param"]
        });
    }

    if (e.type == "raw" && e.jsonContent) {
        alert(e.jsonContent.Body);
    }
}

function jsonErrorHandler(error) {
    //$("#app-status-ul").append('<li style="color:red;">error:' + error.code + '</li>');
    //    $("#app-status-ul").append('<li style="color:red;">error:' + error.message + '</li>');
    alert( error.message );
}
/// fin WP8
/////////////////