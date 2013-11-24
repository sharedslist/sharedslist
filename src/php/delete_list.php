<?php
	require_once("User.php");
	require_once("ShoppingList.php");
	
	if ( isset($_POST['idList']) ) {
		$idList = $_POST['idList']; //obtenemos el id de la lista a partir de la variable POST
	}
	else {
		//die ('No se ha seleccionado una lista');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo cuya lista quiere eliminar
	session_start();
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !ShoppingList::userBelongsToGroupOfList($currentUser->id,$idList) ) {
		die ("No perteneces al grupo de la lista con id $idList!");
	}
	
	// eliminamos la lista con identificador idList
	ShoppingList::deleteList($idList);
	//indicamos que la operación ha finalizado con éxito
	echo 'success';
?>