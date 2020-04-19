<?php
include_once('../core/OrderSql.php');
include_once('../core/SessionSql.php');
include_once('../core/MovieSql.php');
session_start();

//get json data
$test = $_POST['test'];
$data=json_decode($test);

//get parameters
$user_id=$data->user_id;

$session_id=$data->session_id;

$adult_quantity=$data->tickets[0]->adult;
$senior_quantity=$data->tickets[1]->senior;
$children_quantity=$data->tickets[2]->children;

$number_tickets=$adult_quantity+$senior_quantity+$children_quantity;

$goods_id1=$data->goods[0]->goods_id;
$good_quantity1=$data->goods[0]->quantity;
$goods_id2=$data->goods[1]->goods_id;
$good_quantity2=$data->goods[1]->quantity;
$goods_id3=$data->goods[2]->goods_id;
$good_quantity3=$data->goods[2]->quantity;



$query = new OrderSql();
//Add order and get the id of order
$order_id=$query->AddOrder($user_id,$number_tickets,$session_id);

//update the available seats of session
if($order_id==0){
	echo "There is Error";
}else{
	$query1=new SessionSql();
	$result1=$query1->findSessionByID($session_id);
	$arr=json_decode($result1);
    $available="available";
    $movie_info="movie_id";
    $seat_num=$arr[0]->$available;
    $movie_id=$arr[0]->$movie_info;
    $available_new=$seat_num-$number_tickets;
    $result2=$query1->modifySessionSeatsByID($session_id,$available_new);
    if($result2==True){
    		echo "Order is added and available seat is updated";
    }else{
        	echo "Available seat is updated not updated";
    }

}

$result_goods1=$query->Add_order_goods_detail($order_id,$goods_id1,$good_quantity1);
$result_goods2=$query->Add_order_goods_detail($order_id,$goods_id2,$good_quantity2);
$result_goods3=$query->Add_order_goods_detail($order_id,$goods_id3,$good_quantity3);
if($result_goods1==True&$result_goods2==True&$result_goods3==True){
    		echo "Goods Order is added ";
    }else{
        	echo "Goods order is not added ";
 }

 $query2=new MovieSql();
 $tickets_info=$query2->findMoviePriceByMovieID($movie_id);
 if($tickets_info!=""){
 	echo "get movie ticket";
 }else{
 	echo"movie ticket wrong";
 }
 $tickets_infoarr=json_decode($tickets_info);

 for($y=0;$y<3;$y++){
 	if($tickets_infoarr[$y]->ticket_name == "adult"){
 		$adult_movie_price=$tickets_infoarr[$y]->price;

 	}

 	if($tickets_infoarr[$y]->ticket_name == "senior"){
 		$senior_movie_price=$tickets_infoarr[$y]->price;
 	}

 	if($tickets_infoarr[$y]->ticket_name == "children"){
 		$children_movie_price=$tickets_infoarr[$y]->price;
 	}
 }

 $result_ticket1=$query->Add_order_tickets_detail($order_id,1,$adult_movie_price,$adult_quantity);
 $result_ticket2=$query->Add_order_tickets_detail($order_id,2,$senior_movie_price,$senior_quantity);
 $result_ticket3=$query->Add_order_tickets_detail($order_id,3,$children_movie_price,$children_quantity);
 
if($result_ticket1==True&$result_ticket2==True&$result_ticket3==True){
    		echo "Tickets Order is added ";
    }else{
        	echo "Tickets order is not added ";
 }


?>