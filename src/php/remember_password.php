<?php
	require_once("config.php");
	require_once( "User.php" );
	
	
	$e = isset( $_POST['emailAddress'] ) ? $_POST['emailAddress'] : "b";

	//Comprobar mail bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $e) ) {
		die ('Por favor, introduzca un e-mail correcto');
	}
	
	$user = User::getByEmailAddress($e);
	if ( $user== FALSE){
		die ("No existe un usuario con el e-mail indicado");
	}
	$user -> generatePassword();
	$enviado = ($user -> sendPassword());
	
	if (!$enviado){
		die ("No se ha podido enviar la nueva contraseña.\n\t Por favor intentelo de nuevo.");
	}
	$user -> encryptPassword();
	$user -> updatePassword();
	
	echo 'success';
	
?>