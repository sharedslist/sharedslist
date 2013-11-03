<?php

require("config.php");

/**
  * Class to handle app items
  */
class Item {
  
	/**
          * @var int The list ID from the database
          */
	public $idList = null;
  
	/**
          * @var int The item ID from the database
          */
	public $idItem = null;

	/**
          * @var string The item's name
          */
	public $itemName = null;
  
	/**
          * @var string The item's state
          */
	public $itemState = null;

	/**
          * @var string The item's quantity
          */
	public $quantity = null;

	/**
          * @var string The item's quantity left
          */
	public $quantityBought = null;


	/**
          * Sets the object's properties using the values in the supplied array
          *
          * @param assoc The property values
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
          * Returns a Item object matching the given ID.
          *
          * @param int The Item ID
          * @return Item|null The Item object, or null if the record was not found or there was a problem
          */
	public static function getItemById( $idItem ) {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		} 
		$sql = "SELECT * FROM item WHERE idItem = '".$idItem."'";
		if ( $row ) return new Item( $row );
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result);
		mysqli_close($con);
	}
	
	
	/**
          * Inserts the current Item object into the database, and sets its ID property.
          */
	public function insertItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$sql = "INSERT INTO `item` (idList, itemName, itemState, quantity, quantityBought) values ('".$this->idList."','".$this->itemName."', '".$this->itemState."', '".$this->quantity."', '".$this->quantityBought."')";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}


	/**
          * Updates the current Item object in the database.
	  */
	public function editItem() {

	}


	/**
          * Deletes the current Item object from the database.
          */
	public function deleteItem() {
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		$sql = "DELETE FROM `item` WHERE idItem = '".$this->idItem."'";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}


	/**
	  * Lists the items of list
	  */
	public function listItems() {
	
		$items = array();

		return $items;
	}
  
}

?>
