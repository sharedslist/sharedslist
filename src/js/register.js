		  function registrar (e) {
			//e.preventDefault();
			$('#message').slideUp('fast');

			$.ajax({
				data:  $('#formRegistro').serialize(),
				url:   'php/register.php',
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
						if(code == 'success') {
							$('#message').html(' Registrado correcamente.');
							//redirects to welcome page
							location.location.href = "list_groups.html";
						}
						else {
							$('#message').html(data);
						}
						$('#message').slideDown('fast');	
					   },
				error: function () {
						$('#message').html('An error occurred, please try again.');
						$('#message').slideDown('fast');
					}
			});
			
			return false;
		  };