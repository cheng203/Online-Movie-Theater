<?php
include_once('../core/MovieSql.php');

session_start();

$movieID = $_POST['movie_id'];
$name=$_POST['name'];
$type_name=$_POST['type_name'];
$release_date=$_POST['release_date'];
$off_date=$_POST['off_date'];
$director=$_POST['director'];
$info=$_POST['info'];
$duration=$_POST['duration'];
$rating=$_POST['rating'];
$url=$_POST['url'];


$query = new MovieSql();
$result=$query->modifyMovie($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url);
if($result===TRUE){
	echo "Movie updated successfully";
}else{
	echo "There is an ERROR !";
}




?>