// función que hace una llamada AJAX al servidor por las listas de un grupo
function listSLists() {
	$.ajax({
		url: 'php/list_slists.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
					try {
						var groupAndSLists = JSON.parse(response.trim());
						$("#list_slists_header > h1").append(': ' + groupAndSLists.groupName);
						list_slists(groupAndSLists.slists);
					}
					catch(e) {
						$("#message").html(response);
					}
			   },
		error: 	function() {
					$("#message").html("Ha ocurrido un error recuperando las listas de compra");
				}
	});
}

// función que crea los elementos 'ul' y 'li' correspondientes a las listas
function list_slists(slists) {
	$("#open_list").html("");
	$("#close_list").html("");
	$.each(slists, function(i, slist) {
		var divider = '<li data-theme = "d" idList="' + slist.idList + '">';
		var nombre_fecha = '<a href="#" class="btnVerLista"><h2>'+ slist.listName + '</h2><p>Creada ' + slist.listCreated+'</p></a>';
		var opciones = '<a href ="#" class="btnOpcionesLista" idList="'+slist.idList+'">Opciones de la lista</a>';
		divider = divider + nombre_fecha + opciones + '</li>';
		if(slist.listState == 0){
			//Lista abierta
			$("#open_list").append(divider);
		}
		else if(slist.listState == 1) {
			//Lista cerrada
			$("#close_list").append(divider);
		}
	});
	if($("#open_list").html() == ""){
		$("#open_list").html("<li> No hay listas abiertas </li>");
	}
	if($("#close_list").html() == ""){
		$("#close_list").html("<li> No hay listas cerradas </li>");
	}
	$("#open_list").listview( "refresh" );
	$("#close_list").listview( "refresh" );
	$("#slists").trigger('create');
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnVerLista' con
 * esta función que redirecciona al usuario a la pagina donde podra ver y editar
 * la lista seleccionada, pasando el identificador de la lista por GET.
 */
$(document).on('click', '.btnVerLista', function() {
	var form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', 'list_items.html');
	inputIdList = document.createElement('input');
	inputIdList.setAttribute('name', 'idList');
	inputIdList.setAttribute('type', 'hidden');
	inputIdList.setAttribute('value', $(this).closest("li").attr('idList'));
	form.appendChild(inputIdList);
	document.body.appendChild(form);
	form.submit();
});

/*
 * Asociamos el evento 'click' a los elementos de la clase '.confirmOpt' con
 * esta función que averigua la operación seleccionada y solicita confirmación.
 */
$(document).on('click', '.confirmOpt', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	//guardamos la operación en el atributo 'opt' del botón de confirmación
	$("#btnConfirm").attr("opt", operation);
	var confirmMessage = "";

	switch(operation) {
		case "1":
			//cerrar lista
			confirmMessage = "Esta operación va a marcar la lista como cerrada";
			break;
		case "2":
			//borrar lista
			confirmMessage = "Esta acción es irreversible";
			break;
	};
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirm").html(confirmMessage);
	//cerramos el popup de las opciones
	$('#popupListSLists').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popup_confirm').popup( 'open', { transition: "pop" } ) }, 100 );

});

/*
 * Asociamos el evento 'click' al botón de confirmación de la operación solicitada en
 * el menú de las opciones sobre una lista con esta función que averigua la operación 
 * seleccionada y procede a realizarla.
 */
$(document).on('click', '.btnConfirm', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	var idList = $('#popup_confirm').attr("idList");

	switch(operation) {
		case "1":
			//cerrar lista
			$.ajax({
				url: 'php/close_list.php',
				dataType: 'text',
				data: {"idList" : idList},
				type:  'post',
				success:  function (response)
					   {
							//reiniciamos la página
							location.reload();
					   },
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando cerrar la lista");
						}
			});
			break;
		case "2":
			//borrar lista
			$.ajax({
				url: 'php/delete_list.php',
				dataType: 'text',
				data: {"idList" : idList},
				type:  'post',
				success:  function (response)
					   {
							var status = response.trim();
							if(status == 'success') {
								//reiniciamos la página
								location.reload();
							} else {
								$('#message').html(status);
							}
					   },
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando borrar la lista");
						}
			});
			break;
	};
	//cerramos el popup de la confirmación
	$('#popup_confirm').popup('close');
});

// Asigna el evento taphold a las listas.
$(document).on('taphold', '.btnVerLista', tapholdHandler);
// Asigna el evento click al botón de las opciones de la lista.
$(document).on('click', '.btnOpcionesLista', tapholdHandler);


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandler(){
	//alert($(this).closest("li").attr('idList'));
	//asociamos el nombre de la lista al popup
	$("#popupNombreLista").html("Lista : " + $(this).closest("li").find("h2").html());
	//asignamos el id de la lista seleccionada para que lo sepan los popups
	var idList = $(this).closest("li").attr('idList');
	$('#popupBtnVer').attr("idList", idList);
	$('#popup_confirm').attr("idList", idList);
	//mostramos el popup con las opciones de la lista
	$('#popupListSLists').popup("open");
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", function() {
	listSLists();
	$("#ulPopupListSLists").listview("refresh");
	$('#popupListSLists').popup();
	$('#popup_confirm').popup();
});