var admin = false;

function listMembers() {
	$.ajax({
		url: 'php/list_members.php',
		dataType: 'text',
		type:  'post',
		success:  function (response) {
					try{
						var obj1 = JSON.parse(response.trim());
						admin=obj1.admin;
						listarMiembros(obj1);
						$("#messageListMembers").html("");
					}catch (err){
						$("#messageListMembers").html("");
						$("#messageListMembers").html("Ha ocurrido un error. Pruebe de nuevo.");
					}
				}
		});
}

/*
 * Lista los nombres de los miembros del grupo
 */
function listarMiembros(response)
{
	$("#miembros").html("");
	for(var i=0; i< response.miembros.length; i++)
	{
		var divider = '<li data-theme = "d" idMember="' + response.ids[i] + '"> ';
		var member = '<a href="#">'+ response.miembros[i] + '</a>';
		if (admin){
			var options = '<a href ="#" class="btnBorrar" idMember="'+response.ids[i]+'">BorrarMiembro</a>';
			divider = divider + member + options + '</li>';
		}else {
			divider = divider + member + '</li>';
		}
		
		$("#miembros").append(divider);
		//$("#miembros").append('<li id="'+ response.ids[i]+'"><a href ="#">'+response.miembros[i]+'</a></li>');
	}
	$("#miembros").listview('refresh');
	$("#miembros").trigger("create");
}


$(document).on('click', '.btnBorrar', function(boton) {
	var idMember = boton.currentTarget.attributes.idmember.value;
	$('#popupConfirmDeleteMember').attr("idMember", idMember);
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirm").html("¿Seguro que quiere expulsar al miembro del grupo?");
	//cerramos el popup de las opciones
	$('#popupBasic').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirmDeleteMember').popup( 'open', { transition: "pop" } ) }, 100 );
});

/*
 * Asociamos el evento 'click' al botón de confirmación del abandono del grupo
 */
$(document).on('click', '.btnConfirmDelete', function() {
	//obtenemos el ID del grupo que se quiere abandonar
	var idMember = $('#popupConfirmDeleteMember').attr("idMember");

	//abandonar grupo
	$.ajax({
		url: 'php/delete_member.php',
		dataType: 'text',
		data: {"idMember" : idMember},
		type:  'post',
		success:  function (response)
				{
					var status = response.trim();
					if(status == 'success') {
						// actualizamos la lista
						listMembers();
					} else {
						$('#messageListMembers').html(status);
					}
				},
		error: 	function() {
					$("#messageListMembers").html("Ha ocurrido un error intentando expulsar al usuario");
				}
	});
	//cerramos el popup de la confirmación
	$('#popupConfirmDeleteMember').popup('close');
});

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#list_members", function() {
	listMembers();
});
