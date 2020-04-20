<?php
include_once('../../core/OrderSql.php');
include_once('../../core/SessionSql.php');
//include_once('../core/MovieSql.php');
session_start();

//get json data
$test = $_POST['sendData'];
$data=json_decode($test);

//get parameters
$user_id=$_SESSION["user_id"];
//$user_id="1";
$session_id=$data[0]->session_id;

$adult_quantity=$data[0]->adult_ticket_num;
$senior_quantity=$data[0]->senior_ticket_num;
$children_quantity=$data[0]->child_ticket_num;

$adult_ticket_price=$data[0]->adult_price;
$senior_ticket_price=$data[0]->senior_price;
$children_ticket_price=$data[0]->child_price;
//echo $adult_quantity;
//echo $senior_quantity;
//echo $children_quantity;
//echo $adult_ticket_price;

$ticket_type_id_adult=1;
$ticket_type_id_senior=2;
$ticket_type_id_children=3;

$number_tickets=$adult_quantity+$senior_quantity+$children_quantity;

$goods_id1=1;
$goods_quantity1=$data[1]->adult_ticket_num;
$goods_id2=2;
$goods_quantity2=$data[1]->senior_ticket_num;
$goods_id3=3;
$goods_quantity3=$data[1]->child_ticket_num;

$goods1_price=$data[1]->adult_price;
$goods2_price=$data[1]->senior_price;
$goods3_price=$data[1]->child_price;

$total_amount=$adult_quantity*$adult_ticket_price+$senior_quantity*$senior_ticket_price+$children_quantity*$children_ticket_price+$goods_quantity1*$goods1_price+$goods_quantity2*$goods2_price+$goods_quantity3*$goods3_price;
//echo $total_amount;
    $query1=new SessionSql();
    $result1=$query1->findSessionByID($session_id);
    $arr=json_decode($result1);
    $available="available";
    $movie_info="movie_id";
    $seat_num=$arr[0]->$available;
    $movie_id=$arr[0]->$movie_info;
    $available_new=$seat_num-$number_tickets;
    if($available_new<0){
        echo "There are not enough seats";
    }else{
       $query = new OrderSql();
       $order_id=$query->AddOrder($user_id,$number_tickets,$session_id,$total_amount);
       $result2=$query1->modifySessionSeatsByID($session_id,$available_new);
       if($result2==True){
                echo "Order is added and available seat is updated";
       }else{
            echo "Available seat is not updated";
       } 
       if($order_id==0){
            echo "There is Error";
       }else{
            $result_goods1=$query->Add_order_goods_detail($order_id,$goods_id1,$goods_quantity1);
            $result_goods2=$query->Add_order_goods_detail($order_id,$goods_id2,$goods_quantity2);
            $result_goods3=$query->Add_order_goods_detail($order_id,$goods_id3,$goods_quantity3);
            if($result_goods1==True&&$result_goods2==True&&$result_goods3==True){
                     echo "Goods Order is added ";
                }else{
                       echo "Goods order is not added ";
                }
        }

        $result_ticket1=$query->Add_order_tickets_detail($order_id,$ticket_type_id_adult,$adult_ticket_price,$adult_quantity);
        $result_ticket2=$query->Add_order_tickets_detail($order_id,$ticket_type_id_senior,$senior_ticket_price,$senior_quantity);
        $result_ticket3=$query->Add_order_tickets_detail($order_id,$ticket_type_id_children,$children_ticket_price,$children_quantity);
 
        if($result_ticket1==True&&$result_ticket2==True&&$result_ticket3==True){
            echo "Tickets Order is added ";
        }else{
            echo "Tickets order is not added ";
        }
    







   }







?>