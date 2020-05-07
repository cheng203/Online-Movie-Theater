<?php
include_once('../../core/SessionSql.php');

session_start();
$test = $_POST['sendData'];
$data=json_decode($test);

$movie_id=$data[0]->movie_id;
$date=$data[0]->date;

// $movie_id = $_POST["movie_id"];
// $date = $_POST["date"];

$query = new SessionSql();
$result=$query->findSessionByMovieAndDate($movie_id,$date);
if($result!=''){
	echo $result;
}
else{
	echo "error";
}



?>