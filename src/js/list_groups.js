/*
 * Envía una petición ajax y lista los nombres de 
 * los grupos a los que pertenece el usuario en sesión.
 */
function listGroups()
{
	$.ajax({
		url: document.URL+'/../php/list_groups.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
			   obj = JSON.parse(response.trim());
			   list(obj);}
		});
}

function selectGroup(id)
{
	var parameter = {"idGroup" : id};
	$.ajax({
	url: 'php/select_group.php',
	data: parameter,
	type:  'post',
	success:  function (response)
	{
		window.location.href = 'list_slists.html';
	},
	error: 	function() 
	{
		$("#message").html("Ha ocurrido un error recuperando las listas de la compra");
	}
	});
}

/**
 * Cuando mete en sesion el grupo sobre el cual
 * se ha hecho long press.
 * @param id
 */
function selectGroupLongPress(id)
{
	var parameter = {"idGroup" : id};
	$.ajax({
	url: 'php/select_group.php',
	data: parameter,
	type:  'post',
	success:  function (response)
	{
		
	},
	error: 	function() 
	{
		$("#message").html("Ha ocurrido un error recuperando las listas de la compra");
	}
	});
}
/*
 * Lista los nombres de los grupos a los que 
 * pertenece el usuario en sesión.
 */
function list(groups)
{
	var name;
	var id;
	for(var i=0; i< groups.name.length; i++)
	{
		$("#mylist").append('<li id="'+groups.id[i]+'" class = "btnVerLista" onclick="selectGroup(id)"><a href="#">'+groups.name[i]+'</a></li>');
		$("#mylist").listview('refresh');
	}
}

// Asigna el evento taphold a los elementos de la lista.
$(document).on('taphold', '.btnVerLista', longPress);

/*
 * Muestra o crea el menu popup.
 */
function longPress (event){
	var idGroup = event.currentTarget.id;
	selectGroupLongPress(idGroup);
	//asignamos el atributo idGroup al popup de confirmación para que el popup lo sepa
	$('#popupConfirmListGroups').attr("idGroup", idGroup);
	if ( $('#ulPopUP').length > 0){
		$('#ulPopUP').remove();
	}
	tapholdHandler(event);
	
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.confirmOptListGroups' con
 * esta función solicita confirmación de la operación.
 */
$(document).on('click', '.confirmOptListGroups', function() {
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirm").html("Esta acción es irreversible");
	//cerramos el popup de las opciones
	$('#popupBasic').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirmListGroups').popup( 'open', { transition: "pop" } ) }, 100 );
});

/*
 * Asociamos el evento 'click' al botón de confirmación del abandono del grupo
 */
$(document).on('click', '.btnConfirmListGroups', function() {
	//obtenemos el ID del grupo que se quiere abandonar
	var idGroup = $('#popupConfirmListGroups').attr("idGroup");

	//abandonar grupo
	$.ajax({
		url: 'php/delete_group.php',
		dataType: 'text',
		data: {"idGroup" : idGroup},
		type:  'post',
		success:  function (response)
				{
					var status = response.trim();
					if(status == 'success') {
						//refrescamos la página
						location.reload();
					} else {
						$('#message').html(status);
					}
				},
		error: 	function() {
					$("#message").html("Ha ocurrido un error intentando abandonar el grupo");
				}
	});
	//cerramos el popup de la confirmación
	$('#popupConfirmListGroups').popup('close');
});


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandler( event ){
	event.preventDefault();
	//alert(event.currentTarget.attributes.idGroup.value);			
	var ul = document.createElement('ul');
		ul.setAttribute("id", "ulPopUP");
		ul.setAttribute("data-role", "listview");
		ul.setAttribute("data-inset", "true");
		ul.setAttribute("data-divider-theme", "b");

	var cabecera = document.createElement('li');
		cabecera.setAttribute("data-role","list-divider");
		cabecera.setAttribute("role","heading");
		$(cabecera).html("Grupo: " + event.currentTarget.firstChild.firstChild.textContent);
		ul.appendChild(cabecera);
		

	var Miembros = document.createElement('li');
		Miembros.setAttribute("data-inset","true");
		Miembros.setAttribute("role","heading");
		$(Miembros).html('<a href="list_members.html">Miembros del grupo</a>');
		ul.appendChild(Miembros);

	var Abandonar = document.createElement('li');
		Abandonar.setAttribute("data-inset","true");
		Abandonar.setAttribute("role","heading");
		$(Abandonar).html('<a href="#" class="confirmOptListGroups">Abandonar Grupo</a>');
		ul.appendChild(Abandonar);

	$('#popupBasic').append(ul);
	$("#popupBasic").trigger("create");
	$('#popupBasic').popup("open");
}