// función que hace una llamada AJAX al servidor por las listas de un grupo
function listSLists() {
	$.ajax({
		url: 'php/list_slists.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
					try {
						var groupAndSLists = JSON.parse(response.trim());
						$("#list_slists_header > h1").append(': ' + groupAndSLists.groupName);
						list_slists(groupAndSLists.slists);
					}
					catch(e) {
						$("#message").html(response);
					}
			   },
		error: 	function() {
					$("#message").html("Ha ocurrido un error recuperando las listas de compra");
				}
	});
}

// función que crea los elementos 'ul' y 'li' correspondientes a las listas y sus items
function list_slists(slists) {
	$("#open_list").html("");
	$("#close_list").html("");
	$.each(slists, function(i, slist) {
		var divider = '<li data-theme = "d">';
		var div =  '<div>';
		var divBlockA = '<div style="display:inline-block; margin-top:10px">'+ slist.listName + ", creada " + slist.listCreated+'</div>';
		var a = '<a href ="#" class= "btnVerLista" data-role = "button"	data-iconpos="notext" data-theme = "b" data-icon = "edit" data-inline = true" ';
		a = a + 'idList="'+slist.idList+'">Ver y editar</a>';
		var divBlockB = '<div style="display:inline-block; float:right" >'+ a +'</div>';
		div = div + divBlockA + divBlockB +'</div>' ;
		divider = divider + div + '</li>';
		if(slist.listState == 0){
			$("#open_list").append(divider);
		}
		else{
			$("#close_list").append(divider);
		}
	});
	$("#open_list").listview( "refresh" );
	$("#close_list").listview( "refresh" );
	$("#slists").trigger('create');
}

/*
 * Asociamos el evento 'click' a los elementos de la clase '.btnVerLista' con
 * esta función que redirecciona al usuario a la pagina donde podra ver y editar
 * la lista seleccionada, pasando el identificador de la lista por POST.
 */
$(document).on('click', '.btnVerLista', function() {
	var form = document.createElement('form');
	form.setAttribute('method', 'POST');
	form.setAttribute('action', 'list_items.html');
	inputIdList = document.createElement('input');
	inputIdList.setAttribute('name', 'idList');
	inputIdList.setAttribute('type', 'hidden');
	inputIdList.setAttribute('value', $(this).attr('idList'));
	form.appendChild(inputIdList);
	document.body.appendChild(form);
	form.submit();
});

// lo que se va a ejecutar cuando la página esté lista para ser visualizada
$(document).on("pageshow", function() {
	listSLists();
});