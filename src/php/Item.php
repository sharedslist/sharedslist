<?php

require_once("config.php");


/**
  * Clase que maneja los items de la aplicación
  */
class Item {
  
	/**
      * @var int El identificador de la lista en la base de datos a la que pertenece el item
      */
	public $idList = null;
  
	/**
      * @var int El identificador del item en la base de datos
      */
	public $idItem = null;

	/**
      * @var string El nombre del item
      */
	public $itemName = null;
  
	/**
      * @var string El estado del item: true-> comprado, false-> no comprado
      */
	public $itemState = null;

	/**
      * @var string La cantidad de items que hay que comprar
      */
	public $quantity = null;

	/**
      * @var string La cantidad de items que se han comprado
      */
	public $quantityBought = null;


	/**
      * Establece los atributos del item a partir del array proporcionado
      *
      * @param assoc Valores del item
      */
	public function __construct( $data=array() ) {
		if ( isset( $data['idList'] ) ) $this->idList = (int) $data['idList'];
		if ( isset( $data['idItem'] ) ) $this->idItem = (int) $data['idItem'];
		if ( isset( $data['itemName'] ) ) $this->itemName = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$\/ a-zA-Z0-9()]/", "", $data['itemName'] );
		if ( isset( $data['itemState'] ) ) $this->itemState = (boolean) $data['itemState'];
		if ( isset( $data['quantity'] ) ) $this->quantity = (int) $data['quantity'];
		if ( isset( $data['quantityBought'] ) ) $this->quantityBought = (int) $data['quantityBought'];
	}

	
	/**
      * Inserta el objeto Item actual en la base de datos y le da un identificador
      */
	public function insertItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		 //Escapamos los carácteres potencialmente inseguros
		$this->idList = mysqli_real_escape_string($con,$this->idList);
		$this->itemName = mysqli_real_escape_string($con,$this->itemName);
		$this->itemState = mysqli_real_escape_string($con,$this->itemState);
		$this->quantity = mysqli_real_escape_string($con,$this->quantity);
		$this->quantityBought = mysqli_real_escape_string($con,$this->quantityBought);

		$sql = "INSERT INTO `Item` (idList, itemName, itemState, quantity, quantityBought) values (".$this->idList.",".$this->itemName.", ".$this->itemState.", ".$this->quantity.", ".$this->quantityBought.")";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}


	/**
      * Actualiza el objeto Item actual en la base de datos
	  */
	public function editItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$sql = "UPDATE `Item` SET itemName=".$this->itemName.", itemState=".$this->itemState.", quantity=".$this->quantity.", quantityBought=".$this->quantityBought." WHERE idItem=".$this->idItem."";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}


	/**
      * Elimina el objeto Item actual de la base de datos
      */
	public function deleteItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$sql = "DELETE FROM `Item` WHERE idItem = ".$this->idItem."";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}

	
	/**
	  * Devuelve un array con el nombre, el estado y los items
	  * de una lista cuyo identificador es idList.
	  *
      * @param int Identificador de una lista
	  */
	public function listItems($idList) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$sql = "SELECT `listName`, `listState` FROM `ShoppingList` WHERE idList ='".$idList."'";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		$listName = $row['listName'];
		$listState = $row['listState'];
		
		$sql = "SELECT * FROM `Item` WHERE idList='".$idList."'";
        $rows = mysqli_query($con, $sql);
		$items = array();
        while ($itemRow=mysqli_fetch_row($rows))
        {
			array_push($items, new Item ($itemRow));
        }
        mysqli_close($con);
        return array( 'listName' => $listName, 'listState' => $listState, 'items' => $items);
	}
  
  
	/**
      * Devuelve un item cuyo identificador es idItem
      *
      * @param int Identificador de un item
      * @return Item|null El objeto Item o null si no se ha encontrado o ha habido un error
      */
	public static function getItemById( $idItem ) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		} 
		$sql = "SELECT * FROM `Item` WHERE idItem ='".$idItem."'";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		mysqli_close($con);
		return new Item( $row );
	}
	
}

?>
