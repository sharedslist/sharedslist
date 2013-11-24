// función que hace una llamada AJAX al servidor por las listas de un grupo
function listItems() {
	
	$.ajax({
		url: 'php/list_items.php',
		dataType: 'text',
		data: { idList : getUrlVars()["idList"] },
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


// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", function() {
	listItems();
});