function login () {
			
			$('#message').slideUp('fast');
			alert("cjperez");
			$.ajax({
				data:  $('#formLogin').serialize(),
				url:   'php/login.php',
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
						alert(code);
						if(code == 'success') {
							window.location.replace("list_groups.html");
							$('#message').html(' Register was successful.');
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