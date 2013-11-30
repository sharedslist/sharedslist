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
	
	//comprobamos que el usuario se ha autenticado
	$currentUser = User::getLoggedInUser();
	if( !$currentUser ) {
		die ('Necesitas autenticarte para acceder a esta funcionalidad');
	}
	//comprobamos si el usuario pertenece al grupo
	if( !Group::userBelongsToGroup($currentUser->id, $idGroup) ) {
		die ("No perteneces al grupo con id $idGroup");
	}
	//comprobamos si el usuario administra el grupo
	if( Group::userAdminsGroup($currentUser->id, $idGroup) ) {
		//borramos el grupo si el usuario lo administra
		Group::deleteGroup($currentUser->id, $idGroup);
	} else {
		//si el usuario no es administrador del grupo, procedemos al abandono del grupo
		Group::leaveGroup($currentUser->id, $idGroup);
	}
	echo("success");
?>
