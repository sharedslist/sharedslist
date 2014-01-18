

function initapp () {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		document.addEventListener("deviceready", onDeviceReady, false);
    }
	
}

function onDeviceReady () {
	  $("#divOnPhone").show();
}


function onPhone() {
    // specify contact search criteria
    var options = new ContactFindOptions();
    options.filter = "";      // empty search string returns all contacts
    options.multiple = true;  // return multiple results
    filter = ["emails"]; // return contact.displayName field

    // find contacts
    navigator.contacts.find(filter, onSuccess, onError, options);
}

   
    function onSuccess(contacts) {
    	var emails = new Array();
        for (var i=0; i<contacts.length; i++) {
            appendCorreo(contacts[i].emails[0].value.trim());
        }
    }

    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('onError!');
    }
