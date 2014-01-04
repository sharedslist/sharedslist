<?php
	require_once("config.php");

	/**
	 * Buscamos todos los emails pasados en la peticoin en la base de datos.
	 * Los que no están se devuelven ya que no están registrados.
	 */
	$parameters = $_POST['users'];
	$emails = array();

	 foreach ($parameters as $correo) {
    	array_push($emails, $correo['email']);
    }

	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	$sql = 'SELECT emailAddress FROM `User` WHERE  emailAddress IN (' . implode(',', array_map('intval', $emails)) . ')';
	$rows = mysqli_query($con, $sql);
	//borramos todos los emailes registados.
	while ($row=mysqli_fetch_row($rows)){
		$emailbd = $row[0];
		if (($key = array_search($emailbd, $emails)) !== false) {
		   	unset($emails[$key]);
		}
		
	}
	echo json_encode(array_values($emails));
?>