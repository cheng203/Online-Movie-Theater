<?php
include_once('../../core/GoodsSql.php');

session_start();

if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}
$goods_id=$_POST['goods_id'];
//$goods_name=$_POST['goods_name'];



$query = new GoodsSql();
$result=$query->deleteGooodsByID($goods_id);
if($result==TRUE){
	echo "New goods has been deleted successfully";
}else{
	echo "There is an ERROR !";
}




?>