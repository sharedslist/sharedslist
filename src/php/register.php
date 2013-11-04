<?php

	require("config.php");
	require( "User.php" );
	
	

	//Conectar a la base de datos
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	// Se guardan los datos en variables
    $u = $_POST['userName'];
	$e = $_POST['emailAddress'];
	$p = $_POST['password']; 
	
	//Comprobar email bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $e) ) {
		die ('Por favor, introduzca un e-mail correcto');
	}
	
	//Comprobar nombre de usuario bien formado
	if( !preg_match("^[0-9A-Za-z_]+$^", $u) ) {
		die ('Nombre de usuario incorrecto');
	}
	

	//Comprobar que el e-mail es unico
	$sqlEmail = "select count(idUser) from `User` where emailAddress='$e'";
	
	$result = mysqli_query($con, $sqlEmail);
	$row = mysqli_fetch_array($result);
	if ( $row[0] > 0 ) {
			die('Error: E-mail ya registrado');
	}
	mysqli_close($con);
	
	//Crea objeto usuario y llama a la funcion insertar
	
	$user = new User( array( 'userName' => $u, 'emailAddress' => $e, 'plaintextPassword' => $p ) );
    $user->encryptPassword();
    $user->insert();
	$user->createLoginSession();


	
	echo 'success';
	
?>


