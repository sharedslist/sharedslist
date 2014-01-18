<?php

/**
 * Clase para manejar Usuarios
 */

class User
{
 

  /**
  * @var int La ID del usuario en la BD
  */
  public $id = null;

   /**
  * @var string El nombre de usuario
  */
  public $userName = null;
  
  
  /**
  * @var string El email del usuario
  */
  public $emailAddress = null;

  /**
  * @var string La contraseña en texto plano
  */
  public $plaintextPassword = null;

  /**
  * @var string La contraseña encriptada
  */
  public $password = null;
<<<<<<< HEAD
=======
  
  /**
  * @var string La contraseña encriptada
  */
  public $lang = null;
>>>>>>> origin/develop


  /**
  * Constructor del objeto User
  *
  */

  public function __construct( $data=array() ) {
    if ( isset( $data['idUser'] ) ) $this->id = (int) $data['idUser'];
	if ( isset( $data['userName'] ) ) $this->userName = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$\/ a-zA-Z0-9()]/", "", $data['userName'] );
    if ( isset( $data['emailAddress'] ) ) $this->emailAddress = preg_replace ( "/[^\.\-\_\@a-zA-Z0-9]/", "", $data['emailAddress'] );
    if ( isset( $data['plaintextPassword'] ) ) $this->plaintextPassword = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data['plaintextPassword'] );
    if ( isset( $data['password'] ) ) $this->password = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$\/ a-zA-Z0-9()]/", "", $data['password'] );
<<<<<<< HEAD
=======
	if ( isset( $data['lang'] ) ) $this->lang = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$\/ a-zA-Z0-9()]/", "", $data['lang'] );
>>>>>>> origin/develop
  }


  /**
  * Encripta la contraseña de texto plano y la almacena en la variable encryptedPassword.
  */

  public function encryptPassword() {
    $this->password = crypt ( $this->plaintextPassword );
  }


  /**
  * Comprueba que la contraseña en texto plano es correcta para este usuario.
  *
  * @param string Contraseña en texto plano
  */

  public function checkPassword( $p ) {
    return ( $this->password == crypt ( $p, $this->password ) );
  }


  /**
  * Genera una nueva contrase�a aleatoria para el cliente.
  * La LOPD establece que debe contener tanto letras coo numeros y una longitud
  * minima de 8 letras.
  */

  public function generatePassword() {
	$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	$cad = "";
	for($i=0;$i<9;$i++) {
		$cad .= substr($str,rand(0,62),1);
	}
	$cad .= substr($str,rand(52,62),1);
	// Asigna la nueva contrase�a a los atributos.
	$this->plaintextPassword = $cad;
	$this->password=crypt($cad);
  }


  /**
  * Envia por email una nueva contraseña generada aleatoriamente.
  */

  public function sendPassword() {
<<<<<<< HEAD
    $headers = "From: noreply@sharedslist.hol.es";
	$to = $this->emailAddress;
	$subject = "Nueva contraseña";
	$message = "Hola ";
	$message .= $this->userName;
	$message .="\n Te enviamos tu nueva contrase�a generada aleatoriamente.\nContraseña:";
	$message .=$this->plaintextPassword;
	$message .="\nPuedes cambiarla por una nueva en la configuración de usuario.\n\n";
	$message .="Un saludo,\n el equipo de Shared Shopping List.";
	// la función mail consulta en el fichero php.ini los datos necesarios para consultarse al servidor
	// de envio de correos.
	$enviado = mail($to,$subject,$message,$headers) or die("No se puede conectar al servidor de correo");
	return $enviado;
=======
	$headers = "From: noreply@sharedslist.hol.es";
	$to = $this->emailAddress;
	if( $user -> lang == 'en' ) {
		$subject = "New password";
		$message = "Hello ";
		$message .= $this->userName;
		$message .="\n We send you the new random password.\nPassword:";
		$message .=$this->plaintextPassword;
		$message .="\nYou can change it in the user configuration.\n\n";
		$message .="Greetings,\n the Shared Shopping List's team.";
		// la función mail consulta en el fichero php.ini los datos necesarios para consultarse al servidor
		// de envio de correos.
		$enviado = mail($to,$subject,$message,$headers) or die("We could not connect with the mailserver");
		return $enviado;
	} else {
		$subject = "Nueva contraseña";
		$message = "Hola ";
		$message .= $this->userName;
		$message .="\n Te enviamos tu nueva contrase�a generada aleatoriamente.\nContraseña:";
		$message .=$this->plaintextPassword;
		$message .="\nPuedes cambiarla por una nueva en la configuración de usuario.\n\n";
		$message .="Un saludo,\n el equipo de Shared Shopping List.";
		// la función mail consulta en el fichero php.ini los datos necesarios para consultarse al servidor
		// de envio de correos.
		$enviado = mail($to,$subject,$message,$headers) or die("No se puede conectar al servidor de correo");
		return $enviado;
	}
>>>>>>> origin/develop
  }


  /**
  * Cierra la sesión del usuario (si hay alguna)
  * @return Usuario|false El usuario loggeado, o falso si no hay sesión.
  */

  static function getLoggedInUser() {
    if ( !isset( $_SESSION['userId']) ) return false;
    return User::getById( (int)$_SESSION['userId'] );
  }
  

