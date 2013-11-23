
function listMembers() {
	$.ajax({
		url: 'php/list_members.php',
		dataType: 'text',
		type:  'post',
		success:  function (response) {
					var obj1 = JSON.parse(response.trim());
					listarMiembros(obj1.miembros);
				}
		});
}

/*
 * Lista los nombres de los miembros del grupo
 */
function listarMiembros(miembros)
{
	$("#miembros").html("");
	for(var i=0; i< miembros.length; i++)
	{
		$("#miembros").append('<li >'+miembros[i]+'</li>');
		$("#miembros").listview('refresh');
	}
	$("#miembros").trigger("create");
}