<?php
include_once('../../core/MovieSql.php');

$movieID = $_POST['movie_id'];
$query = new MovieSql();
$result=$query->findMoviePriceByMovieID($movieID);//Find price of movie
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}

?>