// función que hace una llamada AJAX al servidor por las listas de un grupo
function listItems() {
	var listID = getUrlVars()["idList"];
	$('#myList').attr("idList", listID);
	$.ajax({
		url: 'php/list_items.php',
		dataType: 'text',
		data: { idList : listID },
		type:  'post',
		success:  function (response)
			   {
					var items = JSON.parse(response.trim());
					//$("#list_slists_header > h1").append(': ' + listName);
					list_items(items);
			   },
		error: 	function() {
					$("#message").html("Ha ocurrido un error recuperando las listas con sus artículos");
				}
	});
}
//parsea la URL para obtener los parámetros GET;
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function list_items(response){
	$("#items").html("");
	//vaciamos la lista por si queda basura
	var ul = document.createElement('ul');
			ul.setAttribute("data-role", "listview");
			ul.setAttribute("data-inset", "true");
			ul.setAttribute("data-divider-theme", "b");
			//creamos la cabecera de la lista


	$.each(response.items, function(i, item) {

		var li = document.createElement('li');
				$(li).html(item.itemName);
		var spanCantidad = document.createElement('span');
				spanCantidad.setAttribute("class", "ui-li-count");
				$(spanCantidad).html(item.quantity - item.quantityBought);
				li.appendChild(spanCantidad);
				ul.appendChild(li);
	});

	$("#items").append(ul);
	$("#items").trigger('create');
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.confirmOptListItems' con
 * esta función que averigua la operación seleccionada y solicita confirmación.
 */
$(document).on('click', '.confirmOptListItems', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	//guardamos la operación en el atributo 'opt' del botón de confirmación
	$("#btnConfirmListItems").attr("opt", operation);
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
	$("#txtConfirmListItems").html(confirmMessage);
	//cerramos el popup de las opciones
	$('#popupListItems').popup("close");
	//mostramos el popup de la confirmación
	setTimeout( function(){ $('#popupConfirmListItems').popup( 'open', { transition: "pop" } ) }, 100 );

});

/*
 * Asociamos el evento 'click' al botón de confirmación de la operación solicitada en
 * el menú de las opciones de la  lista con esta función que averigua la operación 
 * seleccionada y procede a realizarla.
 */
$(document).on('click', '.btnConfirmListItems', function() {
	//obtenemos la operación solicitada
	var operation = $(this).attr('opt');
	var idList = $('#myList').attr("idList");

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
							//redireccionamos a la página que lista las listas de compra
							window.location.href = 'list_slists.html';
					   },
				error: 	function() {
							$("#message").html("Ha ocurrido un error intentando cerrar la lista");
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
								//redireccionamos a la página que lista las listas de compra
								window.location.href = 'list_slists.html';
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

// Asigna el evento click al botón de las opciones de la lista.
$(document).on('click', '.btnOptions', tapholdHandler);


/**
 * crea el menu popup.
 * @param event
 */
function tapholdHandler(){
	//alert($(this).closest("li").attr('idList'));
	//asociamos el nombre de la lista al popup
	$("#popupListName").html("Lista : " + $("#list_items h1").html());
	//mostramos el popup con las opciones de la lista
	$('#popupListItems').popup("open");
}


// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", function() {
	listItems();
	$("#ulPopupListItems").listview("refresh");
	$('#popupListItems').popup();
	$('#popupConfirmListItems').popup();
});