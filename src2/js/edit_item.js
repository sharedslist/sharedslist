$(document).ready(function() {
	isConnected() ;
});

// Rellena los campos del formulario con la información del item
$(document).on("pageshow", "#edit_items", function() {
	$.ajax({
		url: 'php/get_item_info.php',
		dataType: 'text',
		type:  'post',
		success:  function (response){
						var item = JSON.parse(response.trim());
						$('#itemNameEdit').attr('value', item.itemName);
						$('#quantityEdit').val(item.quantity).change();
						$('#quantityBought').val(item.quantityBought).change();
					},
			error: function () {
						$('#messageEditItem').html('No ha sido posible obtener los datos del producto');
					}
		});
});

$(document).on("pageshow", "#edit_items", function() {
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
});


/*
 * Carga la extensión mobiscroll para la cantidad
 */
$('#quantityEdit').on("rrrreload", function() {
	$('#quantityEdit').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
});


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

/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a edit_item.php
 * para editar el item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function editItem(){
	var itemName = $("#itemNameEdit").val();
	var itemState;
	var quantity = $("#quantityEdit").val();
	var quantityBought = $("#quantityBought").val();
	if(!validateItemName(itemName)){
		$('#messageEditItem').html('Nombre del producto inválido');
	}
	else if(!validateQuantity(quantity)){
		$('#messageEditItem').html('Cantidad del producto inválida');
	}
	else if(!validateQuantityBought(quantityBought, quantity)){
		$('#messageEditItem').html('Cantidad comprada del producto inválida');
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
		var parameters = {"itemName" : itemName, "itemState" : itemState, "quantity" : quantity, "quantityBought" : quantityBought };
		$.ajax({
			data:  parameters,
			url:   'php/edit_item.php',
			dataType: 'text',
			type:  'post',
			success:  function (response){
						window.location.href = '#list_items';
					},
			error: function (){
						$('#messageEditItem').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
					}
		});
	}
}


/*
 * Obtiene el identificador del item y llama a delete_item.php
 * para eliminar el item de la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function deleteItem(){
	var parameters = { "idList" : getUrlVars()["idList"], "idItem" : getUrlVars()["idItem"] };
	$.ajax({
		data:  parameters,
		url:   'php/delete_item.php',
		dataType: 'text',
		type:  'post',
		success:  function (){
					window.location.href = '#list_items';
				},
		error: function (){
					$('#messageEditItem').html('Ha ocurrido un error, por favor vuelva a intentarlo.');
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
