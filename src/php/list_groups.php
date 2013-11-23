<?php
	require_once("Group.php");
	require_once("User.php");
	
	session_start(); 							// Inicia o reinicia la sesión
	$group = new Group;							// Crean un [Grupo]
	$user = new User;							// Crea un [Usuario]
	$user_id = $user->getLoggedInUser()->id; 	// Obtiene el identificador del usuario en sesión
	$groups = $group->listGroups($user_id); 		// Devuelve una lista con los nombres de los grupos a los que pertenece $user_id
	echo json_encode($groups);  // Empaqueta la respuesta
	?>