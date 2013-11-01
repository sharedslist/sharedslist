<?php
	require_once("ShoppingList.php");
	require_once("User.php");
	
	session_start();
	//$idGroup = $_SESSION['idGroup'] //obtenemos el id del grupo a partir de la sesión
	$idGroup = 1 ; //lo pongo a 1 mientras no pueda obtener el idGroup de la sesión
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	//obtenemos el nombre del grupo actualmente seleccionado
	$sql = "SELECT * FROM `Group` WHERE idGroup = $idGroup";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result);
	$groupName = $row['groupName'];
	
	
	//obtenemos las listas de compra del grupo actualmente seleccionado
	$lists = ShoppingList::listSLists($idGroup);
	//juntamos el nombre del grupo y sus listas de compra en un array
	$groupAndSLists = array( 'groupName' => $groupName, 'slists' => $lists);
	//lo codificamos en JSON y lo enviamos al usuario
	echo json_encode($groupAndSLists); 
	?>