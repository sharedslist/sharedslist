/*
 * Envía una petición ajax para comprobar
 * si hay un usuario en sesión.
 */
function isConnected() 
{	
	$.ajax({
		url:   'php/connected.php',
		type:  'get',
			success: function (data) {
				var response = data.trim();
				if(response == "Error: no login"){
					window.location.href = '#login';
				}
				else{
					$("body").show();
				}
			}
	});
};