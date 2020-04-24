<?php
include_once('../../core/RoomSql.php');

session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}

$test = $_POST['sendData'];
//echo $test;
$data=json_decode($test);
$room_id=$data[0]->room;
//echo $room_id;
$start_date = $data[0]->start_date;
//echo $start_date;
$end_date = $data[0]->end_date;
//echo $end_date;
$query = new RoomSql();

$result1= $query->findRoomByStartEndDate($room_id,$start_date,$end_date);


if($data!=""){
	echo $result1;
}else{
	echo "There is an ERROR";
}




?>