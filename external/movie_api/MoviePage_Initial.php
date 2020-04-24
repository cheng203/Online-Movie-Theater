<?php
include_once('../../core/MovieSql.php');

session_start();

$test = $_POST['sendData'];
$data=json_decode($test);
$movie_id=$data[0]->movie_id;

$query = new MovieSql();
$movie_result=json_decode($query->findMovieByID($movie_id));



$ticket_prices=json_decode( $query->findMoviePriceByMovieIDAndType($movie_id));

for($i=0;$i<3;$i++){
  if($ticket_prices[$i]->ticket_name=="adult"){
    $adult_ticket_price=$ticket_prices[$i]->price;
  }
  if($ticket_prices[$i]->ticket_name=="children"){
    $child_ticket_price=$ticket_prices[$i]->price;
  }
  if($ticket_prices[$i]->ticket_name=="senior"){
    $senior_ticket_price=$ticket_prices[$i]->price;
  }
}

$movie_image=json_decode($query->getMovieMovieImages($movie_id));
$movie_stage=json_decode($query->getMovieStageImages($movie_id));
$movie_info=$movie_result[0];
$movie_result[0]->img_url=$movie_image[0]->image_name;
$movie_result[0]->stage_image=$movie_stage;
$movie_result[0]->adult_price=$adult_ticket_price;
$movie_result[0]->senior_price=$senior_ticket_price;
$movie_result[0]->child_price=$child_ticket_price;


$result=json_encode($movie_result);

if($result!=""){
	echo $result;
}else{
	echo "Nothing";
}




?>