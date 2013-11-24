<?php
	require_once("Item.php");
	require_once("User.php");
	require_once("ShoppingList.php");
	
	session_start();
	if( isset($_POST['idItem']) ) {
		$idItem = $_POST["idItem"]; //obtenemos el id del item a partir de la variable POST
	}
	else {
		//die ('No se ha seleccionado un item');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo en cuya lista se encuentra el item eliminar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	$item = Item::getItemById($idItem);
	if( !ShoppingList::userBelongsToGroupOfList($currentUser->id,$item->idList) ) {
		die ("No perteneces al grupo de la lista con id $idList!");
	}

	$item->deleteItem();
?>
