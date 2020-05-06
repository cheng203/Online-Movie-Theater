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

$return_data=array();
//$user_id=$_SESSION["user_id"];


$data=$_POST['sendData'];
$data = json_decode($data);


$user_name=$data[0]->username;
$res=array("name"=>$user_name);

$person=new UserSql;
$user_id=$person->getUserID($user_name);

$query1= new CartSql;
$cartInfo=json_decode($query1->FindCartInfo($user_id));

$goodsInfo=json_decode($query1->FindCartGoodsInfo($user_id));
//echo $query1->FindCartGoodsInfo($user_id);

$ticketInfo=json_decode($query1->FindCartTicketInfo($user_id));
//echo $query1->FindCartTicketInfo($user_id);
if($ticketInfo!=''){

    $session_id=$cartInfo[0]->session_id;

    $length=count($ticketInfo);
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

    $query2=new SessionSql;
    $sessionInfo=json_decode($query2->findSessionByID($session_id));
    $movie_id=$sessionInfo[0]->movie_id;

    $query_movie = new MovieSql();
    $ticket_prices=json_decode( $query_movie->findMoviePriceByMovieIDAndType($movie_id));


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

    $movie_date=$sessionInfo[0]->date;
//echo $date;
    $movie_time=$sessionInfo[0]->time_flag;
//echo $time_flag;
    $query3 = new MovieSql;
    $movieInfo=json_decode( $query3->findMovieByID($movie_id));
    $name=$movieInfo[0]->name;
    $imageInfo=json_decode($query3->getMovieCartImages($movie_id));
    $url=$imageInfo[0]->image_name;

    $movie["url"]=$url;
    $movie["movie_id"]=$movie_id;
    $movie["session_id"]=$session_id;
    $movie["name"]=$name;
    $movie["movie_date"]=$movie_date;
    $movie["movie_time"]=$movie_time;
    $movie["senior_price"]=$senior_ticket_price;
    $movie["adult_price"]=$adult_ticket_price;
    $movie["child_price"]=$child_ticket_price;
    $movie["senior_ticket_num"]=$senior_ticket_number;
    $movie["adult_ticket_num"]=$adult_ticket_number;
    $movie["child_ticket_num"]=$child_ticket_number;

    $return_data["movie"]=$movie;
    //echo json_encode($return_data);

}

if($goodsInfo!=""){
     $length_of_food=count($goodsInfo);

     for($i=0;$i<$length_of_food;$i++){
     	$goods_id=$goodsInfo[$i]->goods_id;
     	

     	$query_food=new GoodsSql;

     	$goods_result=json_decode($query_food->findGoodsByID($goods_id));
     	$goods->goods_name=$goods_result[0]->goods_name;
     	
     	$goods->url=$goods_result[0]->image_id;
     	$goods->price=$goods_result[0]->price;
        $goods->quantity=$goodsInfo[$i]->quantity;
     	$goods_arr[]=$goods;


     }
     $return_data->goods=$goods_arr;
	







}
echo json_encode($return_data);


?>