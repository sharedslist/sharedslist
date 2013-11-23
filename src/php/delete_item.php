<?php
	require_once("Item.php");
	
	$idItem = $_POST["idItem"];
	
	$item = new Item;
	$item->idItem = $idItem;
	$item->deleteItem();
?>
