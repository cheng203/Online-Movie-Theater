<?php
include_once('../../core/MovieSql.php');

session_start();


$query = new MovieSql();
$result=$query->listCategory();
if($result!=""){
	echo $result;
}else{
	echo "No Movie";
}
?>