/**
  * Crea una sesión valida para este usuario, y lo logea.
  */

  function createLoginSession() {
	try{
	session_start();
	}catch (Exception $e){}
    $_SESSION['userId'] = $this->id;
    
  }


  /**
  * Destruye la sesión de usuario.
  */

  function destroyLoginSession() {
    unset( $_SESSION['userId'] );
    session_destroy();

    if ( isset( $_COOKIE[session_name()] ) ) {
      setcookie( session_name(), "", time()-3600, "/" );
    }
  }


  /**
  * Devuelve un objeto Usuario correspondiente con la ID dada.
  *
  * @param int La ID de usuario
  * @return User| null El objeto usuario, o null si ha habido un problema o no existe.
  */

  public static function getById( $id ) {
   $con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	} 
	$sql = "SELECT * FROM `User` WHERE idUser = '".$id."'";
	
	$result = mysqli_query($con, $sql);

	$row = mysqli_fetch_array($result);
<<<<<<< HEAD
=======
	mysqli_close($con);
>>>>>>> origin/develop
    if ( $row ) return new User( $row );
  }
  
 
    /**
  * Devuelve un objeto Usuario correspondiente con el email dado.
  *
  * @param string El email del usuario
  * @return User| null El objeto usuario, o null si ha habido un problema o no existe.
  */

  public static function getByEmailAddress( $email) {
	
	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	} 

  // Se escapan los caracteres potencialmente peligrosos, para evitar inyecciones SQL
  $email = mysqli_real_escape_string($con,$email);

	$sql = "SELECT * FROM `User` WHERE emailAddress = '".$email."'";
	
	$result = mysqli_query($con, $sql);

	$row = mysqli_fetch_array($result);

	mysqli_close($con);
	
	if ( $row ) return new User( $row );
  }



  /**
  * Inserta el objeto User actual en la base de datos, y fija el atributo ID.
  */

  public function insert() {

	$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}

  //Escapamos los carácteres potencialmente inseguros
  $this->userName = mysqli_real_escape_string($con,$this->userName);
  $this->password = mysqli_real_escape_string($con,$this->password);
  $this->emailAddress = mysqli_real_escape_string($con,$this->emailAddress);

    // Isnerta el usuario
	$sql = "INSERT INTO `User` (userName, emailAddress, password) values ('".$this->userName."', '".$this->emailAddress."', '".$this->password."')";
    mysqli_query($con, $sql);
	
    $this->id = mysqli_insert_id($con); //asocia al objeto User la id que se ha añadido en la bd

	mysqli_close($con);
  }


  /**
  * Actualiza la contraseña el Usuario actual en la base de datos.
  */

  public function updatePassword() {

    $con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
  // Se limpia la contraseña de caracteres inseguros antes de hacer la consulta
  $this->password = mysqli_real_escape_string($con,$this->password);
	$sql = "UPDATE `User` SET password='".$this->password."' WHERE emailAddress='".$this->emailAddress."'";

    mysqli_query($con, $sql);
	
    $this->id = mysqli_insert_id($con); //asocia al objeto User la id que se ha a�adido en la bd

	mysqli_close($con);
   
  }
<<<<<<< HEAD
=======
  
	/**
	* Actualiza el idioma del Usuario actual en la base de datos.
	*/
	public function updateLanguage() {

		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		// Se limpia el idioma de caracteres inseguros antes de hacer la consulta
		$this->lang = mysqli_real_escape_string($con,$this->lang);
		$sql = "UPDATE `User` SET lang='".$this->lang."' WHERE emailAddress='".$this->emailAddress."'";

		mysqli_query($con, $sql);

		$this->id = mysqli_insert_id($con); //asocia al objeto User la id que se ha a�adido en la bd
		
		mysqli_close($con);

	}  
>>>>>>> origin/develop

    /**
  * Actualiza el nombre de usuario del Usuario actual en la base de datos.
  */

  public function updateUserName() {

    $con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }
  // Se limpia el userName de caracteres inseguros antes de hacer la consulta
  $this->userName = mysqli_real_escape_string($con,$this->userName);
  //Se actualiza el usuario
  $sql = "UPDATE `User` SET userName='".$this->userName."' WHERE emailAddress='".$this->emailAddress."'";

    mysqli_query($con, $sql);
  
    $this->id = mysqli_insert_id($con); //asocia al objeto User la id que se ha a�adido en la bd

  mysqli_close($con);
   
  }
<<<<<<< HEAD
=======
  
  
>>>>>>> origin/develop


  /**
  * Borra al usuario de la base de datos.
  */

  public function delete() {

	// por hacer
  }

}

?>
