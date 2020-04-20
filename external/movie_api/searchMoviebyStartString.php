<?php
include_once('../../core/MovieSql.php');

session_start();
// if(!isset($_SESSION["user_type"])){
// 	die("You have no permission.");
// }


$test = $_POST['sendData'];
$data=json_decode($test);

$start_string=$data->start_string;
$query = new MovieSql();
$result=$query->SearchMovieNameStartByString($start_string);
if($result!=""){
	echo $result;
}else{
	echo "Nothing";
}

?>
