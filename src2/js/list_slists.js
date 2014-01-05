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
						$("#messageListSList").html(response);
					}
			   },
		error: 	function() {
					$("#messageListSList").html("Ha ocurrido un error recuperando las listas de compra");
				}
	});
}

// función que crea los elementos 'ul' y 'li' correspondientes a las listas
function list_slists(slists) {
	$("#open_list").html("");
	$("#close_list").html("");
	$.each(slists, function(i, slist) {
		var divider = '<li data-theme = "d" idList="' + slist.idList + '">';
		var name_date = '<a class="btnViewList"><h2>'+ slist.listName + '</h2><p>Creada ' + slist.listCreated+'</p></a>';
		var options = '<a class="btnSListOptions" idList="'+slist.idList+'">Opciones de la lista</a>';
		divider = divider + name_date + options + '</li>';
		if(slist.listState == 0){
			//Lista pendiente
			$("#open_list").append(divider);
		}
		else if(slist.listState == 1) {
			//Lista completada
			$("#close_list").append(divider);
		}
	});
	if($("#open_list").html() == ""){
		$("#open_list").html("<li> No hay listas pendientes </li>");
	}
	if($("#close_list").html() == ""){
		$("#close_list").html("<li> No hay listas completadas </li>");
	}
	$("#open_list").listview( "refresh" );
	$("#close_list").listview( "refresh" );
	$("#slists").trigger('create');
}


/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnViewList' con
 * esta función que redirecciona al usuario a la pagina donde podra ver y editar
 * la lista seleccionada, pasando el identificador de la lista por GET.
 */
$(document).on('click', '.btnViewList', function() {
	var form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', '#list_items');
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
		case "close":
			//cerrar lista
			confirmMessage = "Esta operación va a marcar la lista como completada";
			break;
		case "delete":
			//borrar lista
			confirmMessage = "Esta acción va a eliminar la lista, la acción es irreversible";
			break;
	};
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirmLists").html(confirmMessage);
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
$(document).on('click', '.btnConfirmList', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	var idList = $('#popup_confirm').attr("idList");

	switch(operation) {
		case "close":
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
							$("#messageListSList").html("Ha ocurrido un error intentando cerrar la lista");
						}
			});
			break;
		case "delete":
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
								$('#messageListSList').html(status);
							}
					   },
				error: 	function() {
							$("#messageListSList").html("Ha ocurrido un error intentando borrar la lista");
						}
			});
			break;
	};
	//cerramos el popup de la confirmación
	$('#popup_confirm').popup('close');
});

// Asigna el evento taphold a las listas.
$(document).on('taphold', '#slists .btnViewList', tapholdHandler);
// Asigna el evento click al botón de las opciones de la lista.
$(document).on('click', '.btnSListOptions', tapholdHandler);


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandler(){
	//asociamos el nombre de la lista al popup
	$("#popupListName").html("Lista : " + $(this).closest("li").find("h2").html());
	//asignamos el id de la lista seleccionada para que lo sepan los popups
	var idList = $(this).closest("li").attr('idList');
	//mostramos u ocultamos la opción de cerrar lista dependiendo del estado de la misma
	if( $(this).closest("ul").attr("id") == "open_list" ) {
		//mostramos la opción cerrar lista para las listas pendientes
		$('.confirmOpt[opt="close"]').closest("li").show();
	} else {
		//ocultamos la opción cerrar lista para las listas completadas
		$('.confirmOpt[opt="close"]').closest("li").hide();
	}
	$('#popupBtnView').attr("idList", idList);
	$('#popup_confirm').attr("idList", idList);
	//mostramos el popup con las opciones de la lista
	$('#popupListSLists').popup("open");
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#list_slists", function() {
	listSLists();
	$("#ulPopupListSLists").listview("refresh");
	$('#popupListSLists').popup();
	$('#popup_confirm').popup();
});