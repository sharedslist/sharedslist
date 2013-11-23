<?php
	require_once("Item.php");
	//require_once("User.php");
	require_once("config.php");
	
	session_start();
	$idList = $_POST['idList'] //obtenemos el id del grupo a partir de la sesión
	//$idList = 15 ; //lo pongo a 10 mientras no pueda obtener el idList de la sesión
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	//obtenemos el nombre del grupo actualmente seleccionado
	$sql = "SELECT * FROM `ShoppingList` WHERE idList = ".$idList;
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result);
	$listName = $row['listName'];
	
	
	//obtenemos las listas de compra del grupo actualmente seleccionado
	$items = Item::listItems($idList);
	//juntamos el nombre del grupo y sus listas de compra en un array
	$listAndItems = array( 'listName' => $listName, 'items' => $items);
	//lo codificamos en JSON y lo enviamos al usuario
	echo json_encode($listAndItems); 
	?>