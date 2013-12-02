<?php
	require_once("Item.php");
	require_once("User.php");
	
	session_start();
	if ( isset($_POST['idList']) ) {
		$idList = $_POST['idList']; //obtenemos el id de la lista a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado una lista');
	}
	if( isset($_POST['idItem']) ) {
		$idItem = $_POST["idItem"]; //obtenemos el id del item a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST["itemName"]) ) {
		$itemName = $_POST["itemName"]; //obtenemos el nombre del item a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST['quantity']) ) {
		$quantity = $_POST["quantity"]; //obtenemos la cantidad del item a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un item');
	}
	if( isset($_POST['quantityBought']) ) {
		$quantityBought = $_POST["quantityBought"]; //obtenemos la cantidad comprada del item a partir de la variable POST
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
	if($quantity == $quantityBought){
		$item->itemState = true;
	}
	else{
		$item->itemState = false;
	}
	$item->quantity = $quantity;
	$item->quantityBought = $quantityBought;
	$item->editItem();
?>
