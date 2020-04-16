<?php
include_once('../core/RoomSql.php');

session_start();
//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}

$room_id = $_POST['room_id'];

$query = new RoomSql();
$result=$query->findRoomByID($room_id);
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}




?>