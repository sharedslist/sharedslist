<?php
	require("Item.php");
	
	$idItem = $_POST["idItem"];
	
	$item = new Item;
	$item->idItem = $idItem;
	$item->deleteItem();
?>
