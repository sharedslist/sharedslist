<?php
	require_once("Item.php");

	$idItem = $_POST["idItem"];
	Item::createItemSession($idItem);

?>