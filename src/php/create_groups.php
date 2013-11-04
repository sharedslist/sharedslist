<?php
	require("Group.php");
	require("User.php");
	
	$emails = $_POST["users"];						// Desempaqueta la lista de correos electrónicos
	$group_name = $_POST["group_name"];				// Desempaqueta el nombre del grupo
	
	session_start(); 								// Inicia o reinicia la sesión
	$group = new Group;								// Crea un [Grupo]
	$user = new User;								// Crea un [Usuario]
	$userSession = $user->getLoggedInUser();		// Devuelve el [Usuario] en sesión
	$group->admin = $userSession->id;				// El atributo admin de [Grupo] toma el valor del identificador de $userSession
	$group->group_name = $group_name;				// El atributo group_name de [Grupo] toma el valor de $group_name
	$group->insert();								// Inserta en la BD el [Grupo]
	$group->insertUser($userSession->emailAddress); // Insserta en la BD al administrador como miembro de [Grupo]
	foreach($emails as $email) {					// Para cada correo recibido introduce al [Usuario] de este como miembro de [Grupo]
		$group->insertUser($email['name']);
	}
	?>