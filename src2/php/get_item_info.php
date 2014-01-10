<?php
	require_once("Item.php");
	require_once("User.php");
	
	session_start();
	if ( isset($_SESSION['idList']) ) {
		$idList = $_SESSION['idList']; //obtenemos el id de la lista a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado una lista');
	}
	if ( isset($_SESSION['idItem']) ) {
		$idItem = $_SESSION['idItem']; //obtenemos el id del item a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un item');
	}
	//comprobamos que el usuario se ha autenticado y pertenece al grupo cuya lista quiere listar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !Item::userBelongsToGroupOfItemList($currentUser->id,$idList,$idItem) ) {
		die ("No perteneces al grupo de la lista cuyo item quieres editar");
	}

	// obtenemos los datos del item (item)
	$item = Item::getItemById($idItem);
	// lo codificamos en JSON y lo enviamos al usuario4
	echo json_encode($item);
?>