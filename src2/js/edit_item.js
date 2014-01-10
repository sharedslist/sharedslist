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
					},
			error: function () {
						$('#messageEditItem').html('No ha sido posible obtener los datos del producto');
					}
		});
});

/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a edit_item.php
 * para editar el item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function editItem(){
	var itemName = $("#itemNameEdit").val();
	if(!validateItemName(itemName)){
		$('#messageEditItem').html('Nombre del producto inválido');
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
		var parameters = {"itemName" : itemName };
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
	$.ajax({
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


