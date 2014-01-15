<?php
	require_once("ShoppingList.php");
	require_once("Item.php");
	require_once("Group.php");
	require_once("User.php");
	
	//decodificamos la lista que nos viene en JSON
	$newList = json_decode( $_POST['newList'] );
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('No se ha podido conectar: ' . mysqli_error($con));
	}
	
	//Comprobar que nombre lista no contenga caracteres prohibidos
	$listName = mysqli_real_escape_string($con,$newList[0]->listName);
	if(!preg_match("/^[0-9A-Za-z_\s]+$/", $listName) OR trim($listName) == "") {
		die ('El nombre de lista incorrecto');
	}
	
	//Comprobar si los productos contienen carácteres prohibidos
	foreach($newList[1] as $product) {
		$prodName = $product->prodName;
		$prodQt = $product->prodQt;
		if( !preg_match('/<.*?>/msi', $prodName) AND !preg_match('/<.*?>/msi', $prodQt) ) {
			$prodName = $product->prodName;
			$prodQt = $product->prodQt;
		}
		else{
			// Se elimina el elemento que contiene carácteres prohibidos
			unset($newList[$product]);
		}
	}
	
	session_start();
	$idGroup;
	if( isset($_SESSION['idGroup']) ) {
		$idGroup = $_SESSION['idGroup']; //obtenemos el id del grupo a partir de la sesión
	}
	else if ( isset($_POST['idGroup']) ) {
		$idGroup = $_POST['idGroup']; //obtenemos el id del grupo a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un grupo');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo cuyas listas quiere listar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !Group::userBelongsToGroup($currentUser->id, $idGroup) ) {
		die ("No perteneces al grupo con id $idGroup!");
	}
	
	//insertamos la nueva lista en la base de datos
	$list = new ShoppingList( array( 'listName' => $listName, 'idGroup' => $idGroup ) );
	$list->insert();
	
	//insertamos todos los productos iniciales para la lista anteriormente creada
	foreach($newList[1] as $product) {
		$item = new Item( array( 'idList' => $list->idList, 'itemName' => $product->prodName, 'quantity' => $product->prodQt, 'metric' => 'u' ) );
		$item->insertItem();
	}
	
	echo 'success';
	
	
?>
