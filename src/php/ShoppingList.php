<?php

require_once("config.php");
require_once("Item.php");

/**
  * Class to handle app shopping lists
  */
class ShoppingList
{
	/**
      * @var int The list ID from the database
      */
	public $idList = null;
  
	/**
      * @var int The group ID from the database
      */
	public $idGroup = null;
  
	/**
      * @var string The list's name
      */
	public $listName = null;
	
	/**
      * @var boolean The list's state
      */
	public $listState = null;
	
	/**
      * @var string The list's creation's timestamp
      */
	public $listCreated = null;
	
	/**
      * @var string The list's creation's timestamp
      */
	public $items = null;
	
	/**
      * Sets the object's properties using the values in the supplied array
      *
      * @param assoc The property values
      */
	public function __construct( $data=array() ) {
		if ( isset( $data['idList'] ) ) $this->idList = (int) $data['idList'];
		if ( isset( $data['idGroup'] ) ) $this->idGroup = (int) $data['idGroup'];
		if ( isset( $data['listName'] ) ) $this->listName = $data['listName'];
		if ( isset( $data['listState'] ) ) $this->listState = $data['listState'];
		if ( isset( $data['listCreated'] ) ) $this->listCreated = $data['listCreated'];
		if ( isset( $data['items'] ) ) $this->items = $data['items'];
	}	
  
	/**
      * Inserts the ShoppingList object into the database, and sets its ID property.
      */
	public function insert() {

		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
	
		$sql = "INSERT INTO `ShoppingList` (idGroup, listName) values ('".$this->idGroup."', '".$this->listName."')";
		mysqli_query($con, $sql);
		$this->idList = mysqli_insert_id($con);
		mysqli_close($con);
	}
  
	/**
	  * Obtains all the shopping lists and their items of the group specified by 'group'
	  */
	public static function listSLists($group) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		//primero obtenemos las listas del grupo 'group'
		$sql = "SELECT * FROM `ShoppingList` WHERE idGroup = $group";
		$result = mysqli_query($con, $sql);
		$lists = [];
		while ($row=mysqli_fetch_array($result)) {
			$slist = new ShoppingList($row);
			//obtenemos los items correspondientes a cada lista
			$sql_items = "SELECT * FROM `Item` WHERE idList = ".$row['idList'];
			$result_items = mysqli_query($con, $sql_items);
			$items = [];
			while ($row_item=mysqli_fetch_array($result_items)) {
				$items[] = new Item($row_item);
			}
			$slist->items = $items;
			$lists[] = $slist;
		}
		
		mysqli_close($con);
		return $lists;
	}
	
}

?>
