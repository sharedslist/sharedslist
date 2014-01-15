//cierra la sesión del usuario
function logout() 
{	
	$.ajax({
		url:   URL_SERVER +'php/logout.php',
		type:  'GET',
		success:  function (data)
					{
						//Redirige a la página de login
						window.location.href = "#login";							
					}
	});		
	return false;

};
