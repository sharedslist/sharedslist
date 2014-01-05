<?php

	require_once("config.php");
	require_once( "User.php" );
		

	//Se comprueba que el email esté bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $_POST['loginEmail']) ) {
		die ('Por favor, introduzca un e-mail correcto');
	}
		
	// Recupera el objeto usuario con el email pasado.
	if ( $user = User::getByEmailAddress( $_POST['loginEmail'] ) ) {

		//Comprueba que la contraseña es correcta
		if ( $user->checkPassword( $_POST['loginPassword'] ) ) {

		// Login exitoso: Crea la sesión y redirige a la pantalla de grupos.
		$user->createLoginSession();
			die('Conectado correctamente');

		} 
		  
	}

	//Login ha fallado, se muestra mensaje al usuario.
	echo 'Contraseña o E-mail  incorrecto.';
	
?>


