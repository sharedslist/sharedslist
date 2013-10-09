/**
 * funciones javascript para SharedSList
 */

function mostrarMensajes() {
	$.ajax({
		url : '/nuevoMensaje.php',
		type : 'POST',
		async : true,
		data : {
			'textoMensaje' : document.getElementById("mensaje").value
		},
		success : function(result) { /*
										 * a ejecutar cuando se reciban
										 * resultados del servidor
										 */
			document.getElementById("mensajes").innerHTML = "";
			var json = eval ("(" + result + ")");
			var ul = ulListaMensajes();
			document.getElementById("mensajes").appendChild(ul);
			var li = liHeaderMensajes(json.length);
			ul.appendChild(li);
			for (var i = 0; i < json.length; i++) {
				li = liUnMensaje(json[i].cuerpo, json[i].fecha);
				ul.appendChild(li);
			}
		}
	});
	document.getElementById("mensaje").value = '';
}

function ulListaMensajes() {
	var ul = document.createElement('ul');
	ul.setAttribute("data-role", "listview");
	ul.setAttribute("data-theme", "d");
	ul.setAttribute("data-divider-theme", "d");
	ul.setAttribute("class", "ui-listview");
	return ul;
}

function liHeaderMensajes(numMensajes) {
	var li = document.createElement('li');
	li.setAttribute("data-role", "list-divider");
	li.setAttribute("role", "heading");
	li.setAttribute("class", "ui-li ui-li-divider ui-bar-d ui-li-has-count");
	li.innerHTML = "Lista de los mensajes";
	var span = document.createElement('span');
	span.setAttribute("class", "ui-li-count ui-btn-up-c ui-btn-corner-all");
	span.innerHTML = numMensajes;
	li.appendChild(span);
	return li;
}

function liUnMensaje(cuerpo, fecha) {
	var li = document.createElement('li');
	li.setAttribute("data-corners", "false");
	li.setAttribute("data-shadow", "false");
	li.setAttribute("data-iconshadow", "true");
	li.setAttribute("data-wrapperels", "div");
	li.setAttribute("data-icon", "arrow-r");
	li.setAttribute("data-iconpos", "right");
	li.setAttribute("data-theme", "d");
	li.setAttribute("class",
			"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d");
	var div = document.createElement('div');
	div.setAttribute("class", "ui-btn-inner ui-li");
	li.appendChild(div);
	var div2 = document.createElement('div');
	div2.setAttribute("class", "ui-btn-text");
	div.appendChild(div2);
	var a = document.createElement('a');
	a.setAttribute("href", "#");
	a.setAttribute("class", "ui-link-inherit");
	div2.appendChild(a);
	var p1 = document.createElement('p');
	p1.setAttribute("class", "ui-li-aside ui-li-desc");
	p1.innerHTML = "<strong>" + fecha + "<strong>";
	var p2 = document.createElement('p');
	p2.setAttribute("class", "ui-li-desc");
	p2.innerHTML = cuerpo;
	a.appendChild(p1);
	a.appendChild(p2);
	var span = document.createElement('span');
	span.setAttribute("class", "ui-icon ui-icon-arrow-r ui-icon-shadow");
	span.innerHTML = "&nbsp;";
	return li;
}