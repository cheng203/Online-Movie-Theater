<?php
include_once('../core/GoodsSql.php');

session_start();
//if(!isset($_SEESION["user_type"])){
	//die("You have no permission.");
//}

$goods_id = $_POST['goods_id'];

$query = new GoodsSql();
$result=$query->findGoodsPriceByID($goods_id);//Find price of goods
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}




?>