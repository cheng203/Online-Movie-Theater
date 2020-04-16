<?php
include_once('../../core/MovieSql.php');

session_start();
if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}


$movieID = $_POST["movie_id"];
$adult_price = $_POST["adult_price"];
$senior_price = $_POST["senior_price"];
$children_price = $_POST["children_price"];

$query = new MovieSql();
$result=$query->setMoviePrices($movieID,$adult_price,$senior_price,$children_price);
if($result==false){
    echo "error";
}
else{
    echo "success";
}

?>