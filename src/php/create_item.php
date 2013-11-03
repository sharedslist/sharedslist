<?php
	require("Item.php");

	$itemName = $_POST["itemName"];
	$quantity = $_POST["quantity"];
	
	session_start();
	$item = new Item;
//$item->idList = getListId();
	$item->idList = 1;
	$item->itemName = $itemName;
	$item->itemState = false;
	$item->quantity = $quantity;
	$item->quantityBought = 0;
	$item->insertItem();
?>
