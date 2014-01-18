<<<<<<< HEAD
﻿$(document).ready(function() {
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
=======
﻿// función que hace una llamada AJAX al servidor por las listas de un grupo
function listItems(){
	$.ajax({
		url: URL_SERVER +'php/list_items.php',
		dataType: 'text',
>>>>>>> origin/develop
		type:  'post',
		success:  function (response){
					var listAndItems = JSON.parse(response.trim());
					$("#list_name").html("");
					$("#list_name").append(listAndItems.listName);
<<<<<<< HEAD
					$("#list_name").trigger('create');
					$("#btnOptions").attr('idList', parameters.idList);
					$("#btnOptions").attr('listName', listAndItems.listName);
					$("#btnOptions").attr('listState', listAndItems.listState);
					list_items(listAndItems);
					if(closed) {
						informListClosed();
					}
			   },
		error: 	function() {
					$("#message").html("Ha ocurrido un error recuperando las listas con sus artículos");
=======
					$("#listItems_list_name").html("");
					$("#listItems_list_name").append(listAndItems.listName);
					$("#list_name").trigger('create');
					$("#btnOptions").attr('listName', listAndItems.listName);
					$("#btnOptions").attr('listState', listAndItems.listState);
					list_items(listAndItems);
			   },
		error: 	function() {
					$("#messageListItems").html("Ha ocurrido un error recuperando las listas con sus artículos");
>>>>>>> origin/develop
				}
	});
}

<<<<<<< HEAD
//función que muestra un mensaje indicando que se acaba de cerrar la lista de compra
function informListClosed() {
	$("#message").html("La lista de compra acaba de ser cerrada, buen trabajo!");
}

//parsea la URL para obtener los parámetros GET;
function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

=======
>>>>>>> origin/develop
/**
 * Crea una lista cuyos elementos están en el atributo items del parametro listAndItems.
 * Cada item tiene un checkbox cuyo estado depende de si el item está o no comprado.
 * Si el valor del atributo listState de listAndItems es 1, es decir, la lista está
<<<<<<< HEAD
 * cerrada, los checkboxes se desabilitan.
=======
 * completada, los checkboxes se desabilitan.
>>>>>>> origin/develop
 *
 * @param listAndItems Estructura con el identificador listName guarda el nombre de la lista,
 *					   con listState guarda el estado de la lista; y con items, un array de
 *					   los items que hay asociados a la lista.
 */
function list_items(listAndItems){
	$("#itemlist").html("");
<<<<<<< HEAD
	var aux = '<ul id="list" data-role="listview" data-filter="true" idList="'+getUrlVars()["idList"]+'" listState="'+listAndItems.listState+'"';
=======
	var aux = '<ul id="list" data-role="listview" data-filter="true" listState="'+listAndItems.listState+'"';
>>>>>>> origin/develop
	if(listAndItems.listState==true){
		aux = aux + ' listState="closed"';
	}
	if(listAndItems.listState==false){
		aux = aux + ' listState="open"';
	}
	aux = aux + '>';
	$.each(listAndItems.items, function(i, item) {
<<<<<<< HEAD
		aux = aux + '<li data-icon="edit" idItem="'+item.idItem+'"><div class="ui-block-a div_check"><label class="label_check" data-corners="false"><fieldset class="fieldset_check" data-role="controlgroup"><input class="item_check" type="checkbox"';
=======
		aux = aux + '<li data-icon="edit" idItem="'+item.idItem+'"  quantity="'+item.quantity+'" quantityBought="'+item.quantityBought+'"><div class="ui-block-a div_check"><label class="label_check" data-corners="false"><fieldset class="fieldset_check" data-role="controlgroup"><input class="item_check" type="checkbox"';
>>>>>>> origin/develop
		if(item.itemState==true){
			aux = aux + ' checked';
		}
		else{
			aux = aux + '';
		}
		if(listAndItems.listState==true){
			aux = aux + ' disabled="true"';
		}
<<<<<<< HEAD
		aux = aux + ' value="'+item.itemState+'"/></fieldset></label></div><a href="#" class="btnEditItem">'+item.itemName+'</a><span id="span'+item.idItem+'" class="ui-li-count">'+item.quantityBought+'/'+item.quantity+'</span></li>';
=======
		aux = aux + ' value="'+item.itemState+'"/></fieldset></label></div><a href="#" class="btnEditItem">'+item.itemName+'</a><span id="span'+item.idItem+'" class="ui-li-count">'+item.quantityBought+'/'+item.quantity+' '+item.metric+'</span></li>';
>>>>>>> origin/develop
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
<<<<<<< HEAD
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
								informListClosed();
							}
						},
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando marcar el item como comprado");
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
							$("#message").html("Ha ocurrido un error intentando marcar el item como no comprado");
						}
			});
        }
