<?php
include_once('../../core/MovieSql.php');

session_start();

$query = new MovieSql();
$result=$query->getImageTypes();//Find images type list
if($result!=""){
	echo $result;
}else{
	echo "Error";
}

?>