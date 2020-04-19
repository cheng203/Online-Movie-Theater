<?php
include_once('../../core/MovieSql.php');

session_start();

if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}


$movie_id = $_POST["movie_id"];
$images = json_decode($_POST["images"]);

$imageArr = [];

for($i = 0; $i<count($images); $i++){
    $imageArr[$images[$i]->image_type_id] = $images[$i]->imgidlist;
}

$query = new MovieSql();
$result=$query->setMovieImages($movie_id, $imageArr);
if($result==true){
	echo "Movie images set successfully";
}else{
	echo "There is an ERROR !";
}




?>