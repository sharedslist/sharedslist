	function remember_password () {
		var email = $("#email").val();
		var parameters = { "emailAddress" : email};
		$.ajax({
		data:  parameters,
		url:   'php/remember_password.php',
		dataType: 'text',
		type:  'post',
		success:  function (response){
				if(response == 'success') {
					$('#message').html('Se ha generado una nueva contraseña aleatoria y se ha enviado a su email.');
					
				}else {
					$('#message').html(response);
				}
				$('#message').slideDown('fast');	
			},
			   
		error: function () {
			$('#message').html('errror');
		}
		});
	}