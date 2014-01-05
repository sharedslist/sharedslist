$(document).ready(function() {
	isConnected() ;
});

// función que hace una llamada AJAX al servidor por las listas de un grupo
function listItems(){
	var parameters = { "idList" : getUrlVars()["idList"] };
	var closed = getUrlVars()["listClosed"];
	$.ajax({
		url: 'php/list_items.php',
		dataType: 'text',
		data: parameters,
		type:  'post',
		success:  function (response){
					var listAndItems = JSON.parse(response.trim());
					$("#list_name").html("");
					$("#list_name").append(listAndItems.listName);
					$("#list_name").trigger('create');
					$("#btnOptions").attr('idList', parameters.idList);
					$("#popupConfirm").attr('idList', parameters.idList);
					$("#btnOptions").attr('listName', listAndItems.listName);
					$("#btnOptions").attr('listState', listAndItems.listState);
					list_items(listAndItems);
					if(closed) {
						informListClosed();
					}
			   },
		error: 	function() {
					$("#messageListItems").html("Ha ocurrido un error recuperando las listas con sus artículos");
				}
	});
}

//parsea la URL para obtener los parámetros GET;
function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/**
 * Crea una lista cuyos elementos están en el atributo items del parametro listAndItems.
 * Cada item tiene un checkbox cuyo estado depende de si el item está o no comprado.
 * Si el valor del atributo listState de listAndItems es 1, es decir, la lista está
 * completada, los checkboxes se desabilitan.
 *
 * @param listAndItems Estructura con el identificador listName guarda el nombre de la lista,
 *					   con listState guarda el estado de la lista; y con items, un array de
 *					   los items que hay asociados a la lista.
 */
function list_items(listAndItems){
	$("#itemlist").html("");
	var aux = '<ul id="list" data-role="listview" data-filter="true" idList="'+getUrlVars()["idList"]+'" listState="'+listAndItems.listState+'"';
	if(listAndItems.listState==true){
		aux = aux + ' listState="closed"';
	}
	if(listAndItems.listState==false){
		aux = aux + ' listState="open"';
	}
	aux = aux + '>';
	$.each(listAndItems.items, function(i, item) {
		aux = aux + '<li data-icon="edit" idItem="'+item.idItem+'"><div class="ui-block-a div_check"><label class="label_check" data-corners="false"><fieldset class="fieldset_check" data-role="controlgroup"><input class="item_check" type="checkbox"';
		if(item.itemState==true){
			aux = aux + ' checked';
		}
		else{
			aux = aux + '';
		}
		if(listAndItems.listState==true){
			aux = aux + ' disabled="true"';
		}
		aux = aux + ' value="'+item.itemState+'"/></fieldset></label></div><a href="#" class="btnEditItem">'+item.itemName+'</a><span id="span'+item.idItem+'" class="ui-li-count">'+item.quantityBought+'/'+item.quantity+'</span></li>';
	});
	aux = aux + '</ul>';
	$("#itemlist").html(aux);
	$("#itemlist").trigger('create');
}


/*
 * Función que cambia el estado del item de comprado a no comprado y
 * de no comprado a comprado, campiando con ello la cantidad comprada.
 */
$(document).on('change', '.item_check', function() {
		var input = $(this);
		var idItem = input.closest("li").attr('idItem');
		var parameters = { "idList" : getUrlVars()["idList"] , "idItem" : idItem };
        if(input.attr('value')=="false"){
			$.ajax({
				url: 'php/check_item.php',
				dataType: 'text',
				data: parameters,
				type:  'post',
				success: function (response) {
							listItems();
							if( response.trim()=='closed' ) {
								confirmCloseList();
							}
						},
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando marcar el item como comprado");
						}
			});
		}
		else{
			$.ajax({
				url: 'php/uncheck_item.php',
				dataType: 'text',
				data: parameters,
				type:  'post',
				success:  function () {
							listItems();
						},
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando marcar el item como no comprado");
						}
			});
        }
});

/*
 * Pide confirmación antes de completar la lista automáticamente
 */
