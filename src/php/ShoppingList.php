<?php

require("config.php");

class ShoppingList
{

	public $idList = null;
  
	public $idGroup = null;
  
	public $listName = null;
	
	public $listState = null;
	
	public $listCreated = null;
	
	public function __construct( $data=array() ) {
		if ( isset( $data['idList'] ) ) $this->idList = (int) $data['idList'];
		if ( isset( $data['idGroup'] ) ) $this->idGroup = (int) $data['idGroup'];
		if ( isset( $data['listName'] ) ) $this->listName = $data['listName'];
		if ( isset( $data['listState'] ) ) $this->listState = $data['listState'];
		if ( isset( $data['listCreated'] ) ) $this->listCreated = $data['listCreated'];
	}	

  
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

  
	public function insertItem($item) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "INSERT INTO `Item` (idList, itemName, quantity) VALUES ('".$this->idList."', '".$item->itemName."', '".$item->quantity."')";
		mysqli_query($con, $sql);
		mysqli_close($con);
	}
  
	public function listSLists($group) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "SELECT (idList) FROM `ShoppingList` WHERE idGroup = '".$group."'";
		$rows = mysqli_query($con, $sql);
		$lists = array();
		while ($row=mysqli_fetch_row($rows))
		{
			$sql = "SELECT * FROM `ShoppingList` WHERE idList = ".$row[0]."";
			$result = mysqli_query($con, $sql);
			while ($row=mysqli_fetch_array($result))
			{
				array_push($lists, new ShoppingList($row));
			}
		}
		mysqli_close($con);
		return $lists;
	}
	
}

?>
