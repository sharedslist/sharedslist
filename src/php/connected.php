<?php
	require("User.php");
	
	session_start();
	$user = new User;
	$userSession = $user->getLoggedInUser();
	if($userSession == false){
		echo "Error: no login";
	}	
	?>