
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

function updateProfile (e) {
	//e.preventDefault();
	$('#message').slideUp('fast');

	$.ajax({
		data:  $('#formUserConfig').serialize(),
		url:   'php/userConfig.php',
		type:  'post',
		success:  function (data)
			   {
				var code = data.trim();
				$('#message').html(code);
				$('#message').slideDown('fast');
				getName();	
			   },
		error: function () {
				$('#message').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
				$('#message').slideDown('fast');
			}
	});
			
	return false;
}