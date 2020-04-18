<?php
include_once('../core/SessionSql.php');

session_start();

//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}
$session_id=$_POST['session_id'];

$available=$_POST['available'];



$query = new SessionSql();
$result=$query->modifySessionByID($session_id,$available);
if($result==TRUE){
	echo "Session is modified successfully";
}else{
	echo "There is an ERROR !";
}




?>