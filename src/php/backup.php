<?php

require_once ("includes/config.php");
require_once ("includes/DropboxClient.php");

$timeToDoBackup = FALSE;
$lastBackupLogExists = FALSE;

if (file_exists ( HOME . "/../TEMP/LastBackup.txt" )) {
	$lastBackupLogExists = TRUE;
	$time_24h_ago = time () - (60 * 60 * 24);
	$timeLastBackup = date ( 'Y-m-d H:i:s', strtotime ( file_get_contents ( HOME . "/../TEMP/LastBackup.txt" ) ) );
	if ($time_24h_ago >= strtotime ( $timeLastBackup )) {
		$timeToDoBackup = TRUE;
	} else
		echo "No han pasado 24h desde el anterior Backup!<br/>";
}
if ($timeToDoBackup || ! $lastBackupLogExists) {
	$backupFilesName = "SharedSList_backup_files-" . date ( "Y.m.d" ) . '.zip';
	$backupsPath = HOME . "/../TEMP/backups/";
	$backupFiles = $backupsPath . $backupFilesName;
	$backupDBName = "SharedSList_backup_DB-" . date ( "Y.m.d" ) . '.sql';
	$backupDB = $backupsPath . $backupDBName;
	Zip ( HOME, $backupFiles ); // comprimimos la carpeta public_html
	backupDB ( $backupDB ); // hacemos el backup de la BBDD
	Zip ( $backupDB, $backupDB . ".zip" ); // comprimimos el backup de la BBDD
	
	$dropbox = new DropboxClient ( array (
			'app_key' => DBOX_KEY,
			'app_secret' => DBOX_SECRET,
			'app_full_access' => false 
	), 'en' );
	
	// intentamos recuperar el token de acceso
	$access_token = load_token ( "access" );
	if (! empty ( $access_token )) {
		$dropbox->SetAccessToken ( $access_token );
	} elseif (! empty ( $_GET ['auth_callback'] )) 	// si estamos volviendo de la página de autenticación
	{
		// cargamos el token recien creado
		$request_token = load_token ( $_GET ['oauth_token'] );
		if (empty ( $request_token ))
			die ( 'No se ha podido obtener el request token!' );
			
			// obtenemos y guardamos el token de acceso
		$access_token = $dropbox->GetAccessToken ( $request_token );
		store_token ( $access_token, "access" );
		delete_token ( $_GET ['oauth_token'] );
	}
	
	// comprobamos si es necesario el token de acceso
	if (! $dropbox->IsAuthorized ()) {
		// redireccionamos a la web de autenticación
		$return_url = "http://" . $_SERVER ['HTTP_HOST'] . $_SERVER ['SCRIPT_NAME'] . "?auth_callback=1";
		$auth_url = $dropbox->BuildAuthorizeUrl ( $return_url );
		$request_token = $dropbox->GetRequestToken ();
		store_token ( $request_token, $request_token ['t'] );
		die ( "Autenticación necesaria. <a href='$auth_url'>Pulsa aquí.</a>" );
	}
	
	echo "<b>Guardando $backupFilesName</b><br/>";
	$dropbox->UploadFile ( $backupFiles );
	echo "<b>Guardando $backupDBName.zip</b>";
	$dropbox->UploadFile ( $backupDB . ".zip" );
	unlink ( $backupFiles );
	unlink ( $backupDB );
	unlink ( $backupDB . ".zip" );
	// escribimos la fecha del backup en un fichero
	file_put_contents ( HOME . "/../TEMP/LastBackup.txt", date ( "Y-m-d H:i:s", time () ) );
}

/**
 * La función store_token guarda el token
 *
 * @param array $token
 *        	el token que se quiere guardar
 * @param string $name
 *        	la ruta destino del token
 */
function store_token($token, $name) {
	if (! file_put_contents ( HOME . "/../tokens/$name.token", serialize ( $token ) ))
		die ( '<br />No se ha podido guardar el token! <b>Asegurate de que el directorio `tokens` existe y tiene permisos de escritura!</b>' );
}

/**
 * La función load_token recupera el token
 *
 * @param string $name
 *        	la ruta origen del token
 * @return array|null
 * 			el token recuperado o null
 */
function load_token($name) {
	if (! file_exists ( HOME . "/../tokens/$name.token" ))
		return null;
	return @unserialize ( @file_get_contents ( HOME . "/../tokens/$name.token" ) );
}

/**
 * La función delete_token elimina el token
 *
 * @param string $name
 *        	la ruta origen del token
 */
function delete_token($name) {
	@unlink ( HOME . "/../tokens/$name.token" );
}

