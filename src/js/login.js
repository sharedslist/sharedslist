<<<<<<< HEAD
﻿function login () {
=======
function doLogin () {

            var checkbox = $('#loginRemember'),
            emailField = $('#loginEmail'),
            passwordField = $('#loginPassword'),
            keyUser = 'savedEmail',
            keyPassword = 'savedPassword';

            if (checkbox.prop('checked')) {
                window.localStorage.setItem(keyUser, emailField.val());
                window.localStorage.setItem(keyPassword, passwordField.val());
            }
            else {
                window.localStorage.clear();
            }

>>>>>>> origin/develop
			
			$('#message').slideUp('fast');
			$.ajax({
				data:  $('#formLogin').serialize(),
<<<<<<< HEAD
				url:   'php/login.php',
=======
				url:   URL_SERVER + 'php/login.php',
>>>>>>> origin/develop
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
					
<<<<<<< HEAD
						if(code == 'Conectado correctamente') {
							window.location.href = 'list_groups.html';
							$('#message').html(' Se ha autenticado correctamente.');
=======
						if(code.search('Conectado correctamente') == 0) {
							//averiguamos el idioma del usuario
							var lang = code.split(";")[1];
							//traducimos la interfaz si está en otro idioma que el del usuario
							if( i18n.lng() != lang ) {
								i18n.setLng(lang, function(){
									$("html").i18n();
								});
							}
							$.mobile.changePage('#list_groups');
							$('#message').html( i18n.t('message.authenticationOK') );
>>>>>>> origin/develop
						}
						else {
							$('#message').html(data);
						}
						$('#message').slideDown('fast');	
					   },
				error: function () {
<<<<<<< HEAD
						$('#message').html('Ha ocurrido un error, por favor pruebe de nuevo.');
=======
						$('#message').html( i18n.t('message.genericError') );
>>>>>>> origin/develop
						$('#message').slideDown('fast');
					}
			});
			
			return false;
<<<<<<< HEAD
		  };
=======
		  };




    //Comprueba que esten guardados el usuario y la contraseña
    function checkLogin() {
        var checkbox = $('#loginRemember'),
            emailField = $('#loginEmail'),
            passwordField = $('#loginPassword'),
 
        // assign the key name to a variable
        // so we don't have to type it up every time
         keyUser = 'savedEmail',
         keyPassword = 'savedPassword';

        var savedEmail = window.localStorage.getItem(keyUser);
        var savedPassword = window.localStorage.getItem(keyPassword);

        // if a username was saved from previous session
        // set the value of the username field to that
        // tick off the checkbox and set focus on password field
        if (savedEmail) {
            emailField.val(savedEmail);
            passwordField.val(savedPassword);
            checkbox.prop('checked', true);
        }
     
        // if username wasn't saved then
        // set username field value to blank and focus on it
        // and make sure the checkbox is unchecked
        else {
            emailField.val('');
            passwordField.val('');
            checkbox.prop('checked', false);
        }

    };
>>>>>>> origin/develop
