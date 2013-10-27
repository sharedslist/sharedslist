<?php

	require("config.php");
	require( "User.php" );
	
	


		
		// User has posted the login form: attempt to log the user in

		if ( $user = User::getByEmailAddress( $_POST['emailAddress'] ) ) {

		  if ( $user->checkPassword( $_POST['password'] ) ) {

			// Login successful: Create a session and redirect to the to-do list
			$user->createLoginSession();
			die('Conectado correctamente');

		  } else {

			// Login failed: display an error message to the user
			die('contraseña incorrectos');
		  }

		} else {

		  // Login failed: display an error message to the user
			die('E-mail  incorrectos');
		}



	
?>