/**
 * La función Zip comprime 'source' en un *.zip y lo guarda en 'destination'
 *
 * @param string $source
 *        	la carpeta/fichero que se quiere comprimir
 * @param string $destination
 *        	la ruta destino del fichero comprimido
 */
function Zip($source, $destination) {
	if (extension_loaded ( 'zip' ) === true) {
		if (file_exists ( $source ) === true) {
			$zip = new ZipArchive ();
			
			if ($zip->open ( $destination, ZIPARCHIVE::CREATE ) === true) {
				$source = realpath ( $source );
				
				if (is_dir ( $source ) === true) {
					$files = new RecursiveIteratorIterator ( new RecursiveDirectoryIterator ( $source ), RecursiveIteratorIterator::SELF_FIRST );
					
					foreach ( $files as $file ) {
						$file = realpath ( $file );
						
						if (is_dir ( $file ) === true) {
							$zip->addEmptyDir ( str_replace ( $source . '/', '', $file . '/' ) );
						} 

						else if (is_file ( $file ) === true) {
							$zip->addFromString ( str_replace ( $source . '/', '', $file ), file_get_contents ( $file ) );
						}
					}
				} 

				else if (is_file ( $source ) === true) {
					$zip->addFromString ( basename ( $source ), file_get_contents ( $source ) );
				}
			}
			
			return $zip->close ();
		}
	}
	
	return false;
}

/**
 * La función backupDB hace una copia de seguridad de la base de datos MySQL del servidor.
 * Crea un fichero .sql que contiene la información necesaria para recuperar todas las
 * tablas y sus contenidos. Además comprime el fichero .sql en un .zip para ahorrar espacio.
 *
 * @param string $backup_dir
 *        	La ruta donde se quiere guardar el backup.
 */
function backupDB($backup_dir) {
	$con = mysqli_connect ( DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME );
	
	// obtenemos todas las tablas
	$tables = array ();
	$result = mysqli_query ( $con, 'SHOW TABLES' );
	while ( $row = mysqli_fetch_array ( $result ) ) {
		$tables [] = $row [0];
	}
	
	// iteramos sobre todas las tablas
	foreach ( $tables as $table ) {
		$result = mysqli_query ( $con, "SELECT * FROM `$table`");
		$num_fields = mysqli_num_fields ( $result );
		$num_rows = mysqli_num_rows( $result );
		$return .= "--\n-- Estructura de tabla para la tabla $table\n--\n\n";
		$return .= "DROP TABLE IF EXISTS `$table`;";
		$row2 = mysqli_fetch_array ( mysqli_query ( $con, "SHOW CREATE TABLE `$table`" ) );
		$return .= "\n\n" . $row2 [1] . ";\n\n";
		if ($num_rows > 0) {
			$return .= "--\n-- Volcado de datos para la tabla $table\n--\n\n";
		}
		$i = 0;
		while ( $row = mysqli_fetch_array ( $result ) ) {
			if ($i == 0) {
				$return .= "INSERT INTO `$table` VALUES\n";
			}
			$i++;
			for($j = 0; $j < $num_fields; $j ++) {
				if ($j == 0) {
					$return .= '(';
				}
				$row [$j] = mysqli_real_escape_string ( $con, $row [$j] );
				if (isset ( $row [$j] )) {
					$return .= '"' . $row [$j] . '"';
				} else {
					$return .= '""';
				}
				if ($j < ($num_fields - 1)) {
					$return .= ',';
				}
			}
			if ($i < $num_rows) {
				$return .= "),\n";
			}
			else {
				$return .= ");\n";
			}
		}
		$return .= "\n";
		
		// obtenemos los triggers de la tabla
		$triggers = array ();
		$result = mysqli_query ( $con, "SHOW TRIGGERS LIKE '$table'");
		while ( $row = mysqli_fetch_array ( $result ) ) {
			$triggers [] = $row [0];
		}
		if (sizeof($triggers) > 0) {
			$return .= "--\n-- Triggers de la tabla `$table`\n--\n\n";
			// iteramos sobre los triggers de la tabla
			foreach ( $triggers as $trigger ) {
				$result = mysqli_fetch_array ( mysqli_query ( $con, "SHOW CREATE TRIGGER $trigger" ) );
				$return .= "\nDROP TRIGGER IF EXISTS `$trigger`;\n";
				$return .= "DELIMITER //\n";
				$return .= $result [2] . "\n//\n";
				$return .= "DELIMITER ;\n";
			}
			$return .= "\n\n";
		}	
	}
	
	// guardamos el fichero
	$handle = fopen ( $backup_dir, 'w+' );
	fwrite ( $handle, $return );
	fclose ( $handle );
}

?>