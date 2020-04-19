<?php
include_once('../../core/MovieSql.php');

session_start();

$movieID = $_POST['movie_id'];
$query = new MovieSql();
$result=$query->getMovieImages($movieID);//Find images list of movie
if($result!=""){
	echo $result;
}else{
	echo "No Images";
}

?>