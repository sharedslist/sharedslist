<?php

	require_once("config.php");
	require_once( "User.php" );
	session_start();

	// Se recupera el usuario actual
	$user = User::getLoggedInUser();
	//Se invoca a la función de cerrar
	$user->destroyLoginSession();

	echo 'The user has been logged out';
	
?>


