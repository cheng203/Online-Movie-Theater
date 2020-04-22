<?php
include_once('../../core/MovieSql.php');

session_start();
$query = new MovieSql();
$result=$query->listMovies();
$movie_result=json_decode($result);
$length=count($movie_result);
for($i=0;$i<$length;$i++){
    $new_result=$movie_result[$i];
    $movie_id=$movie_result[$i]->movie_id;
    $image=json_decode($query->getMovieSearchImages($movie_id));

    $new_result->url=$image[0]->image_name;

    $arr[]=$new_result;        
}
$result1=json_encode($arr);
if($result1!=""){
	echo $result1;
}else{
	echo "Nothing";
}


?>