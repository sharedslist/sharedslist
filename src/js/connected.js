/*
 * Envía una petición ajax para comprobar
 * si hay un usuario en sesión.
 */
function isConnected() 
{	
	$.ajax({
<<<<<<< HEAD
		url:   'php/connected.php',
=======
		url:   URL_SERVER +'php/connected.php',
>>>>>>> origin/develop
		type:  'get',
			success: function (data) {
				var response = data.trim();
				if(response == "Error: no login"){
<<<<<<< HEAD
					window.location.href = 'login.html';
=======
					window.location.href = '#login';
>>>>>>> origin/develop
				}
				else{
					$("body").show();
				}
			}
	});
};