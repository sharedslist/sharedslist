<?php

require("config.php");

class Group
{

	public $id = null;
  
	public $group_name = null;
  
	public $admin = null;

  
	public function insert() {

		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
		
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
	
		$fp = fopen('data', 'w');
	
		$sql = "INSERT INTO `group` (groupName, idAdmin) values ('".$this->group_name."', '".$this->admin."')";
		fwrite($fp, $sql);
		fclose($fp);
		mysqli_query($con, $sql);
		$this->id = mysqli_insert_id($con);
		mysqli_close($con);
	}

  
	public function insertUser($email) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "SELECT (idUser) FROM `user` WHERE emailAddress = '".$email."'";
		$rows = mysqli_query($con, $sql);
		while ($row=mysqli_fetch_row($rows))
		{		
			$sql = "INSERT INTO groupanduser (idGroup, idUser) values ('".$this->id."', '".$row[0]."')";
			mysqli_query($con, $sql);
		}
		mysqli_close($con);
	}
  
	public function listGroups($user) {
  
		$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);
    
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}
		
		$sql = "SELECT (idGroup) FROM groupanduser WHERE idUser = '".$user."'";
		$rows = mysqli_query($con, $sql);
		$groups = array();
		while ($row=mysqli_fetch_row($rows))
		{
			$sql = "SELECT (groupName) FROM `group` WHERE idGroup = ".$row[0]."";
			$names = mysqli_query($con, $sql);
			while ($name=mysqli_fetch_row($names))
			{
				array_push($groups, $name[0]);
			}
		}
		mysqli_close($con);
		return $groups;
	}
	
}

?>
