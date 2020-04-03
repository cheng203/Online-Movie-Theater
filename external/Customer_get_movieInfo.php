<?php
include_once('../core/MovieSql.php');

session_start();

$movieID = $_POST['movie_id'];
$query = new MovieSql();
$result=$query->Movie_info($movieID)//Find info of movie
if($result!=""){
	echo $result;
}else{
	echo "There is ERROR of the movieID";
}




?>