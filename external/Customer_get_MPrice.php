<?php
include_once('../core/MovieSql.php');

session_start();
if(!isset($_SEESION["user_type"])){
	die("You have no permission.");
}

$movieID = $_POST['movie_id'];
$ticketTypeID=$_POST['ticket_type_id'];
$query = new MovieSql();
$result=$query->findMoviePriceByID($movieID,$ticketTypeID);//Find price of movie
if($result!=""){
	echo $result;
}else{
	echo "There is an ERROR";
}




?>