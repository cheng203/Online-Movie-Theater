<?php
include_once('../core/MovieSql.php');

session_start();

$movieID = $_POST['movie_id'];
$ticketTypeID=$_POST['ticket_type_id'];
$query = new MovieSql();
$result=$query->findMPrice($movieID,$ticketTypeID)//Find price of movie
if($result!=""){
	echo $result;
}else{
	echo "There is ERROR of the movieID or ticket_type_id";
}




?>