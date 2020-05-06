<?php
include_once('../../core/MovieSql.php');

session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}
$test = $_POST['sendData'];
$data=json_decode($test)[0];
var_dump($data);
$movieID = $data->movie_id;
$name=$data->name;
$type_name=$data->type_name;
$release_date=$data->release_date;
$off_date=$data->off_date;
$director=$data->director;
$info="default";
$duration=$data->duration;
$rating=$data->rating;


$query = new MovieSql();
$result=$query->modifyMovieByID($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating);
if($result===TRUE){
	echo "Movie updated successfully";
}else{
	echo "There is an ERROR !";
}



?>