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
?>
<ul data-role="listview" data-theme="d" data-divider-theme="d"
	class="ui-listview">
	<li data-role="list-divider" role="heading"
		class="ui-li ui-li-divider ui-bar-d ui-li-has-count">
		Lista de los mensajes
			<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">
			<?php echo $result->num_rows; ?></span>
	</li>
<?php while ($row = mysqli_fetch_array($result)) { ?>
<li data-corners="false" data-shadow="false" data-iconshadow="true"
	data-wrapperels="div" data-icon="arrow-r" data-iconpos="right"
	data-theme="d"
	class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d">
	<div class="ui-btn-inner ui-li">
		<div class="ui-btn-text">
			<a href="#" class="ui-link-inherit">
				<p class="ui-li-aside ui-li-desc">
					<strong> <?php echo date($row['fechaMensaje']); ?></strong>
				</p>
				<p class="ui-li-desc">
					<?php echo $row['cuerpoMensaje']; ?>
				</p>
			</a>
		</div>
		<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>
	</div>
</li>
<?php } ?>
<?php mysqli_close($con); ?>