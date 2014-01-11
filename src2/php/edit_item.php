<?php
	require_once("Item.php");
	require_once("User.php");
	
	session_start();
	if ( isset($_SESSION['idList']) ) {
		$idList = $_SESSION['idList']; //obtenemos el id de la lista a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado una lista');
	}
	if( isset($_SESSION['idItem']) ) {
		$idItem = $_SESSION["idItem"]; //obtenemos el id del item a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST["itemName"]) ) {
		$itemName = $_POST["itemName"]; //obtenemos el nombre del item a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST['quantity']) ) {
		$quantity = $_POST["quantity"]; //obtenemos la cantidad del item a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST['metric']) ) {
		$metric = $_POST["metric"]; //obtenemos la unidad metrica del item a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado un item');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo en cuya lista se encuentra el item eliminar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !Item::userBelongsToGroupOfItemList($currentUser->id, $idList, $idItem) ) {
		die ("No perteneces al grupo de la lista cuyo item quieres editar");
	}
	
	$item = new Item;
	$item->idItem = $idItem;
	$item->itemName = $itemName;
	$item->quantity = $quantity;
	$item->metric = $metric;
	$item->editItem();
?>
