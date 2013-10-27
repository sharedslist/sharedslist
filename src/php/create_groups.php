<?php
	require("Group.php");
	require("User.php");
	
	$emails = $_POST["users"];
	$group_name = $_POST["group_name"];
	
	$group = new Group;
	$user = new User;
	$uSesion = $user->getLoggedInUser();
	$group->admin = $uSesion->id;
	$group->group_name = $group_name;
	$group->insert();
	$group->insertUser($uSesion->emailAddress);
	foreach($emails as $email) {
		$group->insertUser($email['name']);
	}
	?>