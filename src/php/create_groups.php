<?php
	require("Group.php");
	
	$users = $_POST["users"];
	$group_name = $_POST["group_name"];
	
	$group = new Group;
	$group->admin = "usuario_sesion";
	$group->group_name = $group_name;
	$group->insert();
	$group->insertUser($group->admin);
	foreach($users as $user) {
		$group->insertUser($user['name']);
	}
	?>