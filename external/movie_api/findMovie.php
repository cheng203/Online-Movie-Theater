<?php
include_once('../../core/MovieSql.php');

session_start();
// if(!isset($_SESSION["user_type"])){
// 	die("You have no permission.");
// }

$movieID = $_POST['movie_id'];
$query = new MovieSql();
$result=$query->findMovieByID($movieID);//Find info of movie
if($result!=""){
	echo $result;
}else{
	echo "No Movies";
}

?>