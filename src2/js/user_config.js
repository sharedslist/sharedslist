//Obtiene el nombre del usuario
function getName() 
{	
	$('#currentUserName').slideUp('fast');
	$.ajax({
		data:  {getUser : "usuario"},
		url:   URL_SERVER +'php/userConfig.php',
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
//Actualiza el nomre y/o la contraseña del usuario
function updateProfile (e) {
	//e.preventDefault();
	$('#messageUserConfig').slideUp('fast');
	alert($('#formUserConfig').serialize());

	$.ajax({
		data:  $('#formUserConfig').serialize(),
		url:   URL_SERVER +'php/userConfig.php',
		type:  'post',
		success:  function (data)
			   {
				var code = data.trim();
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
			}
	});
			
	return false;
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#user_config", function() {
	//obtenemos el idioma de la página
	var lang = i18n.lng();
	//marcamos como seleccionado el idioma actual
	$('#select_lang').val(lang);
});