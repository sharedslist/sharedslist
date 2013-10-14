function addProduct()
{
	var name = $("#productName").val();
	if(name != ""){
		$("#initialProducts").append('<li><a>'+name+'</a><a class="removeProduct" ></a>'+'</li>').listview('refresh');
		$("#productName").val("");
	}
}

$(document).on('click','.removeProduct', function(){
	$(this).closest('li').fadeOut("normal", function() {
        $(this).remove();
	});
	$("#initialProducts").listview('refresh');
});