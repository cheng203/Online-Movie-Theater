<?php
include_once('../../core/MovieSql.php');

session_start();

$test = $_POST['sendData'];
$data=json_decode($test);
$movie_id=$data->movie_id;
$query = new MovieSql();
$movie_result=json_decode($query->findMovieByID($movie_id));


$movie_image=json_decode($query->getMovieMovieImages($movie_id));
$movie_stage=json_decode($query->getMovieStageImages($movie_id));
$movie_info=$movie_result[0];
$movie_result[0]->img_url=$movie_image[0]->image_name;
$movie_result[0]->stage_image=$movie_stage;


$result=json_encode($movie_result);

if($result!=""){
	echo $result;
}else{
	echo "Nothing";
}




?>