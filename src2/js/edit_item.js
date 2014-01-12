$(document).ready(function() {
	isConnected() ;
});

// Rellena los campos del formulario con la información del item
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
					}
		});
});

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
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#editItemForm").trigger('create');
});


/*
 * Carga la extensión mobiscroll para la cantidad
 */
$('#edit_quantity').on("rrrreload", function() {
	$('#edit_quantity').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
});

/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a edit_item.php
 * para editar el item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function editItem(){
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
		
	}
}


/*
 * Obtiene el identificador del item y llama a delete_item.php
 * para eliminar el item de la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function deleteItem(){
	$.ajax({
		url:   URL_SERVER +'php/delete_item.php',
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

