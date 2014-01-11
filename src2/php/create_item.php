<?php
	require_once("Item.php");
	require_once("User.php");
	require_once("ShoppingList.php");

	session_start();
	if( isset($_POST['idList']) ) {
		$idList = $_POST["idList"]; //obtenemos el id del item a partir de la variable SESSION
	}
	else {
		//die ('No se ha seleccionado un item');
	}
	if( isset($_POST["itemName"]) ) {
		$itemName = $_POST["itemName"]; //obtenemos el nombre del item a partir de la variable SESSION
	}
	else {
		//die ('No se ha seleccionado un item');
	}
	if( isset($_POST['quantity']) ) {
		$quantity = $_POST["quantity"]; //obtenemos la cantidad del item a partir de la variable SESSION
	}
	else {
		//die ('No se ha seleccionado un item');
	}
	if( isset($_POST['metric']) ) {
		$metric = $_POST["metric"]; //obtenemos la cantidad del item a partir de la variable SESSION
	}
	else {
		//die ('No se ha seleccionado un item');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo en cuya lista se encuentra el item eliminar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !ShoppingList::userBelongsToGroupOfList($currentUser->id,$idList) ) {
		die ("No perteneces al grupo de la lista con id $idList!");
	}
	
	$item = new Item;
	$item->idList = $idList;
	$item->itemName = $itemName;
	$item->itemState = false;
	$item->quantity = $quantity;
	$item->quantityBought = 0;
	$item->metric = $metric;
	$item->insertItem();
?>
