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

	
	if (isset($_POST['idMember'])){
		$idMember = $_POST['idMember'];
	}else {
		die ("No has seleccionado un miembro");
	}

	//comprobamos si el usuario pertenece al grupo
	if( !Group::userBelongsToGroup($currentUser->id, $idGroup) ) {
		die ("No perteneces al grupo con id $idGroup");
	}
	//comprobamos si al usuario que se quiere eliminar pertenece al mismo grupo
	if( !Group::userBelongsToGroup($idMember, $idGroup) ) {
		die ("El miembro seleccionado no pertenece al grupo con id $idGroup");
	}
	//comprobamos si el usuario administra el grupo
	if( Group::userAdminsGroup($currentUser->id, $idGroup) ) {
		//echamos al usuario si pertenece al grupo
		Group::leaveGroup($idMember, $idGroup);
	} else {
		die ("No eres adiministrador del grupo, no puedes expular al usuario");
	}
	echo("success");
?>