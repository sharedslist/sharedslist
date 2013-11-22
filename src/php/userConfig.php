<?php

	require("config.php");
	require( "User.php" );
	
	
	if ( isset( $_POST['getUser']) ) {
		$user = User::getLoggedInUser();
		die ($user->userName);
	}
	
	echo 'Unknown';
	
?>


