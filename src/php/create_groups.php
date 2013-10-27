<?php
	require("Group.php");
	require("User.php");
	
	$emails = $_POST["users"];
	$group_name = $_POST["group_name"];
	
	session_start();
	$group = new Group;
	$user = new User;
	$userSession = $user->getLoggedInUser();
	$group->admin = $userSession->id;
	$group->group_name = $group_name;
	$group->insert();
	$group->insertUser($userSession->emailAddress);
	foreach($emails as $email) {
		$group->insertUser($email['name']);
	}
	?>