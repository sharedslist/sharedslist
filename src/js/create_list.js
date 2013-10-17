/*
La función addProduct() sirve para añadir un nuevo producto
a la lista de los productos iniciales de la lista a crear.
La lista de los productos está inicialmente oculta y esta función
se encarga de hacerla visible al añadir el primer producto.
*/
function addProduct()
{
	var name = $("#productName").val();
	if(name != ""){
		$("#initialProducts").append('<li><a>'+name+'</a><a class="removeProduct" ></a>'+'</li>').listview('refresh');
		$("#productName").val("");
		//comprobamos el número de productos
		var numProducts = $("#initialProducts li").length - 1;
		//si solo hay 1 producto, se hace visible la lista
		if(numProducts == 1){
			$("#initialProducts").show();
		}
	}
}

/*
Asociamos el evento 'click' a los elementos de la clase '.removeProduct'
con esta función que elimina dichos elementos con un efecto de difuminado.
Además, si al eliminar el elemento ya no quedan más productos en la lista
de productos iniciales, se oculta la lista.
*/
$(document).on('click','.removeProduct', function(){
	$(this).closest('li').fadeOut("normal", function() {
        $(this).remove();
		//comprobamos el número de productos
		var numProducts = $("#initialProducts li").length - 1;
		//si no hay productos, se oculta la lista
		if(numProducts == 0){
			$("#initialProducts").hide();
		}
	});
	$("#initialProducts").listview('refresh');
});

