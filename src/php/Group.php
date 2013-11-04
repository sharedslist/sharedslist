<?php

require_once("config.php");

class Group
{
	// Identificador numérico de grupo
	public $id = null;
  
	// Nombre de grupo
	public $group_name = null;
  
	// Identificador numérico del [Usuario] administrador 
	public $admin = null;

  
	/*
	 * Inserta la clase [Grupo] en la base de datos
	 */
	public function insert() {

		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
	
		$sql = "INSERT INTO `Group` (groupName, idAdmin) values ('".$this->group_name."', '".$this->admin."')";
		mysqli_query($con, $sql);
		$this->id = mysqli_insert_id($con);
		mysqli_close($con);
	}

  
	/*
	 * Inserta al [Usuario] cuyo email coincide con el parametro de entrada $email
	 * como un nuevo miembro de la clase [Grupo] en la base de datos
	 */
	public function insertUser($email) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "SELECT (idUser) FROM `User` WHERE emailAddress = '".$email."'";
		$rows = mysqli_query($con, $sql);
		while ($row=mysqli_fetch_row($rows))
		{		
			$sql = "INSERT INTO `GroupAndUser` (idGroup, idUser) values ('".$this->id."', '".$row[0]."')";
			mysqli_query($con, $sql);
		}
		mysqli_close($con);
	}
  
	/*
	 * Devuelve una lista con los nombres de [Grupo] a los que
	 * pertenece el parametro de entrada $user, el cual es un 
	 * identificador de [Usuario]
	 */
	public function listGroups($user) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "SELECT (idGroup) FROM `GroupAndUser` WHERE idUser = '".$user."'";
		$rows = mysqli_query($con, $sql);
		$groups = array();
		while ($row=mysqli_fetch_row($rows))
		{
			$sql = "SELECT (groupName) FROM `Group` WHERE idGroup = ".$row[0]."";
			$names = mysqli_query($con, $sql);
			while ($name=mysqli_fetch_row($names))
			{
				array_push($groups, $name[0]);
			}
		}
		mysqli_close($con);
		return $groups;
	}
	
	/**
      * Comprueba si el usuario 'idUser' pertenece al grupo 'idGroup'
      *
	  * @param int $idUser El ID del usuario que se quiere comprobar
	  * @param int $idGroup El ID del grupo donde se quiere comprobar la pertenencia
      * @return boolean Devuelve true si, y solo si, el usuario con id 'idUser' pertenece al grupo con id 'idGroup'
      */	
	public static function userBelongsToGroup($idUser, $idGroup) {
	
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('No se ha podido conectar: ' . mysqli_error($con));
		}
		
		$sql = "SELECT * FROM `GroupAndUser` WHERE idUser = $idUser AND idGroup = $idGroup";
		$result = mysqli_query($con, $sql);
		$numRows = mysqli_num_rows($result);
		mysqli_close($con);
		return $numRows == 1;
	}
	
}

?>
