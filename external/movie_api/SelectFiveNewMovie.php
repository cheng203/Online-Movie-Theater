<?php
include_once('../../core/MovieSql.php');

session_start();


$query = new MovieSql();
$movie_result=json_decode($query->findNewestFiveMovie());
$length=count($movie_result);
for($i=0;$i<$length;$i++){
    $new_result=$movie_result[$i];
    $movie_id=$movie_result[$i]->movie_id;
    $image=json_decode($query->getMovieCarouselImages($movie_id));

    $new_result->url=$image[0]->image_name;

    $arr[]=$new_result;       
}
$result=json_encode($arr);


if($result!=""){
	echo $result;
}else{
	echo "Nothing";
}




?>