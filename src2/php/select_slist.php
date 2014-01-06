<?php
	require_once("ShoppingList.php");

	$idList = $_POST["idList"];
	ShoppingList::createSListSession($idList);

?>