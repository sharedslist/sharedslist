<<<<<<< HEAD
﻿
=======
﻿//Obtiene el nombre del usuario
>>>>>>> origin/develop
function getName() 
{	
	$('#currentUserName').slideUp('fast');
	$.ajax({
		data:  {getUser : "usuario"},
<<<<<<< HEAD
		url:   'php/userConfig.php',
=======
		url:   URL_SERVER +'php/userConfig.php',
>>>>>>> origin/develop
		type:  'post',
		success:  function (data)
					{
					var userName = data.trim();
					$('#currentUserName').html(userName);
					$('#currentUserName').slideDown('fast');							
					},
		error: function () {
					$('#currentUserName').html('Error al conectar.');
					$('#currentUserName').slideDown('fast');
					}
	});		
	return false;

};
<<<<<<< HEAD

function updateProfile (e) {
	//e.preventDefault();
	$('#message').slideUp('fast');

	$.ajax({
		data:  $('#formUserConfig').serialize(),
		url:   'php/userConfig.php',
=======
//Actualiza el nomre y/o la contraseña del usuario
function updateProfile (e) {
	//e.preventDefault();
	$('#messageUserConfig').slideUp('fast');

	$.ajax({
		data:  $('#formUserConfig').serialize(),
		url:   URL_SERVER +'php/userConfig.php',
>>>>>>> origin/develop
		type:  'post',
		success:  function (data)
			   {
				var code = data.trim();
<<<<<<< HEAD
				$('#message').html(code);
				$('#message').slideDown('fast');
				getName();	
			   },
		error: function () {
				$('#message').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
				$('#message').slideDown('fast');
=======
				if( code.search('lang=') == 0 ) {
					var lang = code.substring(5,7);
					//traducimos la interfaz
					i18n.setLng(lang, function(){
						$("html").i18n();
					});
					code = code.substring(8);
				}
				$('#messageUserConfig').html(code);
				$('#messageUserConfig').slideDown('fast');
				getName();	
			   },
		error: function () {
				$('#messageUserConfig').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
				$('#messageUserConfig').slideDown('fast');
>>>>>>> origin/develop
			}
	});
			
	return false;
<<<<<<< HEAD
}
=======
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#user_config", function() {
	//recuperamos el nombre del usuario y lo mostramos
	getName();
	//obtenemos el idioma de la página
	var lang = i18n.lng();
	//marcamos como seleccionado el idioma actual
	$('#select_lang').val(lang).change();
});
>>>>>>> origin/develop
