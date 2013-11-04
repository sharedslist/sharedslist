var id = 1;// id para los nuevos productos
var maxProducts = 50;// el número máximo de la cantidad de producto

/*
 * Asociamos el evento 'click' a los elementos de la clase '.removeProduct' con
 * esta función que elimina dichos elementos con un efecto de difuminado.
 * Además, si al eliminar el elemento ya no quedan más productos en la lista de
 * productos iniciales, se oculta la lista.
 */
$(document).on('click', '.removeProduct', function() {
	$(this).closest('li').fadeOut("normal", function() {
		$(this).remove();
		// comprobamos el número de productos
		var numProducts = $("#initialProducts li").length - 1;
		// si no hay productos, se oculta la lista
		if (numProducts == 0) {
			$("#initialProducts").hide();
		}
	});
	$("#initialProducts").listview('refresh');
});

// lo que se va a ejecutar cuando la página esté cargada
$(document).on("pageshow", function() {
	// cargamos las opciones de cantidad para el nuevo producto
	for (var i = 1; i <= maxProducts; i++) {
		$('<option/>', {
			value : i,
			text : i
		}).appendTo('#quantityNewProduct');
	};
	// cargamos la extensión mobiscroll para la cantidad
	$('#quantityNewProduct').mobiscroll().select({
		theme : 'jqm',
		lang : 'es',
		display : 'bottom',
		mode : 'mixed',
		inputClass : 'textoCantidad'
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#create_list").trigger('create');
});

/*
 * La función addProduct() sirve para añadir un nuevo producto a la lista de los
 * productos iniciales de la lista a crear. La lista de los productos está
 * inicialmente oculta y esta función se encarga de hacerla visible al añadir el
 * primer producto.
 */
function addProduct() {
	var name = $("#productName").val();
	if (name != "") {
		// obtenemos la cantidad del producto a añadir
		var quantity = $("#quantityNewProduct_dummy").val();
		// creamos el list item correspondiente al nuevo producto en la lista de
		// los productos iniciales
		var li = createLiItem(name);
		$("#initialProducts").append(li).listview('refresh');
		// cargamos la extensión mobiscroll para el producto añadido
		$("#initialProducts li:last-child select").mobiscroll().select({
			theme : 'jqm',
			lang : 'es',
			display : 'bottom',
			mode : 'mixed',
			inputClass : 'textoCantidad'
		}).mobiscroll('setValue', new Array(quantity), true);
		// enviamos el evento create para que jQuery Mobile cambie el estilo
		$("#create_list").trigger('create');
		// devolvemos los campos a su estado inicial
		$("#productName").val("");
		$('#quantityNewProduct').mobiscroll('setValue', new Array("1"), true);
		// comprobamos el número de productos
		var numProducts = $("#initialProducts li").length - 1;
		// si solo hay 1 producto, se hace visible la lista
		if (numProducts == 1) {
			$("#initialProducts").show();
		}
	}
}

/*
 * Crea un elemento 'li' para un nuevo producto en la lista y le da el nombre 'name'
 */
function createLiItem(name){
	var li = document.createElement('li');
	li.setAttribute("data-role", "fieldcontain");
	// creamos un div con class="ui-grid-b" para poder controlar el ancho de
	// los elementos
	var divGrid = document.createElement('div');
	divGrid.setAttribute("class", "ui-grid-b");
	var divBlock1 = document.createElement('div');
	divBlock1.setAttribute("class", "ui-block-a");
	divBlock1.setAttribute("style", "width:85%;");
	var a1 = document.createElement('a');
	var span = document.createElement('span');
	span.setAttribute("id", "spanProductName");
	span.innerHTML = name;
	divBlock1.appendChild(span);
	var divBlock2 = document.createElement('div');
	divBlock2.setAttribute("class", "ui-block-b");
	divBlock2.setAttribute("style", "width:15%;");
	var select = document.createElement('select');
	select.setAttribute("name", "Cantidad");
	select.setAttribute("data-role", "none");
	select.setAttribute("id", id);
	id = id + 1;
	for (var i = 1; i <= maxProducts; i++) {
		var option = document.createElement('option');
		option.setAttribute("value", i);
		option.innerHTML = i;
		select.appendChild(option);
	};
	divBlock2.appendChild(select);
	divGrid.appendChild(divBlock1);
	divGrid.appendChild(divBlock2);
	a1.appendChild(divGrid);
	li.appendChild(a1);
	var a2 = document.createElement('a');
	a2.setAttribute("class", "removeProduct");
	li.appendChild(a2);
	return li;
}

/*
 * Esta función recoge los datos del formulario de la creación de una nueva lista de compra,
 * valida los datos y, en caso de que sean válidos, los empaqueta en un JSON,lo envía al servidor
 * para que lo procese y al recibir la respuesta del servidor muestra el mensaje de error,si lo
 * hubo, o en el caso contrario redirecciona al usuario al acceso a la lista nuevamente creada.
 */
function createList() {
	if(!validateListName()){
		$('#message').html('Intoduce el nombre de la lista correctamente');
	}
	else {
		var newList = [];
		listName = {};
		listName ["listName"] = $("#listName").val();
		newList.push(listName);
		var productsList = [];
		$("#initialProducts li:not('.ui-first-child')").each(function(i, li) {
			product = {};
			//asignamos el nombre y cantidad del producto
			product ["prodName"] = $(li).find("#spanProductName").html();
			product ["prodQt"] = $(li).find("select").mobiscroll('getValue')[0];
			productsList.push(product);
		});
		newList.push(productsList);
		//convertimos el objeto newList a JSON
		var newListJSON = JSON.stringify(newList);
		$.ajax({
			data:  { "newList" : newListJSON },
			url:   'php/create_list.php',
			type:  'post',
			success:  function (response)
				   {
						var code = response.trim();
						if(code == 'success'){
							window.location.href = "list_slists.html";
						}
						else{
							$("#message").html(response);
						}
				   },
			error: function () 
					{
						$('#message').html('Ha ocurrido un error, intentalo de nuevo');
					}
		});				
	}
}

/*
 * Esta función  sirve para verificar que el nombre de la lista no contiene carácteres prohibidos
 * 
 * @return boolean True si el nombre de la lista no contiene carácteres prohibidos.False en caso contrario
 */

function validateListName(){
	if($("#listName").val().length > 0){
		return true;
	}
	else return false;
}
