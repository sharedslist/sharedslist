// función que hace una llamada AJAX al servidor por las listas de un grupo
function listSLists() {
	$.ajax({
		url: 'php/list_slists.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
					var groupAndSLists = JSON.parse(response.trim());
					$("#list_slists_header > h1").append(': ' + groupAndSLists.groupName);
					list_slists(groupAndSLists.slists);
			   },
		error: 	function() {
					$("#message").html("Ha ocurrido un error recuperando las listas de compra");
				}
	});
}

// función que crea los elementos 'ul' y 'li' correspondientes a las listas y sus items
function list_slists(slists) {
	//vaciamos la lista por si queda basura
	$("#slists").html("");
	$.each(slists, function(i, slist) {
		var ul = document.createElement('ul');
		ul.setAttribute("data-role", "listview");
		ul.setAttribute("data-inset", "true");
		ul.setAttribute("data-divider-theme", "b");
		//creamos la cabecera de la lista
		var divider = document.createElement('li');
		divider.setAttribute("data-role", "list-divider");
		var div = document.createElement('div');
		div.setAttribute("class", "ui-grid-a");
		var divBlockA = document.createElement('div');
		divBlockA.setAttribute("class", "ui-block-a");
		$(divBlockA).html(slist.listName);
		$(divBlockA).append(", creada " + slist.listCreated);
		divBlockA.setAttribute("style", "margin-top:10px");
		var divBlockB = document.createElement('div');
		divBlockB.setAttribute("class", "ui-block-b");
		divBlockB.setAttribute("style", "text-align:right");
		var a = document.createElement('a');
		a.setAttribute("href", "#");
		a.setAttribute("data-role", "button");
		a.setAttribute("data-iconpos", "notext");
		a.setAttribute("data-icon", "edit");
		a.setAttribute("data-theme", "b");
		a.setAttribute("data-inline", "true");
		$(a).html("Ver y editar");
		divBlockB.appendChild(a);
		div.appendChild(divBlockA);
		div.appendChild(divBlockB);
		divider.appendChild(div);
		ul.appendChild(divider);
		//creamos un list item por cada item de la lista
		$.each(slist.items, function(i,item) {
			var li = document.createElement('li');
			$(li).html(item.itemName);
			var spanCantidad = document.createElement('span');
			spanCantidad.setAttribute("class", "ui-li-count");
			$(spanCantidad).html(item.quantity);
			li.appendChild(spanCantidad);
			ul.appendChild(li);
		});
		$("#slists").append(ul);
	});
	// enviamos el evento create para que jQuery Mobile cambie el estilo
	$("#slists").trigger('create');
	//$("#slists ul").listview('refresh');
}

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", function() {
	listSLists();
});