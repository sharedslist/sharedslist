<?php
	require("Group.php");
	require("User.php");
	
	$group = new Group;
	$user = new User;
	$user_id = $user->getLoggedInUser()->id;
	$names = $group->listGroups($user_id);
	echo '{"names":'. json_encode($names) .'}'; 
	?>