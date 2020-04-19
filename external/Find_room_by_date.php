<?php
include_once('../core/RoomSql.php');

session_start();
//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}
$test = $_POST['sendData'];
$data=json_decode($test);

$room_id = $data->room_id;
$date = $data->date;
$query = new RoomSql();
$result=$query->findRoomByDate($room_id,$date);
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}




?>