=======
	var input = $(this);
	var idItem = input.closest("li").attr('idItem');
	var quantity = input.closest("li").attr('quantity');
	var quantityBought = input.closest("li").attr('quantityBought');
	//Desplegar selector de cantidad comprada
	mobiscroll(idItem, quantity, quantityBought);
});


function mobiscroll( idItem, quantity, quantityBought) {
	$("#mobiscrollQuantityB").html('<select name="' + i18n.t('listItems.quantityBought') + '" id="mobiscrollQuantityBought" value="'+quantityBought+'" idItem="'+idItem+'" quantity="'+quantity+'" data-role="none">');
	$("#mobiscrollQuantityB").trigger('create');
	// cargamos las opciones de cantidad para el nuevo producto
	for (var i = 0; i <= quantity; i++) {
		if(i!=quantityBought){
			$('<option/>', {
				value : i,
				text : i
			}).appendTo('#mobiscrollQuantityBought');
		}
		else{
			$('<option/>', {
				value : i,
				text : i,
				selected : 'selected'
			}).appendTo('#mobiscrollQuantityBought');
		}
	};
	
	// cargamos la extensión mobiscroll para la cantidad
	$('#mobiscrollQuantityBought').mobiscroll().select({
		theme : 'jqm',
		lang : i18n.lng(), //obtenemos el lenguaje actual del plugin i18next,
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'mobiscrollQuantityBoughtText',
		onShow:function(html,inst) {
				$('#popupBuyItem').popup("close");
		},
		onSelect:function(html,inst) {
				$('#popupBuyItem').popup("open");
		}
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#mobiscrollQuantityB").trigger('create');
	//mostramos el popup con las opciones de la lista
	$('#popupBuyItem').popup("open");
}


/*
 * Asociamos el evento 'click' al botón de confirmación de la cantidad indicada
 * y procede a realizar la acción de marcar dicha cantidad como comprada.
 */
$(document).on('click', '.listItems_buy_btnConfirm', function() {
	var parameters = { "idItem" : $('#mobiscrollQuantityBought').attr('idItem'), "quantity" : $('#mobiscrollQuantityBought').attr('quantity'), "quantityBought" : $('#mobiscrollQuantityBought').val() };
	$.ajax({
		url: URL_SERVER +'php/buy_item.php',
		dataType: 'text',
		data: parameters,
		type:  'post',
			success: function (response) {
				$("#mobiscrollQuantityB").html("");
				$("#mobiscrollQuantityB").trigger('create');
				listItems();
				if( response.trim()=='closed' ) {
					confirmCloseList();
				}
		},
		error: 	function() {
				$("#messageListItems").html("Ha ocurrido un error al marcar la compra");
		}
	})
	//cerramos el popup
	$('#popupBuyItem').popup('close');
>>>>>>> origin/develop
});


/*
<<<<<<< HEAD
=======
 * Pide confirmación antes de completar la lista automáticamente
 */
function confirmCloseList() {
	//guardamos la operación close en el atributo 'opt' del botón de confirmación
	$("#listItems_btnConfirm").attr("opt", "close");
	var warning = i18n.t('listItems.popup.autoCloseWarn');
	$("#listItems_txtConfirm").html(warning);
	//cerramos el popup de las opciones
	$('#popupListItems').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirmItems').popup( 'open', { transition: "pop" } ) }, 100 );
}


/*
>>>>>>> origin/develop
 * Asociamos el evento 'click' a los elementos de la clase '.btnEditItem' con
 * esta función que redirecciona al usuario a la pagina donde podra editar
 * el item seleccionado, pasando el identificador del item por GET.
 */
$(document).on('click', '.btnEditItem', function() {
	if($(this).closest("ul").attr("listState")==0){
<<<<<<< HEAD
		var form = document.createElement('form');
		form.setAttribute('method', 'GET');
		form.setAttribute('action', 'edit_item.html');
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
=======
		var parameter = {"idItem" : $(this).closest("li").attr('idItem')};
		$.ajax({
		url: URL_SERVER +'php/select_item.php',
		data: parameter,
		type:  'post',
		success:  function (response)
		{
			window.location.href = '#edit_items';
		}
		});
>>>>>>> origin/develop
	}
});


/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnCreateItem' con
 * esta función que redirecciona al usuario a la pagina donde podra crear
<<<<<<< HEAD
 * un item , pasando el identificador de la lista por GET.
 */
$(document).on('click', '.btnCreateItem', function() {
	var idList = $(this).attr('idList');
	$('#popupListSLists').popup("close");
	var form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', 'create_item.html');
	inputIdList = document.createElement('input');
	inputIdList.setAttribute('name', 'idList');
	inputIdList.setAttribute('type', 'hidden');
	inputIdList.setAttribute('value', $(this).attr('idList'));
	form.appendChild(inputIdList);
	document.body.appendChild(form);
	form.submit();
=======
 * un item.
 */
$(document).on('click', '.btnCreateItem', function() {
	window.location.href = '#create_items';
>>>>>>> origin/develop
});


// Asigna el evento click al botón de las opciones de la lista.
<<<<<<< HEAD
$(document).on('click', '#btnOptions', tapholdHandler);
=======
$(document).on('click', '#btnOptions', tapholdHandlerItem);
>>>>>>> origin/develop


/**
 * crea el menu popup.
 * @param event
 */
<<<<<<< HEAD
function tapholdHandler(){
	//asociamos el nombre de la lista al popup
	$("#popupListName").html($(this).attr('listName'));
	//asignamos el id de la lista seleccionada para que lo sepan los popups
	var idList = $(this).attr('idList');
	//mostramos u ocultamos la opción de cerrar lista dependiendo del estado de la misma
	if( $(this).attr('listState')==0) {
		//mostramos la opción crear producto y cerrar lista para las listas abiertas
		$('.btnCreateItem').closest("li").show();
		$('.confirmOpt[opt="close"]').closest("li").show();
	} else {
		//ocultamos la opción crear producto y cerrar lista para las listas cerradas
		$('.btnCreateItem').closest("li").hide();
		$('.confirmOpt[opt="close"]').closest("li").hide();
	}
	$('.btnCreateItem').attr("idList", idList);
	$('#popupConfirm').attr("idList", idList);
	//mostramos el popup con las opciones de la lista
	$('#popupListSLists').popup("open");
=======
function tapholdHandlerItem(){
	//asociamos el nombre de la lista al popup
	$("#popupItemtName").html($(this).attr('listName'));
	//mostramos u ocultamos la opción de completar lista dependiendo del estado de la misma
	if( $(this).attr('listState')==0) {
		//mostramos la opción crear producto y completar lista para las listas pendientes
		$('.listItems_confirmOpt[opt="open"]').closest("li").hide();
		$('.btnCreateItem').closest("li").show();
		$('.listItems_confirmOpt[opt="close"]').closest("li").show();
	} else {
		//ocultamos la opción crear producto y completar lista para las listas completadas
		$('.listItems_confirmOpt[opt="open"]').closest("li").show();
		$('.btnCreateItem').closest("li").hide();
		$('.listItems_confirmOpt[opt="close"]').closest("li").hide();
	}
	//mostramos el popup con las opciones de la lista
	$('#popupListItems').popup("open");
>>>>>>> origin/develop
}


/*
 * Asociamos el evento 'click' a los elementos de la clase '.confirmOpt' con
 * esta función que averigua la operación seleccionada y solicita confirmación.
 */
<<<<<<< HEAD
$(document).on('click', '.confirmOpt', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	//guardamos la operación en el atributo 'opt' del botón de confirmación
	$("#btnConfirm").attr("opt", operation);
	var confirmMessage = "";
	switch(operation) {
		case "close":
			//cerrar lista
			confirmMessage = "Esta operación va a marcar la lista como cerrada";
			break;
		case "delete":
			//borrar lista
			confirmMessage = "Esta acción es irreversible";
			break;
	};
	//mostramos un mensaje informando de la operación a realizar
	$("#txtConfirm").html(confirmMessage);
	//cerramos el popup de las opciones
	$('#popupListSLists').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirm').popup( 'open', { transition: "pop" } ) }, 100 );
=======
$(document).on('click', '.listItems_confirmOpt', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	//guardamos la operación en el atributo 'opt' del botón de confirmación
	$("#listItems_btnConfirm").attr("opt", operation);
	var confirmMessage = "";
	switch(operation) {
		case "close":
			//completar lista
			confirmMessage = i18n.t('listSLists.popup.closeWarn');
			break;
		case "open":
			//completar lista
			confirmMessage = i18n.t('listSLists.popup.resetWarn');
			break;
		case "delete":
			//borrar lista
			confirmMessage = i18n.t('listSLists.popup.removeWarn');
			break;
	};
	//mostramos un mensaje informando de la operación a realizar
	$("#listItems_txtConfirm").html(confirmMessage);
	//cerramos el popup de las opciones
	$('#popupListItems').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirmItems').popup( 'open', { transition: "pop" } ) }, 100 );
>>>>>>> origin/develop

});


/*
 * Asociamos el evento 'click' al botón de confirmación de la operación solicitada en
 * el menú de las opciones sobre una lista con esta función que averigua la operación 
 * seleccionada y procede a realizarla.
 */
<<<<<<< HEAD
$(document).on('click', '.btnConfirm', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	var idList = $('#popupConfirm').attr("idList");

	switch(operation) {
		case "close":
			//cerrar lista
			$.ajax({
				url: 'php/close_list.php',
				dataType: 'text',
				data: {"idList" : idList},
=======
$(document).on('click', '.listItems_btnConfirm', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');

	switch(operation) {
		case "close":
			//completar lista
			$.ajax({
				url: URL_SERVER +'php/close_list.php',
				dataType: 'text',
>>>>>>> origin/develop
				type:  'post',
				success:  function (response)
					   {
							//redirige a listar las listas del grupo
<<<<<<< HEAD
							window.location.href="list_slists.html";
					   },
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando cerrar la lista");
=======
							window.location.href="#list_slists";
					   },
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando completar la lista");
						}
			});
			break;
		case "open":
			//reiniciar lista
			$.ajax({
				url: URL_SERVER +'php/open_list.php',
				dataType: 'text',
				type:  'post',
				success:  function (response)
					   {
							//redirige a listar las listas del grupo
							window.location.href="#list_slists";
					   },
				error: 	function() {
							$("#messageListSList").html("Ha ocurrido un error intentando reiniciar la lista");
>>>>>>> origin/develop
						}
			});
			break;
		case "delete":
			//borrar lista
			$.ajax({
<<<<<<< HEAD
				url: 'php/delete_list.php',
				dataType: 'text',
				data: {"idList" : idList},
=======
				url: URL_SERVER +'php/delete_list.php',
				dataType: 'text',
>>>>>>> origin/develop
				type:  'post',
				success:  function (response)
					   {
							var status = response.trim();
							if(status == 'success') {
								//redirige a listar las listas del grupo
<<<<<<< HEAD
								window.location.href="list_slists.html";
							} else {
								$('#message').html(status);
							}
					   },
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando borrar la lista");
=======
								window.location.href="#list_slists";
							} else {
								$('#messageListItems').html(status);
							}
					   },
				error: 	function() {
							$("#messageListItems").html("Ha ocurrido un error intentando borrar la lista");
>>>>>>> origin/develop
						}
			});
			break;
	};
	//cerramos el popup de la confirmación
<<<<<<< HEAD
	$('#popupConfirm').popup('close');
=======
	$('#popupConfirmItems').popup('close');
>>>>>>> origin/develop
});


// lo que se va a ejecutar cuando la página esté lista para ser visualizada
<<<<<<< HEAD
$(document).on("pageshow", function() {
	listItems();
    $("#ulPopupListSLists").listview("refresh");
	$('#popupListSLists').popup();
	$('#popupConfirm').popup();
});
=======
$(document).on("pageshow", "#list_items", function() {
	listItems();
    $("#ulPopupListItems").listview("refresh");
	$('#popupListItems').popup();
	$('#popupConfirmItems').popup();
	$('#popupBuyItem').popup();
});
>>>>>>> origin/develop
