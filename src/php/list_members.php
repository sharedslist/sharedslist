<?php 
require_once("config.php");
require_once("User.php");
require_once("Group.php");


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
	
	// Si el usuario no pertenece al grupo no se muestran los miembros.
	if (! in_array($idUser, $users)){
		die("El usuario con id ".$idUser." no pertence al grupo " .$idGroup);
	}

	//Selecciona los nombres de usuarios a mostrar.
	$idusers = join(',',$users); 
	$sql1 = "SELECT idUser,Username FROM `User` WHERE idUser IN ($idusers)";
	$result1 = mysqli_query($con, $sql1);
	$row1 = mysqli_fetch_array($result);
	$miembros = array();
	$ids = array();
	while ($row1 = mysqli_fetch_array($result1)){
		array_push($miembros, $row1['Username']);
		array_push($ids, $row1['idUser']);
	}
	$admin = Group::userAdminsGroup($idUser, $idGroup);
	
$return = array('ids' => $ids,'miembros' => $miembros, 'admin' => $admin);
	//lo codificamos en JSON y lo enviamos al usuario
	echo json_encode($return); 
?>