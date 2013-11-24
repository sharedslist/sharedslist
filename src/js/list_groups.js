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
	selectGroupLongPress(event.currentTarget.id);
	if ( $('#ulPopUP').length > 0){
		$('#ulPopUP').remove();
	}
	tapholdHandler(event);
	
}

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
		$(Abandonar).html('<a href="#" onclick="exit()">Abandonar Grupo</a>');
		ul.appendChild(Abandonar);

	$('#popupBasic').append(ul);
	$("#popupBasic").trigger("create");
	$('#popupBasic').popup("open");
}

function exit () {
	$.ajax({
		url: 'php/delete_group.php',
		type:  'post',
		success:  function (response)
		{
			var code = response.trim();
			window.location.href = 'list_groups.html';
			if(code != "success"){
				$("#message").html("Ha ocurrido al abandonar el grupo");
			}
		},
		error: 	function() 
		{
			$("#message").html("Ha ocurrido al abandonar el grupo");
		}
	});
}