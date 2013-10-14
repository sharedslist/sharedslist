<?php
	require("Group.php");
	
	$group = new Group;
	$names = $group->listGroups('usuario_sesion');
	echo '{"names":'. json_encode($names) .'}'; 
	?>