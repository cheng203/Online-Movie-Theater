<?php
include_once('../../core/MovieSql.php');

session_start();


$name = $_POST['key'];
$query = new MovieSql();
$result=$query->findMovieByName($name);
$movie_result=json_decode($result);
if($movie_result!=""){
	$length=count($movie_result);
for($i=0;$i<$length;$i++){
 
    $movie_id=$movie_result[$i]->movie_id;
    $image=json_decode($query->getMovieSearchImages($movie_id));
    $new_result->movie_id=$movie_result[$i]->movie_id;
    $new_result->name=$movie_result[$i]->name;
    $new_result->url=$image[0]->image_name;

    $arr[]=$new_result;        
   }
   $result1=json_encode($arr);
   if($result1!=""){
	   echo $result1;
   }else{
	  echo "Nothing";
   }

}else{
  $result1=array();
	echo $result1;
}



?>