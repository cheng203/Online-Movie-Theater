<?php
include_once('../../core/GoodsSql.php');

session_start();


$query = new GoodsSql();
$result=$query->listGoods();
if($result!=""){
	echo $result;
}else{
	echo "No Goods";
}
?>