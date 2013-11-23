function login () {
			
			$('#message').slideUp('fast');
			$.ajax({
				data:  $('#formLogin').serialize(),
				url:   'php/login.php',
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
					
						if(code == 'Conectado correctamente') {
							window.location.href = 'list_groups.html';
							$('#message').html(' Se ha autenticado correctamente.');
						}
						else {
							$('#message').html(data);
						}
						$('#message').slideDown('fast');	
					   },
				error: function () {
						$('#message').html('Ha ocurrido un error, por favor pruebe de nuevo.');
						$('#message').slideDown('fast');
					}
			});
			
			return false;
		  };