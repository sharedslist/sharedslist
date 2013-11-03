/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a edit_item.php
 * para editar el item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function editItem()
{
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



/*
 * Verifica que la cantidad del item es válida
 * 
 * @return boolean True si la cantidad del item es válida, un número mayor que 0.False en caso contrario
 */
function validateQuantityBought(quantityBought) 
{ 	
	if(($.trim(quantityBought) == "") || !(quantityBought>0)){
		return false;
	}
	else{
		return true;
	}
}


/*
 * Obtiene el identificador del item y llama a delete_item.php
 * para eliminar el item de la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function deleteItem()
{
//	var idItem =  $_SESSION['Item'];
var idItem = 2;
	var parameters = { "idItem" : idItem};
	$.ajax({
		data:  parameters,
		url:   document.URL+'/../php/delete_item.php',
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
