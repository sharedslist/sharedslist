<?php
	require_once("User.php");
	
	session_start(); 						 // Inicia o reinicia la sesión
	$user = new User;						 // Crea un [Usuario]
	$userSession = $user->getLoggedInUser(); // Devuelve el usuario en sesión
	if($userSession == false){				 // Si $userSession es igual a falso no hay un usuario en sesión 
		echo "Error: no login";				 // Informa del error
	}	
	?>