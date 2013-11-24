<?php
	require_once("Group.php");
	require_once("User.php");
	
	session_start();
	if( isset($_SESSION['idGroup']) ) {
		$idGroup = $_SESSION["idGroup"]; //obtenemos el id del item a partir de la variable POST
	}
	else {
		die ('No se ha seleccionado un grupo');
	}
	
	//comprobamos que el usuario se ha autenticado y pertenece al grupo en cuya lista se encuentra el item eliminar
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	if( !Group::userAdminsGroup($currentUser->id, $idGroup)) {
		die ("No aministras el grupo con id $idGroup");
	}
	Group::deleteGroup($currentUser->id, $idGroup);
	echo("success");
?>
