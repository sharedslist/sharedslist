<?php
	require_once("Item.php");
	require_once("User.php");
	require_once("ShoppingList.php");
	
	session_start();
	if ( isset($_SESSION['idList']) ) {
		$idList = $_SESSION['idList']; //obtenemos el id de la lista a partir de la variable SESSION
	}
	else {
		die ('No se ha seleccionado una lista');
	}
	//comprobamos que el usuario se ha autenticado y pertenece al grupo cuya lista quiere listar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !ShoppingList::userBelongsToGroupOfList($currentUser->id,$idList) ) {
		die ("No perteneces al grupo de la lista cuyos productos quieres listar");
	}

	// obtenemos el nombre de la lista (listName) y sus items (items)
	$listAndItems = Item::listItems($idList);
	// lo codificamos en JSON y lo enviamos al usuario
	echo json_encode($listAndItems);
?>