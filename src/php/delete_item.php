<?php
	require_once("Item.php");
	require_once("User.php");
	
	session_start();
<<<<<<< HEAD
	if ( isset($_POST['idList']) ) {
		$idList = $_POST['idList']; //obtenemos el id de la lista a partir de la variable POST
=======
	if ( isset($_SESSION['idList']) ) {
		$idList = $_SESSION['idList']; //obtenemos el id de la lista a partir de la variable SESSION
>>>>>>> origin/develop
	}
	else {
		die ('No se ha seleccionado una lista');
	}
<<<<<<< HEAD
	if( isset($_POST['idItem']) ) {
		$idItem = $_POST["idItem"]; //obtenemos el id del item a partir de la variable POST
=======
	if( isset($_SESSION['idItem']) ) {
		$idItem = $_SESSION["idItem"]; //obtenemos el id del item a partir de la variable SESSION
>>>>>>> origin/develop
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
	$item->deleteItem();

?>
