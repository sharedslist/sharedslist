<?php

require_once("config.php");
require_once("Item.php");

/**
  * Clase para manejar las listas de compras
  */
class ShoppingList
{
	/**
      * @var int El ID de la lista en la base de datos
      */
	public $idList = null;
  
	/**
      * @var int El ID del grupo en la base de datos
      */
	public $idGroup = null;
  
	/**
      * @var string El nombre de la lista
      */
	public $listName = null;
	
	/**
      * @var boolean El estado de la lista
      */
	public $listState = null;
	
	/**
      * @var string El timestampo de la creación de la lista
      */
	public $listCreated = null;
	
	
	/**
	  * Establece las propiedades del objeto usando los valores en el array proporcionado
      *
      * @param assoc Los valores de las propiedades
      */
	public function __construct( $data=array() ) {
		if ( isset( $data['idList'] ) ) $this->idList = (int) $data['idList'];
		if ( isset( $data['idGroup'] ) ) $this->idGroup = (int) $data['idGroup'];
		if ( isset( $data['listName'] ) ) $this->listName = $data['listName'];
		if ( isset( $data['listState'] ) ) $this->listState = $data['listState'];
		if ( isset( $data['listCreated'] ) ) $this->listCreated = $data['listCreated'];
	}	
  
	/**
	  * Inserta la lista de compras en la base de datos y establece su ID proporcionado
	  * por la base de datos.
      */
	public function insert() {

		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		
		if (!$con) {
			die('No se ha podido conectar: ' . mysqli_error($con));
		}
	
		$sql = "INSERT INTO `ShoppingList` (idGroup, listName) values ('".$this->idGroup."', '".$this->listName."')";
		mysqli_query($con, $sql);
		$this->idList = mysqli_insert_id($con);
		mysqli_close($con);
	}
  
	/**
	  * Obtiene todas las listas de compras del grupo
	  * especificado por el identificador del grupo 'group'
	  *
	  * @param int $group El ID del grupo cuyas listas de compras se quieren listar
	  */
	public static function listSLists($group) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('No se ha podido conectar: ' . mysqli_error($con));
		}
		//primero obtenemos las listas del grupo 'group'
		$sql = "SELECT * FROM `ShoppingList` WHERE idGroup = $group";
		$result = mysqli_query($con, $sql);
		$lists = [];
		//iteramos sobre las listas y las añadimos al vector de listas
		while ($row=mysqli_fetch_array($result)) {
			$slist = new ShoppingList($row);
			$lists[] = $slist;
		}
		
		mysqli_close($con);
		return $lists;
	}
	
}

?>
