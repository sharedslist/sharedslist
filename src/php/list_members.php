<?php 
require_once("config.php");
require_once("User.php");


	session_start();
	$user = new User;							// Crea un [Usuario]
	$idUser = $user->getLoggedInUser()->id; 	// Obtiene el identificador del usuario en sesión
	$idGroup = $_SESSION['idGroup']; //obtenemos el id del grupo a partir de la sesión
	

	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	//obtenemos el nombre del grupo actualmente seleccionado
	$sql = "SELECT * FROM `GroupAndUser` WHERE idGroup = ".$idGroup;
	$result = mysqli_query($con, $sql);
	$users = array ();
	while ($row = mysqli_fetch_array($result)){
		array_push ($users,$row['idUser']);
	}
	
	if (! in_array($idUser, $users)){

		die("El usuario con id ".$idUser." no pertence al grupo " .$idGroup);
	}

	//obtenemos el nombre del grupo actualmente seleccionado
	$ids = join(',',$users); 
	$sql1 = "SELECT idUser,Username FROM `User` WHERE idUser IN ($ids)";
	$result1 = mysqli_query($con, $sql1);
	$row1 = mysqli_fetch_array($result);
	$miembros = array();
	while ($row1 = mysqli_fetch_array($result1)){
		array_push($miembros, $row1['Username']);
	}
	
	$return = array('miembros' => $miembros);
	//lo codificamos en JSON y lo enviamos al usuario
	echo json_encode($return); 
?>