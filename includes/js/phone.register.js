// Only use for PUSH Notifications
var phoneRegistrationURL = 'http://190.210.143.156:50002/registrationinfo/';

var pushNotification = null;
var phoneData = null;

function phoneInfo() {
    this.uuid = '';
    this.type = ''; // "gcm" (Android), "apn" (iOS) y "mpn" (Windows Phone)
    this.regid = '';
    this.fecha = '';
    this.platform = '';
}

function phoneRegistration(registration_url) {
    $.ajax({
        url: registration_url,
        type: 'GET',
        data: {},
        success: function (data) {
            //  alert(data);
			return;
        },
        error: function (e) {
			processError('', 7000, '');
			return;
        }
    });
}

function pushNotificationsRegistration() {
	if (!storage["deviceready"] || 
		(storage["deviceready"] && storage["deviceready"] == 'no')) {
		return;
	}

	if (!pushNotification) {
		processError('', 6001, '');
	}

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "iOS"
    //   - "WinCE"
    if (device.platform == 'android' || device.platform == 'Android') {
        try {
            pushNotification.register(successHandler, errorHandler, {
                "senderID": "347764234854",
                "ecb": "onNotification"
            });
        } catch (err) {
			processError('', 6002, '');
        }
    } else if (device.platform == 'iOS') {
        try {
            pushNotification.register(tokenHandler, errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            });
        } catch (err) {
			processError('', 6003, '');
        }
    } else if (device.platform == 'WinCE' || device.platform == 'Win32NT') {
        var channelName = 'AFASCL.AFAMvil';
        try {
            pushNotification.register(
                channelHandler,
                errorHandler, {
                    "channelName": channelName,
                    "ecb": "onNotificationWP8",
                    "uccb": "channelHandler",
                    "errcb": "wpnErrorHandler"
                });
        } catch (err) {
			processError('', 6004, '');
        }
    }
}

function onDeviceReady() {
    //alert('onDeviceReady');
    phoneData = new phoneInfo();
    pushNotification = window.plugins.pushNotification;
    phoneData.platform = device.platform;
    phoneData.uuid = device.uuid;

    storage['platform'] = device.platform;
	storage['deviceready'] = 'yes';

	document.target = { 'isIndex': true };
	mobileEventsHandler(document);

	if (isPhone() && (!storage["phoneNumber"] || 
	    (storage["phoneNumber"] && storage["phoneNumber"] == ''))) {
		window.location.href = "phone_register.html";
		return;
	}

	getUpdates();
}

function successHandler(result) {
    //  alert('Callback Success! Result = '+result);
}

function errorHandler(error) {
	processError('', 6005, '');
}

function onNotification(e) {
	//alert('onNotification');
	switch (e.event) {
	case 'registered':
		if (e.regid.length > 0) {
			phoneData.regid = e.regid;
			phoneData.type = 'gcm';
			var url = phoneRegistrationURL + phoneData.uuid + '/' + phoneData.type + '/' + phoneData.regid;

			phoneRegistration(url);
		}
		break;

	case 'message':
		if (e.message.length > 0) {
			showAlertWindow(e.payload.title, e.message);
		}
		break;

	case 'error':
		//alert('Error al registrar el dispositivo con Android.');
		processError('', 6006, '');
		break;

	default:
		//alert('Error al registrar el dispositivo con Android.');
		processError('', 6007, '');
	}
}

function onNotificationAPN(event) {
    if (event.body && event.body.length > 0) {
        showAlertWindow(event.title, event.body);
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
	phoneData.regid = result;
	phoneData.type = 'apn';
	var url = phoneRegistrationURL + phoneData.uuid + '/' + phoneData.type + '/' + phoneData.regid;

	phoneRegistration(url);
}

function channelHandler(event) {   
    phoneData.regid = event.uri.replace(/\//g, 'ELLECKTRACODE');
    phoneData.type = 'mpn';
    var url = phoneRegistrationURL + phoneData.uuid + '/' + phoneData.type + '/' + phoneData.regid;

	phoneRegistration(url);
    //alert(event.uri);
}

// Handler MPNS notifications for WP8
function onNotificationWP8(e) {
	if (e.jsonContent && e.jsonContent["wp:Text2"].length > 0) {
		showAlertWindow(e.jsonContent["wp:Text1"], e.jsonContent["wp:Text2"]);
	}
	if (e.type == "toast" && e.jsonContent) {
		pushNotification.showToastNotification(successHandler, errorHandler, {
			"Title": e.jsonContent["wp:Text1"],
			"Subtitle": e.jsonContent["wp:Text2"],
			"NavigationUri": e.jsonContent["wp:Param"]
		});
	}
	if (e.type == "raw" && e.jsonContent && e.jsonContent.Body.length > 0) {
		//alert(JSON.stringify(e));
		showAlertWindow(JSON.stringify(e), e.jsonContent.Body);
	}
}

function wpnErrorHandler(error) {
    //alert('Error al registrar el dispositivo con Windows Phone.');
	processError('', 6008, '');
}
