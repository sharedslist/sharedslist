<?php

require_once("config.php");
require_once("ShoppingList.php");


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
      * @var boolean El estado del item: 1 -> comprado, 0 -> no comprado
      */
	public $itemState = null;

	/**
      * @var int La cantidad de items que hay que comprar
      */
	public $quantity = null;
	
	/**
      * @var string La unidad de medida del item
      */
	public $metric = null;

	/**
      * @var int La cantidad de items que se han comprado
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
		if ( isset( $data['metric'] ) ) $this->metric = preg_replace ( "/[^\.\,\-\_\'\"\@\?\!\:\$\/ a-zA-Z0-9()]/", "", $data['metric'] );
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
		$itemName = mysqli_real_escape_string($con,$this->itemName);
		$quantity = mysqli_real_escape_string($con,$this->quantity);
		$metric = mysqli_real_escape_string($con,$this->metric);
		$quantityBought = mysqli_real_escape_string($con,$this->quantityBought);
		$sql = "INSERT INTO `Item` (idList, itemName, itemState, quantity, quantityBought, metric) values ('".$this->idList."','".$itemName."', '".$this->itemState."', '".$quantity."', '".$quantityBought."', '".$metric."')";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}


	/**
      * Actualiza el nombre, la cantidad y la unidad de medida del objeto Item actual en la base de datos
	  */
	public function editItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$idItem = mysqli_real_escape_string($con,$this->idItem);
		$itemName = mysqli_real_escape_string($con,$this->itemName);
		$quantity = mysqli_real_escape_string($con,$this->quantity);
		$metric = mysqli_real_escape_string($con,$this->metric);
		$sql = "UPDATE `Item` SET itemName='".$itemName."', quantity='".$quantity."', metric='".$metric."' WHERE idItem='".$idItem."'";
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
		$idItem = mysqli_real_escape_string($con,$this->idItem);
		$sql = "DELETE FROM `Item` WHERE idItem='".$idItem."'";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}

	
	/**
      * Compra [quantityBought] items del item con identificador [idItem]
	  * y pone a 1 el estado si se ha comprado la cantidad que se necesitaba.
	  * Si [quantityBought] es mayor que la cantidad a comprar o menor que 0,
	  * no se realiza la operación.
      */
	public static function buyItem( $idItem, $quantityBought ) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$idItem = mysqli_real_escape_string($con,$idItem);
		$quantityBought = mysqli_real_escape_string($con,$quantityBought);
		$sql = "SELECT `quantity` FROM `Item` WHERE idItem='".$idItem."'";
		$result = mysqli_query($con, $sql);
		$quantity = mysqli_fetch_array($result);
		if($quantityBought==$quantity){
			$itemState=1;
		}
		else{
			$itemState=0;
		}
		$sql = "UPDATE `Item` SET itemState='".$itemState."', quantityBought='".$quantityBought."' WHERE idItem='".$idItem."'";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}
	
	
	/**
	  * Devuelve un array con el nombre, el estado y los items
	  * de una lista cuyo identificador es idList.
	  *
      * @param int Identificador de una lista
	  */
	public static function listItems( $idList ) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$idSList = mysqli_real_escape_string($con,$idList);
		$sql = "SELECT `listName`, `listState` FROM `ShoppingList` WHERE idList='".$idSList."'";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		$listName = $row['listName'];
		$listState = $row['listState'];
		
		$sql = "SELECT * FROM `Item` WHERE idList='".$idSList."'";
        $rows = mysqli_query($con, $sql);
		$items = array();
        while ($row=mysqli_fetch_array($rows)) {
			$item = new Item($row);
			array_push($items, $item);
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
		$idSItem = mysqli_real_escape_string($con,$idItem);
		$sql = "SELECT * FROM `Item` WHERE idItem='".$idSItem."'";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		$item = new Item($row);
		mysqli_close($con);
		return $item;
	}
	

	/**
      * Comprueba si el usuario 'idUser' pertenece al grupo al que pertenece la lista del item 'idList'
      *
      * @param int $idUser El ID del usuario que se quiere comprobar
      * @param int $idItem El ID del item de la lista cuyo grupo se quiere comprobar la pertenencia
      * @return boolean Devuelve true si, y solo si, el usuario con id 'idUser' pertenece al grupo de la lista del item con id 'idList'
      */ 
	public static function userBelongsToGroupOfItemList( $idUser, $idList, $idItem ) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$idSList = mysqli_real_escape_string($con,$idList);
		$idSItem = mysqli_real_escape_string($con,$idItem);
		$sql = "SELECT `idList` FROM `Item` WHERE idItem='".$idSItem."'";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		mysqli_close($con);
		$idListItem = $row['idList'];
		if($idListItem == $idSList){
			return (ShoppingList::userBelongsToGroupOfList($idUser, $idListItem));
		}
		else{
			return false;
		}
	}
	
	/**
	 * Crea una variable de sesión para el ID de un item.
	 */
	public static function createItemSession($idItem) {
		try{
			session_start();
		}
		catch (Exception $e){}
		$_SESSION['idItem'] = $idItem;
	}

}

?>
