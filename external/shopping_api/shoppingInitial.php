<?php
include_once('../../core/CartSql.php');
include_once('../../core/SessionSql.php');
include_once('../../core/MovieSql.php');
include_once('../../core/GoodsSql.php');
include_once('../../core/UserSql.php');
session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
    //die("You have no permission.");
//}

error_reporting(0);

$return_data=array();
//$user_id=$_SESSION["user_id"];

$data=$_POST['sendData'];
$data=json_decode($data);
$user_name=$data[0]->username;
//$res=array("name"=>$user_name);
//echo $user_name;

$person=new UserSql;
$user_id=$person->getUserID($user_name);
//echo $user_id;

$query1= new CartSql;
$cartInfo=json_decode($query1->FindCartInfo($user_id));
//echo $query1->FindCartInfo($user_id);
$goodsInfo=json_decode($query1->FindCartGoodsInfo($user_id));
//echo $query1->FindCartGoodsInfo($user_id);

$ticketInfo=json_decode($query1->FindCartTicketInfo($user_id));
//echo $query1->FindCartTicketInfo($user_id);
if($ticketInfo!=''){

    $session_id=$cartInfo[0]->session_id;
    //echo $session_id;

    $length=count($ticketInfo);
    //echo $length;
    for($i=0;$i<$length;$i++){

	if($ticketInfo[$i]->ticket_type_id=="1"){
		$adult_ticket_number=$ticketInfo[$i]->quantity;
	}
	if($ticketInfo[$i]->ticket_type_id=="2"){
		$senior_ticket_number=$ticketInfo[$i]->quantity;
	}
	if($ticketInfo[$i]->ticket_type_id=="3"){
		$child_ticket_number=$ticketInfo[$i]->quantity;
	}
    }
    //echo $child_ticket_number;
    $query2=new SessionSql;
    $sessionInfo=json_decode($query2->findSessionByID($session_id));
    $movie_id=$sessionInfo[0]->movie_id;


    $query_movie = new MovieSql;
    
    $ticket_prices=json_decode($query_movie->findMoviePriceByMovieIDAndType($movie_id));
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
    //echo $senior_ticket_price;
    $movie_date=$sessionInfo[0]->date;
    //echo $movie_date;
    $movie_time=$sessionInfo[0]->time_flag;
    //echo $movie_time;
    //$query3 = new MovieSql;
   // $movieInfo=json_decode( 
    $movieInfo=json_decode( $query_movie->findMovieByID($movie_id));
    $name=$movieInfo[0]->name;
    $imageInfo=json_decode($query_movie->getMovieCartImages($movie_id));

    $url=$imageInfo[0]->image_name;
    //echo $url;
    //$movie=array();
    $movie[0]->url= $url;
    $movie[0]->movie_id=$movie_id;
    $movie[0]->session_id=$session_id;
    $movie[0]->name=$name;
    $movie[0]->movie_date=$movie_date;
    $movie[0]->movie_time=$movie_time;
    $movie[0]->senior_price=$senior_ticket_price;
    $movie[0]->adult_price=$adult_ticket_price;
    $movie[0]->child_price=$child_ticket_price;
    $movie[0]->senior_ticket_num=$senior_ticket_number;
    $movie[0]->adult_ticket_num=$adult_ticket_number;
    $movie[0]->child_ticket_num=$child_ticket_number;
     //echo $movie[0]->child_ticket_num;
    $return_data[0]->movie=$movie;
    //echo json_encode($return_data);

}

if($goodsInfo!=""){
     $length_of_food=count($goodsInfo);
     $goods_arr = array();
     for($i=0;$i<$length_of_food;$i++){
        $goods_id=$goodsInfo[$i]->goods_id;
     	$query_food=new GoodsSql;
     	$goods_result=json_decode($query_food->findGoodsByID($goods_id));
     	$goods_name=$goods_result[0]->goods_name;

        $goods_id=$goods_id;
     	$url=$goods_result[0]->image_name;
     	$price=$goods_result[0]->price;
        $quantity=$goodsInfo[$i]->quantity;
        // $goods_arr[]=$goods;
        

        pushGoods($goods_name, $goods_id, $url, $price, $quantity);

     }
     $return_data[0]->goods=$goods_arr;
	
}

function pushGoods($goods_name, $goods_id, $url, $price, $quantity ){
    global $goods_arr;
    $goods;
    $goods->goods_name=$goods_name;
    $goods->goods_id=$goods_id;
    $goods->url=$url;
    $goods->price=$price;
    $goods->quantity=$quantity;
    array_push($goods_arr, $goods);
}


echo json_encode($return_data);


?>