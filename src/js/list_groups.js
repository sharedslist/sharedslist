/*
 * Envía una petición ajax y lista los nombres de 
 * los grupos a los que pertenece el usuario en sesión.
 */
function listGroups()
{
	$.ajax({
		url: URL_SERVER + 'php/list_groups.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
			   obj = JSON.parse(response.trim());
			   list(obj);}
		});
}

$('#list_groups').bind('pageinit', function() {
  listGroups();
});

function selectGroup()
{
	var parameter = {"idGroup" : $(this).closest("li").attr('id')};
	$.ajax({
	url: URL_SERVER +'php/select_group.php',
	data: parameter,
	type:  'post',
	success:  function (response)
	{
		window.location.href = '#list_slists';
	},
	error: 	function() 
	{
		$("#messageListGroups").html("Ha ocurrido un error recuperando las listas de la compra");
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
	url: URL_SERVER +'php/select_group.php',
	data: parameter,
	type:  'post',
	success:  function (response)
	{
		
	},
	error: 	function() 
	{
		$("#messageListGroups").html("Ha ocurrido un error recuperando las listas de la compra");
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
	$("#mylist").children().remove('li');
	for(var i=0; i< groups.name.length; i++)
	{
		var li = '<li id="'+groups.id[i]+'"><a href="#" class="groupName">'+groups.name[i]+'</a>';
		li += '<a href="#" class="btnListGroupsOpts" data-i18n="listGroups.btnOptions"></a></li>';
		$("#mylist").append(li);
	}
	$("#mylist").i18n();
	$("#mylist").listview('refresh');
}

// Asigna el evento taphold a los elementos de la lista.
$(document).on('taphold', '.groupName', longPress);
// Asigna el evento click a los botones de opciones del grupo
$(document).on('click', '.btnListGroupsOpts', longPress);
// Asigna el evento click a los nombres de las listas
$(document).on('click', '.groupName', selectGroup);

/*
 * Muestra o crea el menu popup.
 */
function longPress (event){
	var idGroup = $(this).closest("li").attr('id');
	var groupName = $(this).closest("li").find(".groupName").html();
	selectGroupLongPress(idGroup);
	//asignamos el atributo idGroup al popup de confirmación para que el popup lo sepa
	$('#popupConfirmListGroups').attr("idGroup", idGroup);
	if ( $('#ulPopUP').length > 0){
		$('#ulPopUP').remove();
	}
	tapholdHandlerGroups(groupName);
	
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.confirmOptListGroups' con
 * esta función solicita confirmación de la operación.
 */
$(document).on('click', '.confirmOptListGroups', function() {
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirmGroups").html( i18n.t('listGroups.popup.warning') );
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
		url: URL_SERVER +'php/delete_group.php',
		dataType: 'text',
		data: {"idGroup" : idGroup},
		type:  'post',
		success:  function (response)
				{
					var status = response.trim();
					if(status == 'success') {
						//refrescamos la página
						listGroups();
					} else {
						$('#messageListGroups').html(status);
					}
				},
		error: 	function() {
					$("#messageListGroups").html("Ha ocurrido un error intentando abandonar el grupo");
				}
	});
	//cerramos el popup de la confirmación
	$('#popupConfirmListGroups').popup('close');
});


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandlerGroups( groupName ){
	//event.preventDefault();
	//alert(event.currentTarget.attributes.idGroup.value);			
	var ul = document.createElement('ul');
		ul.setAttribute("id", "ulPopUP");
		ul.setAttribute("data-role", "listview");
		ul.setAttribute("data-inset", "true");
		ul.setAttribute("data-divider-theme", "b");

	var cabecera = document.createElement('li');
		cabecera.setAttribute("data-role","list-divider");
		cabecera.setAttribute("role","heading");
		$(cabecera).html(i18n.t('listGroups.popup.group') + groupName);
		ul.appendChild(cabecera);
		

	var Miembros = document.createElement('li');
		Miembros.setAttribute("data-inset","true");
		Miembros.setAttribute("role","heading");
		$(Miembros).html('<a href="#list_members">' + i18n.t('listGroups.popup.members') + '</a>');
		ul.appendChild(Miembros);

	var Abandonar = document.createElement('li');
		Abandonar.setAttribute("data-inset","true");
		Abandonar.setAttribute("role","heading");
		$(Abandonar).html('<a href="#" class="confirmOptListGroups">' + i18n.t('listGroups.popup.leave') + '</a>');
		ul.appendChild(Abandonar);

	$('#popupBasic').append(ul);
	$("#popupBasic").trigger("create");
	$('#popupBasic').popup("open");
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#list_groups", function() {
	listGroups();
	$('#popupConfirmListGroups').popup();
	$('#popupBasic').popup();
});
