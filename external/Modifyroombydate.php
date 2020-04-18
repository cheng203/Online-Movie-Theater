<?php
include_once('../core/RoomSql.php');

session_start();

//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}
$room_id=$_POST['room_id'];
$date=$_POST['date'];
$time_flag=$_POST['time_flag'];



$query = new RoomSql();
$result=$query->modifyRoomByDate($room_id,$date,$time_flag);
if($result==TRUE){
	echo "Room_by_date modified successfully";
}else{
	echo "There is an ERROR !";
}




?>


