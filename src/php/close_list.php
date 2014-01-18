<?php
	require_once("User.php");
	require_once("ShoppingList.php");
	
	session_start();
	if ( isset($_POST['idList']) ) {
		$idList = $_POST['idList']; //obtenemos el id de la lista a partir de la variable POST
	}
	else {
<<<<<<< HEAD
		//die ('No se ha seleccionado una lista');
=======
		if ( isset($_SESSION['idList']) ) {
			$idList = $_SESSION['idList']; //obtenemos el id de la lista a partir de la variable SESSION
		}
		else {
			//die ('No se ha seleccionado una lista');
		}
>>>>>>> origin/develop
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo cuya lista quiere listar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !ShoppingList::userBelongsToGroupOfList($currentUser->id,$idList) ) {
		die ("No perteneces al grupo de la lista!");
	}
	
	// cerramos la lista con identificador idList
	ShoppingList::closeList($idList);
?>
