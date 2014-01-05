var id = 1; // Identificador de los checkbox

/*
 * Añade el correo del campo #addMemberEmail a la lista de correo
 * si y sólo si es un correo válido.
 */
function addCorreos()
{
	var txt = $("#addMemberEmail");
	var val = txt.val();
	if(validateEmail(val)){
		$("#check2").append('<input type="checkbox" checked id="cb'+id+'"/><label id="cb'+id+'"for="cb'+id+'">'+val+'</label>');
		$("#check").trigger("create");
		id = id +1;
		$("#addMemberEmail").val("");
		$('#messageAddMember').html('');
	}
	else{
		$('#messageAddMember').html('Email incorrecto');
	}
}

/*
 * Devuelve cierto si y solo si el parámetro de entrada 
 * email tiene la estructura de un correo electrónico. 
 * En caso contrario devuelve falso.
 */
function validateEmail(email) 
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


/*
 * Envía una petición ajax con los
 * correos electrónicos seleccionados en la lista de correos.
 * Añade 
 */
function addMembers()
{
	var users = new Array();
		var n = $('form#addMember').find('input:checked');
		var email;
		for(var i=1; i< n.length+1; i++)
		{	
			email = $("#"+n[i-1].id).next("label").text();
			users[i-1] = {'email' : $.trim(email)};
		}
		var parameters = { "users" : users};
		$.ajax({
			data:  parameters,
			url:   'php/add_members.php',
			dataType: 'text',
			type:  'post',
			success:  function (response)
				   {
					var code = response.trim();
					if(code == 'success') {
					$('#messageAddMember').html("");
						window.location.href = '#list_members';
					}
					else{
						$('#messageAddMember').html(response);
					}},
			error: function () {
					$('#messageAddMember').html('An error occurred, please try again.');
			}
			});
	

}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).ready(function() {
	isConnected() ;
});
