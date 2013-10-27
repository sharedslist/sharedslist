<?php
	REQUIRE ("config.php");
	require( "User.php" );
	
	
	$e = isset( $_POST['emailAddress'] ) ? $_POST['emailAddress'] : "b";

	//Comprobar mail bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $e) ) {
		die ('Por favor, introduzca un e-mail correcto');
	}
	
	$user = User::getByEmailAddress($e);
	$user -> generatePassword();
	$enviado = ($user -> sendPassword());
	
	if (!$enviado){
		die ("No se ha podido enviar la nueva contrase�a.\n\t Por favor intentelo de nuevo.");
	}
	$user -> encryptPassword();
	$user -> updatePassword();
	
	echo 'success';
	
?>