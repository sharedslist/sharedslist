window.idinvitation = -1;		 
	function registrar (e) {
		//e.preventDefault();
		$('#messageRegister').slideUp('fast');
		if (window.idinvitation == -1) {
			$.ajax({
				data:  $('#formRegistro').serialize(),
				url:   URL_SERVER +'php/register.php',
				type:  'post',
				success:  function (data)
				   {
					var code = data.trim();
					if(code == 'success') {
						$('#messageRegister').html(' Registrado correcamente.');
						//redirects to welcome page
						window.location.href = "#list_groups";
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
		}
		else {
			var parameters = $('#formRegistro').serialize() + "&idinvitation=" + window.idinvitation;
			$.ajax({
				data:  parameters,
				url:   URL_SERVER +'php/accept_invitation.php',
				type:  'post',
				success:  function (data)
					   {
						var code = data.trim();
						if(code == 'success') {
							$('#messageRegister').html(' Registrado correcamente.');
							//redirects to welcome page
							window.location.href = "#list_groups";
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
		}	
		return false;
  };
  
  /**
 * Solicita los parametros de la url y completa el formulario
 * con los mismos. Solo es necesario asegurarse del correo y el id
 * de la invitacion.
 */
function comprobarInvitacion () {
	var parametros = getUrlVars();
	if (parametros['idinvitation'] != null) {
		window.idinvitation = parametros['idinvitation'];
		var email = parametros['email'];
	}

	if ( window.idinvitation !=-1 &&  email != null ) {
		$('#emailAddress').val(email.trim());
		$('#emailAddress').attr('readonly', true);
	}	
}
/*
* Mira los parametros de una peticion get.
*/
function getUrlVars()
{
    var vars = [], hash;
    var hashes = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1)).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}