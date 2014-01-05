var id = 1; // Identificador de los checkbox

/*
 * Añade el correo del campo #CreateGroupEmails a la lista de correo
 * si y sólo si es un correo válido.
 */
function addUsers()
{
	var txt = $("#CreateGroupEmails");
	var val = txt.val();
	if(validateEmail(val)){
		$("#CreateGroupCheck2").append('<input type="checkbox" checked id="cb'+id+'"/><label id="cb'+id+'"for="cb'+id+'">'+val+'</label>');
		$("#CreateGroupCheck").trigger("create");
		id = id +1;
		$("#CreateGroupEmails").val("");
		$('#messageCreateGroups').html('');
	}
	else{
		$('#messageCreateGroups').html('Email incorrecto');
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
 * Devuelve cierto si y solo si el parámetro de entrada name 
 * no se encuentra vacío. En caso contrario devuelve falso.
 */
function validateName(name) 
{ 	
	if($.trim(name) == ""){
		return false;
	}
	else{
		return true;
	}
}

/*
 * Envía una petición ajax con el nombre del grupo y los
 * correos electrónicos seleccionados en la lista de correos.
 * Crea el grupo y devuelve la página encargada de listar grupos.
 */
function createGroup()
{
	var users = new Array();
	var group_name = $("#CreateGroupName").val();
	if(validateName(group_name)){
		var n = $('form#createGroupForm').find('input:checked');
		var email;
		for(var i=1; i< n.length+1; i++)
		{	
			email = $("#"+n[i-1].id).next("label").text();
			users[i-1] = {'email' : $.trim(email)};
		}
		var parameters = { "users" : users, "group_name" : group_name};
		$.ajax({
			data:  parameters,
			url:   'php/create_groups.php',
			dataType: 'text',
			type:  'post',
			success:  function (response)
				   {
					var code = response.trim();
					if(code == 'success') {
						window.location.href = '#list_groups';
					}
					else{
						$('#messageCreateGroups').html(response);
					}},
			error: function () {
					$('#messageCreateGroups').html('An error occurred, please try again.');
			}
			});
	}
	else{
		$('#messageCreateGroups').html('Nombre de grupo vacío');
	}
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).ready(function() {
	isConnected() ;
});
