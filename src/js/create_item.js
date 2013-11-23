/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a create_item.php
 * para crear e insertar el nuevo item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function createItem()
{
	var itemName = $("#itemName").val();
	var quantity = $("#quantity").val();
	if(!validateItemName(itemName)){
		$('#message').html('Nombre del producto inválido');
	}
	else if(!validateQuantity(quantity)){
		$('#message').html('Cantidad del producto inválida');
	}
	else {
		var parameters = { "itemName" : itemName, "quantity" : quantity };
		$.ajax({
			data:  parameters,
			url:   document.URL+'/../php/create_item.php',
			dataType: 'text',
			type:  'post',
			success:  function (response)
				   {window.location.href = 'list_items.html';},
			error: function () 
					{
						$('#message').html('An error occurred, please try again.');
					}
		});
	}
}


/*
 * Verifica que el nombre del item es válido
 * 
 * @return boolean True si el nombre del item es válido.False en caso contrario
 */
function validateItemName(name) 
{ 	
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
function validateQuantity(quantity) 
{ 	
	if(($.trim(quantity) == "") || !(quantity>0)){
		return false;
	}
	else{
		return true;
	}
}
