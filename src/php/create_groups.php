<?php
	require_once("Group.php");
	require_once("User.php");

    $group_name = $_POST["group_name"];				// Desempaqueta el nombre del grupo
	
	//Comprobar que el nombre del grupo está bien formado
	if( !preg_match("^[0-9A-Za-z_]+$^", $group_name) ) {
		die ('Nombre de grupo incorrecto');
	}
	
	if (isset($_POST["users"])) {
		$emails = $_POST["users"];						// Desempaqueta la lista de correos electrónicos	
	} else {
		$emails = "";
	}
	session_start(); 								// Inicia o reinicia la sesión
	$group = new Group;								// Crea un [Grupo]
	$user = new User;								// Crea un [Usuario]
	$userSession = $user->getLoggedInUser();		// Devuelve el [Usuario] en sesión
	$group->admin = $userSession->id;				// El atributo admin de [Grupo] toma el valor del identificador de $userSession
	$group->group_name = $group_name;				// El atributo group_name de [Grupo] toma el valor de $group_name
	$group->insert();								// Inserta en la BD el [Grupo]
	$group->insertUser($userSession->emailAddress); // Insserta en la BD al administrador como miembro de [Grupo]
	if($emails != ""){
		foreach($emails as $email) {					// Para cada correo recibido introduce al [Usuario] de este como miembro de [Grupo]
			//Comprobar que el email está bien formado
			if(preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $email['email']) ) {
				$group->insertUser($email['email']);
			}
		}
	}
	echo("success");
	?>