function isConnected() 
{	
	$.ajax({
		url:   'php/connected.php',
		type:  'get',
			success: function (data) {
				var response = data.trim();
				if(response == "Error: no login"){
					window.location.href = 'login.html';
				}
			}
	});
};