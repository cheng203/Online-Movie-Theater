<?php
include_once('../../core/MovieSql.php');

session_start();


$query = new MovieSql();
$result=$query->listMovies();
if($result!=""){
	echo $result;
}else{
	echo "No Movie";
}
?>