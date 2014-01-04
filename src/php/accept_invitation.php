<?php
	require_once("config.php");
	require_once("Group.php");
	require_once("User.php");

	//Conectar a la base de datos
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	// Se guardan los datos en variables
    $u = $_POST['userName'];
	$e = $_POST['emailAddress'];
	$p = $_POST['password']; 
	$id= $_POST['idinvitation'];

	
	//Comprobar email bien formado
	if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", $e) ) {
		die ('Por favor, introduzca un e-mail correcto'.$e);
	}
	
	//Comprobar nombre de usuario bien formado
	if( !preg_match("/^[0-9A-Za-z_]+$/", $u) ) {
		die ('Nombre de usuario incorrecto');
	}

	//Comprobar contraseña no vacía
	if($p == ''){
		die('Contraseña vacía');
	}

	if ($id == '') {
		die ('Ha ocurrido un error con su invitación. Por favor intentelo de nuevo.');
	} 

	//Comprobar que el e-mail es unico
	$sqlEmail = "select count(idUser) from `User` where emailAddress='$e'";
	
	$result = mysqli_query($con, $sqlEmail);
	$row = mysqli_fetch_array($result);
	if ( $row[0] > 0 ) {
			die('Error: E-mail ya registrado');
	}

	//Comprobar que el e-mail es unico
	$sqlEmail = "SELECT (idGroup) FROM `Invitation` WHERE email='$e' AND idInvitation = $id AND expireDate > NOW()";
	$result = mysqli_query($con, $sqlEmail);
	 $count=mysqli_num_rows($result);
	$row = mysqli_fetch_array($result);
	
	if ( $count == 0 ) {
			die('No se encuentra su invitación o ha caducado, por favor solicite otra o puede registrarse.');
	}

	$idGroup = $row[0];

	mysqli_close($con);
	
	//Crea objeto usuario y llama a la funcion insertar
	
	$user = new User( array( 'userName' => $u, 'emailAddress' => $e, 'plaintextPassword' => $p ) );
    $user->encryptPassword();
    $user->insert();
	$user->createLoginSession();

	$grupo = new Group;
	$grupo->id=$idGroup;
	$grupo->insertUser($e);
	
	echo 'success';

?>