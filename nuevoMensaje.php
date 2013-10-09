<?php ?>

<?php
	require("config.php");

	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}

	if (strlen($_POST['textoMensaje']) > 0) {
		$mensaje = $_POST['textoMensaje'];
		$sql     = "INSERT INTO mensaje VALUES (\"" . $mensaje . "\",CURRENT_TIMESTAMP)";
		mysqli_query($con, $sql);
	}

	$sql = "SELECT * FROM mensaje ORDER BY \"fechaMensaje\"";

	$result = mysqli_query($con, $sql);

	$mensajes = array();
	while ($row = mysqli_fetch_array($result)) { 
		$mensajes[] = array('cuerpo' => $row['cuerpoMensaje'], 'fecha' => $row['fechaMensaje']);
	}
	echo json_encode($mensajes);
	mysqli_close($con);
?>