<?php
include_once('../../core/MovieSql.php');

session_start();
if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}
$movieID = $_POST['movie_id'];

$query = new MovieSql();
$result=$query->deleteMovieByID($movieID);
if($result===TRUE){
	echo "Movie deleted successfully";
}else{
	echo "There is an ERROR !";
}
?>