function confirmCloseList() {
	//guardamos la operación close en el atributo 'opt' del botón de confirmación
	$("#btnConfirm").attr("opt", "close");
	var warning = "Esta operación va a completar la lista automáticamente";
	warning += " y redirigirte al listado de tus listas de compra";
	$("#txtConfirm").html(warning);
	//cerramos el popup de las opciones
	$('#popupListSLists').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirm').popup( 'open', { transition: "pop" } ) }, 100 );
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnEditItem' con
 * esta función que redirecciona al usuario a la pagina donde podra editar
 * el item seleccionado, pasando el identificador del item por GET.
 */
$(document).on('click', '.btnEditItem', function() {
	if($(this).closest("ul").attr("listState")==0){
		var form = document.createElement('form');
		form.setAttribute('method', 'GET');
		form.setAttribute('action', '#edit_items');
		inputIdList = document.createElement('input');
		inputIdList.setAttribute('name', 'idList');
		inputIdList.setAttribute('type', 'hidden');
		inputIdList.setAttribute('value', $(this).closest("ul").attr('idList'));
		form.appendChild(inputIdList);
		inputIdList = document.createElement('input');
		inputIdList.setAttribute('name', 'idItem');
		inputIdList.setAttribute('type', 'hidden');
		inputIdList.setAttribute('value', $(this).closest("li").attr('idItem'));
		form.appendChild(inputIdList);
		document.body.appendChild(form);
		form.submit();
	}
});


/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnCreateItem' con
 * esta función que redirecciona al usuario a la pagina donde podra crear
 * un item , pasando el identificador de la lista por GET.
 */
$(document).on('click', '.btnCreateItem', function() {
	var idList = $(this).attr('idList');
	$('#popupListSLists').popup("close");
	var form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', '#create_items');
	inputIdList = document.createElement('input');
	inputIdList.setAttribute('name', 'idList');
	inputIdList.setAttribute('type', 'hidden');
	inputIdList.setAttribute('value', $(this).attr('idList'));
	form.appendChild(inputIdList);
	document.body.appendChild(form);
	form.submit();
});


// Asigna el evento click al botón de las opciones de la lista.
$(document).on('click', '#btnOptions', tapholdHandler);


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandler(){
	//asociamos el nombre de la lista al popup
	$("#popupListName").html($(this).attr('listName'));
	//asignamos el id de la lista seleccionada para que lo sepan los popups
	var idList = $(this).attr('idList');
	//mostramos u ocultamos la opción de completar lista dependiendo del estado de la misma
	if( $(this).attr('listState')==0) {
		//mostramos la opción crear producto y completar lista para las listas pendientes
		$('.btnCreateItem').closest("li").show();
		$('.confirmOpt[opt="close"]').closest("li").show();
	} else {
		//ocultamos la opción crear producto y completar lista para las listas completadas
		$('.btnCreateItem').closest("li").hide();
		$('.confirmOpt[opt="close"]').closest("li").hide();
	}
	$('.btnCreateItem').attr("idList", idList);
	$('#popupConfirm').attr("idList", idList);
	//mostramos el popup con las opciones de la lista
	$('#popupListSLists').popup("open");
}


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
			//completar lista
			confirmMessage = "Esta operación va a marcar la lista como completada";
			break;
		case "delete":
			//borrar lista
			confirmMessage = "Esta acción va a eliminar la lista, la acción es irreversible";
			break;
	};
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirm").html(confirmMessage);
	//cerramos el popup de las opciones
	$('#popupListSLists').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirm').popup( 'open', { transition: "pop" } ) }, 100 );

});


/*
 * Asociamos el evento 'click' al botón de confirmación de la operación solicitada en
 * el menú de las opciones sobre una lista con esta función que averigua la operación 
 * seleccionada y procede a realizarla.
 */
$(document).on('click', '.btnConfirm', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	var idList = $('#popupConfirm').attr("idList");

	switch(operation) {
		case "close":
			//completar lista
			$.ajax({
				url: 'php/close_list.php',
				dataType: 'text',
				data: {"idList" : idList},
				type:  'post',
				success:  function (response)
					   {
							//redirige a listar las listas del grupo
							window.location.href="#list_slists";
					   },
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando completar la lista");
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
								//redirige a listar las listas del grupo
								window.location.href="#list_slists";
							} else {
								$('#messageListItems').html(status);
							}
					   },
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando borrar la lista");
						}
			});
			break;
	};
	//cerramos el popup de la confirmación
	$('#popupConfirm').popup('close');
});


// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", "#list_items", function() {
	listItems();
    $("#ulPopupListSLists").listview("refresh");
	$('#popupListSLists').popup();
	$('#popupConfirm').popup();
});