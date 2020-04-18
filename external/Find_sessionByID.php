<?php
include_once('../core/SessionSql.php');

session_start();

//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}
$session_id=$_POST['session_id'];


$query = new SessionSql();
$result=$query->findSessionByID($session_id);
//deleteSessionByID($session_id);
if($result!=""){
    echo $result;
}else{
	echo "There is an ERROR !";
}




?>