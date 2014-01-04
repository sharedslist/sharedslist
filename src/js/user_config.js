//Obtiene el nombre del usuario
function getName() 
{	
	$('#currentUserName').slideUp('fast');
	$.ajax({
		data:  {getUser : "usuario"},
		url:   'php/userConfig.php',
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

	$.ajax({
		data:  $('#formUserConfig').serialize(),
		url:   'php/userConfig.php',
		type:  'post',
		success:  function (data)
			   {
				var code = data.trim();
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