<?php
include_once('../../core/GoodsSql.php');

session_start();

//if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	//die("You have no permission.");
//}
//$goods_id=$_POST['goods_id'];
$goods_name=$_POST['goods_name'];
$price=$_POST['price'];



$query = new GoodsSql();
$result=$query->addGoods($goods_name,$price);
if($result==TRUE){
	echo "New goods added successfully";
}else{
	echo "There is an ERROR !";
}




?>