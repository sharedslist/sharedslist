	function remember_password () {
		var email = $("#rememberEmail").val();
		var parameters = { "emailAddress" : email};
		$.ajax({
		data:  parameters,
		url:   URL_SERVER +'php/remember_password.php',
		dataType: 'text',
		type:  'post',
		success:  function (response){
				if(response.trim() == 'success') {
					$('#messageRememberPassword').html('Se ha generado una nueva contraseña aleatoria y se ha enviado a su email.');
					
				}else {
					$('#messageRememberPassword').html(response);
				}
				$('#messageRememberPassword').slideDown('fast');	
			},
			   
		error: function () {
			$('#messageRememberPassword').html('errror');
		}
		});
	}