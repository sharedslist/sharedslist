<?php
	require_once("Group.php");

	$idGroup = $_POST["idGroup"];
	
	$group = new Group;	
	$group->id = $idGroup;
	$group->createGroupSession();

	?>