		  function registrar (e) {
			//e.preventDefault();
			$('#messageRegister').slideUp('fast');

			$.ajax({
				data:  $('#formRegistro').serialize(),
				url:   'php/register.php',
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
						if(code == 'success') {
							$('#messageRegister').html(' Registrado correcamente.');
							//redirects to welcome page
							window.location.href = "list_groups.html";
						}
						else {
							$('#messageRegister').html(data);
						}
						$('#messageRegister').slideDown('fast');	
					   },
				error: function () {
						$('#messageRegister').html('An error occurred, please try again.');
						$('#messageRegister').slideDown('fast');
					}
			});
			
			return false;
		  };