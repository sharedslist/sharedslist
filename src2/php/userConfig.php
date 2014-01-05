<?php

	require_once("config.php");
	require_once( "User.php" );
	session_start();

	// Se recupera el usuario actual
	$user = User::getLoggedInUser();
	
	// En caso de que llame la función getName, devuelve el nombre
	if ( isset( $_POST['getUser']) ) {
		$name = $user->userName;
		if($name !== ''){
			die ( $user->userName);
		}
		else {
			die ( 'Sin nombre');
		}
	}

	//En caso de que llame la función updateProfile, actualiza el perfil,
	// cambiando nombre de usuario y contraseña. Si un campo esta vacío no se cambia.
	else {
		$newName = $_POST['userName'];
		$newPassword = $_POST['newPassword'];
		$currentPassword = $_POST['currentPassword'];

		// Se comprueba que la contraseña actual sea correcta para poder continuar.
		if ( $user->checkPassword( $currentPassword ) ) {
			
			//Se comprueba si se quiere actualizar el nombre de usuario y se actualiza de ser así
			if($newName !== ''){ //comprueba que no este vacío

				//Comprobar nombre de usuario bien formado
				if( !preg_match("/^[0-9A-Za-z_]+$/", $newName) ) {
					die ('Nombre de usuario incorrecto');
				}

				$user->userName = $newName;
				$user->updateUserName();
			}

			//Se comprueba si se tiene que actualizar la contraseña y se actualiza de ser así
			if($newPassword !== ''){ //comprueba que no este vacía
				$user -> plaintextPassword = $newPassword; //cambia la contraseña en texto plano en el objeto user
				$user -> encryptPassword(); //cifra la contraseña y la guarda en el objeto user
				$user -> updatePassword(); // almacena los cambios en la base de datos

			}

			//se informa al usuario si ha habido actualización
			if($newName !== '' OR $newPassword !== ''){ 
				die('Perfil actualizado');
			}
			else {
				die('No se ha actualizado');
			}
		} 

		else {
			//La contraseña es incorrecta, se para la ejecución informando al usuario.
			die ('Contraseña incorrecta');
		}

	}
	
	echo 'Unknown';
	
?>


