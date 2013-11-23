/*
 * Envía una petición ajax y lista los nombres de 
 * los grupos a los que pertenece el usuario en sesión.
 */
function listGroups()
{
	$.ajax({
		url: document.URL+'/../php/list_groups.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {
			   obj = JSON.parse(response);
			   list(obj);}
		});
}

function selectGroup(id)
{
	var parameter = {"idGroup" : id};
	$.ajax({
	url: 'php/select_group.php',
	data: parameter,
	type:  'post',
	success:  function (response)
	{
		window.location.href = 'list_slists.html';
	},
	error: 	function() 
	{
		$("#message").html("Ha ocurrido un error recuperando las listas de la compra");
	}
	});
}

/*
 * Lista los nombres de los grupos a los que 
 * pertenece el usuario en sesión.
 */
function list(groups)
{
	var name;
	var id;
	for(var i=0; i< groups.name.length; i++)
	{
		$("#mylist").append('<li id="'+groups.id[i]+'" onclick="selectGroup(id)"><a href="#">'+groups.name[i]+'</a></li>');
		$("#mylist").listview('refresh');
	}
}