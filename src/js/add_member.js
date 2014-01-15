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
		appendCorreo(val);
	}
	else{
		$('#messageAddMember').html('Email incorrecto');
	}
}

function appendCorreo(val){
		$("#check2").append('<input type="checkbox" checked id="cb'+id+'"/><label id="cb'+id+'"for="cb'+id+'">'+val+'</label>');
		$("#check").trigger("create");
		id = id +1;
		$("#addMemberEmail").val("");
		$('#messageAddMember').html('');


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
			url:   URL_SERVER + 'php/add_members.php',
			dataType: 'text',
			type:  'post',
			success:  function (response)
				   {
					var code = response.trim();
					if(code == 'success') {
						$('#messageAddMember').html("");
						getNotInvited(parameters);
					}
					else{
						$('#messageAddMember').html(response);
					}},
			error: function () {
					$('#messageAddMember').html('An error occurred, please try again.');
			}
			});
	

}

/*
* De la lista de los correos anteriores devuelve cuales no están registrados
* en la base de datos.
*/
function getNotInvited(parameters){
	$.ajax({
			data:  parameters,
			url:   URL_SERVER + 'php/not_invited.php',
			dataType: 'text',
			type:  'post',
			success:  function (response)
				   {
						var noRegistrados = JSON.parse(response.trim());

						if (noRegistrados.length == 0){
							window.location.href = '#list_members';
						}else {
							mostrarNoRegistrados(noRegistrados);
						}
						
					},
			error: function () {
					$('#messageAddMember').html('An error occurred, please try again.');
			}
			});
}

//Dado una lista de correos los muestra en la division correspondiente.
function mostrarNoRegistrados (noRegistrados) {

	for (var i = noRegistrados.length - 1; i >= 0; i--) {

		$("#checkNoRegistrados").append('<input type="checkbox" checked id="b'+i+'"/><label id="b'+i+'"for="b'+i+'">'+noRegistrados[i]+'</label>');
		$("#checkNoRegistrados").trigger("create");
		$('#messageAddMember').html('');
	}

	$("#divAddMember").hide();
	$("#divInviteMembers").show();

};

//Coje del formulario los correos seleccionados y envia
// por correo una invitacion.
function inviteUsers () {
		var n = $('form#inviteform').find('input:checked');
		var email;
		var users = new Array();
		for(var i=0; i< n.length; i++)
		{	
			email = $("#"+n[i].id).next("label").text();
			
			var parameters = { "email" : $.trim(email)};
			$.ajax({
				data:  parameters,
				url:   URL_SERVER +'php/invite_user.php',
				dataType: 'text',
				type:  'post',
				success:  function (response)
					   {
							$('#messageAddMember').html('Se han enviado las peticiones a los correos indicados.');
							setTimeout(function() { 
							    window.location.href = "#list_members"; 
							 }, 2000);
							
						},
				error: function () {
						$('#messageAddMember').html('An error occurred, please try again.');
				}
				});
			}
}


// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).ready(function() {
	isConnected() ;
});


$(document).on("pageshow", "#add_member", function() {
	$("#divAddMember").show();
	$("#divInviteMembers").hide();
	$("#checkNoRegistrados").html('');
	$("#check2").html('');
	initapp();
});