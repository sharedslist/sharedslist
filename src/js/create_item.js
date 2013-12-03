$(document).ready(function() {
	isConnected() ;
});

// lo que se va a ejecutar cuando la página esté cargada
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
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#create_item").trigger('create');
});


/*
 * Carga la extensión mobiscroll para la cantidad
 */
$('#quantity').on("rrrreload", function() {
	$('#quantity').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'quantityText'
	});
});


$(document).bind('quantityMetric',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});


//parsea la URL para obtener los parámetros GET;
function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


/*
 * Obtiene datos del formulario de la página html, los valida y envía los datos a create_item.php
 * para crear e insertar el nuevo item en la base de datos. Si ocurre un error se le comunica al
 * usuario, de lo contrario se redirige a la página list_items.html.
 */
function createItem(){
	var idList =  getUrlVars()['idList'];
	var itemName = $("#itemName").val();
	var quantity = $("#quantity").val();
	if(!validateItemName(itemName)){
		$('#message').html('Nombre del producto inválido');
	}
	else if(!validateQuantity(quantity)){
		$('#message').html('Cantidad del producto inválida');
	}
	else {
		var parameters = { "idList" : idList, "itemName" : itemName, "quantity" : quantity };
		$.ajax({
			data:  parameters,
			url:   'php/create_item.php',
			dataType: 'text',
			type:  'post',
			success:  function () {
						var form = document.createElement('form');
						form.setAttribute('method', 'GET');
						form.setAttribute('action', 'list_items.html');
						inputIdList = document.createElement('input');
						inputIdList.setAttribute('name', 'idList');
						inputIdList.setAttribute('type', 'hidden');
						inputIdList.setAttribute('value', idList);
						form.appendChild(inputIdList);
						document.body.appendChild(form);
						form.submit();
				   },
			error: function () {
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
	if(($.trim(quantity) == "") || parseInt(quantity)<=0){
		return false;
	}
	else{
		return true;
	}
}
