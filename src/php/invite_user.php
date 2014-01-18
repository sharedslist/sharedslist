<?php
	require_once("config.php");

	session_start();
	if (isset($_POST['email']) and isset ($_SESSION['idGroup'])){
		$email = $_POST['email'];
		$idGroup = $_SESSION['idGroup'];
	}else {
		die ("No está asignado el email o el grupo no está seleccionado.");
	}
		// aqui tengo que insertar en la bd.
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	
	//Comprobamos si ya se ha invitado al email
	$sql = "SELECT (idInvitation) FROM `Invitation` WHERE email = '$email' AND idGroup = '".$idGroup."'";
	$result = mysqli_query($con, $sql);
	
	$name=mysqli_fetch_row($result);
	//obtenemos el nombre del grupo actualmente seleccionado
	
	if ($name) {
		//Está invtado el usuario, por lo tanto actualizamos la fecha de caducidad.
		$sql = "UPDATE `Invitation` SET expireDate = NOW() + INTERVAL 7 DAY WHERE idInvitation = $name[0]";
		$result = mysqli_query($con, $sql);
		 printf("Errormessage: %s\n", mysqli_error($con));
	}else {
		// no está invitado, añadimos a la bd que lo invitamos.
		$sql = "INSERT INTO `Invitation` (email,expireDate,idGroup) VALUES ('$email',NOW() + INTERVAL 7 DAY,$idGroup)";
		$result = mysqli_query($con, $sql);
	}
	//Obtenemos el id de la invitacion y la enviamos por correo.
	$sql = "SELECT (idInvitation) FROM `Invitation` WHERE email= '$email' AND idGroup = '".$idGroup."'";
	$result = mysqli_query($con, $sql);
	$name=mysqli_fetch_row($result);
	$idInvitation = $name[0];
	//invitar por email.
	mysqli_close($con);
	$headers = "From: noreply@sharedslist.hol.es";
	$to = $email;
	$subject = "Invitación a Shared Shopping List";
	$message = "Buenos días, ";
	$message = $message."has sido invitado a Shared Shopping List.\nPara aceptar la invitación haga click en el siguiente enlace(si no funciona copialo y pegalo en tu navegador)\n\n";
	$message = $message."http://sharedslist.hol.es/register.html?idinvitation=".$idInvitation."&email=".urlencode($email)."\n\n";
	$message = $message."Recuerda que la invitación caduca en 7 días.\n\nUn saludo,\nel equipo de Shared Shopping List.";
	$enviado = mail($to,$subject,$message,$headers) or die("No se puede conectar al servidor de correo");
	
	echo "succes";

?>