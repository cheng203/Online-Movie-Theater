<?php
include_once('../../core/GoodsSql.php');

session_start();

if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}

$images = json_decode($_POST["images"]);

$query = new GoodsSql();
$result=$query->setGoodsImages($images);
if($result==true){
	echo "Movie images set successfully";
}else{
	echo "There is an ERROR !";
}




?>