<?php
	require_once("ShoppingList.php");
	require_once("Item.php");
	
	//decodificamos la lista que nos viene en JSON
	$newList = json_decode( $_POST['newList'] );
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	//Comprobar que nombre lista no contenga caracteres prohibidos
	$listName = $newList[0]->listName;
	if( preg_match("[<>]", $listName) ) {
		die ('El nombre de la lista contiene carácteres prohibidos');
	}
	
	//Comprobar que ningún producto contiene carácteres prohibidos
	foreach($newList[1] as $product) {
		if( preg_match("[<>]", $product->prodName) || preg_match("[<>]", $product->prodQt) ) {
			die ('Un producto contiene carácteres prohibidos');
		}
	}
	
	session_start();
	//$idGroup = $_SESSION['idGroup'] //obtenemos el id del grupo a partir de la sesión
	$idGroup = 1 ; //lo pongo a 1 mientras no pueda obtener el idGroup de la sesión
	
	//insertamos la nueva lista en la base de datos
	$list = new ShoppingList( array( 'listName' => $listName, 'idGroup' => $idGroup ) );
	$list->insert();
	
	//insertamos todos los productos iniciales para la lista anteriormente creada
	foreach($newList[1] as $product) {
		$item = new Item( array( 'idList' => $list->idList, 'itemName' => $product->prodName, 'quantity' => $product->prodQt ) );
		$item->insertItem();
	}
	
	echo 'success';
	
	
?>