<?php 
	require_once("config.php");
	require_once("Group.php");
	if (isset($_POST['users'])){
	   $miembros = $_POST['users'];
    } else {
        die("No se han seleccionado los miembros a añadir.");
    }
	session_start();
	$user_id = $_SESSION['userId'];
	$group_id = $_SESSION['idGroup'];

    if (!Group::userBelongsToGroup($user_id, $group_id)){
    	die("El usuario ".$user_id."no pertenece al grupo".$group_id);
    }

    $grupo = new Group;
    $grupo->id = $group_id;
    $grupo->admin = $user_id;
   
    foreach ($miembros as $correo) {
    	$grupo->insertUser($correo['email']);
    }

    echo("success");

?>