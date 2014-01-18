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
<<<<<<< HEAD
	if( isset($_POST['quantityBought']) ) {
		$quantityBought = $_POST["quantityBought"]; //obtenemos la cantidad comprada del item a partir de la variable POST
=======
	if( isset($_POST['metric']) ) {
		$metric = $_POST["metric"]; //obtenemos la unidad metrica del item a partir de la variable POST
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
	$item->itemName = $itemName;
<<<<<<< HEAD
	$itemComprado = ($quantity == $quantityBought);
	if($itemComprado){
		$item->itemState = true;
	}
	else{
		$item->itemState = false;
	}
	$item->quantity = $quantity;
	$item->quantityBought = $quantityBought;
	$item->editItem();
	if($itemComprado){
		//comprobamos si el item que se acaba de marcar como comprado 
		//fue el último que faltaba por comprar en la lista
		if( ShoppingList::isCompleted($idList) ) {
			//cerramos la lista
			ShoppingList::closeList($idList);
			//informamos de que se ha cerrado la lista de compra
			echo "closed";
		}
	}
=======
	$item->quantity = $quantity;
	$item->metric = $metric;
	$item->editItem();
>>>>>>> origin/develop
?>
