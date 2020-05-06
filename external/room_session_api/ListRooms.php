<?php
include_once('../../core/RoomSql.php');

session_start();
//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}



$query = new RoomSql();
$result=$query->listRooms();
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}




?>