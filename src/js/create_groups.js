var id = 1;

function addUsers()
{
	var txt = $("#text-2");
	var val = txt.val();
	if(val != ""){
		$("#check2").append('<input type="checkbox" checked id="cb'+id+'"/><label id="cb'+id+'"for="cb'+id+'">'+val+'</label>');
		$("#check").trigger("create");
		id = id +1;
		$("#text-2").val("");
	}
}

function createGroup()
{
	var users = new Array();
	var group_name = $("#text-1").val();
	var n = $('form#createform').find('input:checked');
	var name;
	for(var i=1; i< n.length+1; i++)
	{	
		name = $("#"+n[i-1].id).next("label").text();
		users[i-1] = {'name' : $.trim(name)};
	}
	var parameters = { "users" : users, "group_name" : group_name};
	$.ajax({
		data:  parameters,
		url:   document.URL+'/../php/create_groups.php',
		dataType: 'text',
		type:  'post',
		success:  function (response)
			   {location.reload(true);}
		});
}
