<?php

	require("config.php");
	require( "User.php" );
	
	
    //LOG por si se quiere logear algo
		//$myFile = "log.txt";
		//$fh = fopen($myFile, 'w') or die("can't open file");
		//fwrite($fh, $sqlEmail);
		//fclose($fh);
	//fin log
	
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
    $u = isset( $_POST['userName'] ) ? $_POST['userName'] : "a";
	$e = isset( $_POST['emailAddress'] ) ? $_POST['emailAddress'] : "b";
	$p = isset( $_POST['password'] ) ? $_POST['password'] : "c";
	
	//Comprobar mail bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $e) ) {
		die ('Por favor, introduzca un e-mail correcto');
	}

	//Comprobar que el e-mail es �nico
	$sqlEmail = "select count(idUser) from user where emailAddress='$e'";
	
	$result = mysqli_query($con, $sqlEmail);
	$row = mysqli_fetch_array($result);
	if ( $row[0] > 0 ) {
			die('Error: E-mail ya registrado');
	}
	mysqli_close($con);
	
	//Crea objeto usuario y llama a la funci�n insertar
	
	$user = new User( array( 'userName' => $u, 'emailAddress' => $e, 'plaintextPassword' => $p ) );
    $user->encryptPassword();
    $user->insert();
	$user->createLoginSession();


	
	echo 'success';
	
?>


