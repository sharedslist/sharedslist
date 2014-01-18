$(document).ready(function() {
	isConnected() ;
});

// Rellena los campos del formulario con la información del item
<<<<<<< HEAD
$(document).on("pageshow", function() {
	var parameters = { "idItem" : getUrlVars()["idItem"], "idList" : getUrlVars()["idList"] };
	$.ajax({
		url: 'php/get_item_info.php',
		dataType: 'text',
		data: parameters,
		type:  'post',
		success:  function (response){
						var item = JSON.parse(response.trim());
						$('#itemName').attr('value', item.itemName);
						$('#quantity').val(item.quantity).change();
						$('#quantityBought').val(item.quantityBought).change();
					},
			error: function () {
						$('#message').html('No ha sido posible obtener los datos del producto');
=======
$(document).on("pageshow", "#edit_items", function() {
	$.ajax({
		url: URL_SERVER +'php/get_item_info.php',
		dataType: 'text',
		type:  'post',
		success:  function (response){
						var item = JSON.parse(response.trim());
						$('#edit_itemName').attr('value', item.itemName);
						$('#edit_quantity').val(item.quantity).change();
						$('#edit_metric').val(item.metric).change();;
					},
			error: function () {
						$('#messageEditItem').html('No ha sido posible obtener los datos del producto');
>>>>>>> origin/develop
					}
		});
});

<<<<<<< HEAD

$(document).on("pageshow", function() {
	// cargamos las opciones de cantidad para el nuevo producto
	for (var i = 1; i <= 999; i++) {
		$('<option/>', {
			value : i,
			text : i
		}).appendTo('#quantity');
	};
	// cargamos la extensión mobiscroll para la cantidad
	$('#quantity').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
=======
$(document).on("pageshow", "#edit_items", function() {
	// cargamos las opciones de cantidad para el nuevo producto
	for (var i = 1; i <= 50; i++) {
		$('<option/>', {
			value : i,
			text : i
		}).appendTo('#edit_quantity');
	};
	// cargamos la extensión mobiscroll para la cantidad
	$('#edit_quantity').mobiscroll().select({
		theme : 'jqm',
		lang : i18n.lng(), //obtenemos el lenguaje actual del plugin i18next
>>>>>>> origin/develop
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#editItemForm").trigger('create');
<<<<<<< HEAD
});

$(document).on("pageshow", function() {
	// cargamos las opciones de cantidad para el nuevo producto
	for (var i = 0; i <= 999; i++) {
		$('<option/>', {
			value : i,
			text : i
		}).appendTo('#quantityBought');
	};
	// cargamos la extensión mobiscroll para la cantidad
	$('#quantityBought').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityBoughtText'
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#editItemForm").trigger('create');
=======
	//limpiamos la basura que podria haberse producido con mobiscroll
        $("#editItemForm .ui-block-a .ui-input-text").hide();
        $("#editItemForm .ui-block-a .ui-input-text .quantityText").parent().show();
        $("#editItemForm .ui-block-a .ui-input-text .quantityText").show();
>>>>>>> origin/develop
});


/*
 * Carga la extensión mobiscroll para la cantidad
 */
<<<<<<< HEAD
$('#quantity').on("rrrreload", function() {
	$('#quantity').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
=======
$('#edit_quantity').on("rrrreload", function() {
	$('#edit_quantity').mobiscroll().select({
		theme : 'jqm',
		lang : i18n.lng(), //obtenemos el lenguaje actual del plugin i18next
>>>>>>> origin/develop
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
});

<<<<<<< HEAD

/*
 * Carga la extensión mobiscroll para la cantidad
 */
$('#quantityBought').on("rrrreload", function() {
	$('#quantityBought').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityBoughtText'
	});
});


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
/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a edit_item.php
 * para editar el item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function editItem(){
<<<<<<< HEAD
	var itemName = $("#itemName").val();
	var itemState;
	var quantity = $("#quantity").val();
	var quantityBought = $("#quantityBought").val();
	if(!validateItemName(itemName)){
		$('#message').html('Nombre del producto inválido');
	}
	else if(!validateQuantity(quantity)){
		$('#message').html('Cantidad del producto inválida');
	}
	else if(!validateQuantityBought(quantityBought, quantity)){
		$('#message').html('Cantidad comprada del producto inválida');
	}
	else {
		if($.trim(quantity)==$.trim(quantityBought))
		{
			itemState = true;
		}
		else
		{
			itemState = false;
		}
		var parameters = { "idList" : getUrlVars()["idList"], "idItem" : getUrlVars()["idItem"], "itemName" : itemName, "itemState" : itemState, "quantity" : quantity, "quantityBought" : quantityBought };
		$.ajax({
			data:  parameters,
			url:   'php/edit_item.php',
			dataType: 'text',
			type:  'post',
			success:  function (response){
						var closed = response.trim()=='closed';
						var form = document.createElement('form');
						form.setAttribute('method', 'GET');
						form.setAttribute('action', 'list_items.html');
						inputIdList = document.createElement('input');
						inputIdList.setAttribute('name', 'idList');
						inputIdList.setAttribute('type', 'hidden');
						inputIdList.setAttribute('value', getUrlVars()['idList']);
						form.appendChild(inputIdList);
						if(closed) {
							var inputListClosed = document.createElement('input');
							inputListClosed.setAttribute('name', 'listClosed');
							inputListClosed.setAttribute('type', 'hidden');
							inputListClosed.setAttribute('value', closed);
							form.appendChild(inputListClosed);
						}
						document.body.appendChild(form);
						form.submit();
					},
			error: function (){
						$('#message').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
					}
		});
=======
	var itemName = $("#edit_itemName").val();
	var quantity = $("#edit_quantity").val();
	var metric = $("#edit_metric").val();
	if(!validateItemName(itemName)){
		$('#messageEditItem').html('Nombre del producto inválido');
	}
	else {
		var parameters = {"itemName" : itemName, "quantity" : quantity, "metric" : metric };
		$.ajax({
			data:  parameters,
			url:   URL_SERVER +'php/edit_item.php',
			dataType: 'text',
			type:  'post',
			success:  function (response){
						window.location.href = '#list_items';
					},
			error: function (){
						$('#messageEditItem').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
					}
		});
		
>>>>>>> origin/develop
	}
}


/*
 * Obtiene el identificador del item y llama a delete_item.php
 * para eliminar el item de la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function deleteItem(){
<<<<<<< HEAD
	var parameters = { "idList" : getUrlVars()["idList"], "idItem" : getUrlVars()["idItem"] };
	$.ajax({
		data:  parameters,
		url:   'php/delete_item.php',
		dataType: 'text',
		type:  'post',
		success:  function (){
					var form = document.createElement('form');
					form.setAttribute('method', 'GET');
					form.setAttribute('action', 'list_items.html');
					inputIdList = document.createElement('input');
					inputIdList.setAttribute('name', 'idList');
					inputIdList.setAttribute('type', 'hidden');
					inputIdList.setAttribute('value', getUrlVars()['idList']);
					form.appendChild(inputIdList);
					document.body.appendChild(form);
					form.submit();
				},
		error: function (){
					$('#message').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
=======
	$.ajax({
		url:   URL_SERVER +'php/delete_item.php',
		dataType: 'text',
		type:  'post',
		success:  function (){
					window.location.href = '#list_items';
				},
		error: function (){
					$('#messageEditItem').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
>>>>>>> origin/develop
				}
	});
}


/*
 * Verifica que el nombre del item es válido
 * 
 * @return boolean True si el nombre del item es válido.False en caso contrario
 */
function validateItemName(name) { 	
	if($.trim(name) == ""){
		return false;
	}
	else{
		return true;
	}
}

<<<<<<< HEAD

/*
 * Verifica que la cantidad del item es válida
 * 
 * @return boolean True si la cantidad del item es válida, un número mayor que 0.False en caso contrario
 */
function validateQuantity(quantity) { 	
	if(($.trim(quantity) == "") || parseInt(quantity)<0){
		return false;
	}
	else{
		return true;
	}
}


/*
 * Verifica que la cantidad del item es válida
 * 
 * @return boolean True si la cantidad del item es válida, un número mayor que 0.False en caso contrario
 */
function validateQuantityBought(quantityBought, quantity) { 	
	if(($.trim(quantityBought) == "") || parseInt(quantityBought)<0 || parseInt(quantityBought)>parseInt(quantity)){
		return false;
	}
	else{
		return true;
	}
}
=======
>>>>>>> origin/develop
