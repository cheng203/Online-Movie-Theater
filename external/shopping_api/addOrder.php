<?php
include_once('../../core/OrderSql.php');
include_once('../../core/SessionSql.php');
include_once('../../core/MovieSql.php');
include_once('../../core/CartSql.php');
include_once('../../core/UserSql.php');
session_start();

//get json data
$test = $_POST['sendData'];
$data=json_decode($test);



$userSql = new UserSql();
//get parameters
$user_name=$_SESSION["username"];
$user_id=$userSql->getUserID($user_name);
$movie_info=$data->movie;
$goods_info=$data->goods;

$total_amount_info=$data->total_cost;
$total_amount=$total_amount_info[0]->total_cost;


$session_id=$movie_info[0]->session_id;
$movie_id=$movie_info[0]->movie_id;
$movie_name=$movie_info[0]->name;
$movie_date=$movie_info[0]->movie_date;
$movie_time_flag=$movie_info[0]->movie_time_flag;

$adult_quantity=$movie_info[0]->adult_num;
$senior_quantity=$movie_info[0]->senior_num;
$child_quantity=$movie_info[0]->child_num;

/*$adult_ticket_price=$data[0]->adult_price;
$senior_ticket_price=$data[0]->senior_price;
$children_ticket_price=$data[0]->child_price;*/
//echo $adult_quantity;
//echo $senior_quantity;
//echo $children_quantity;
//echo $adult_ticket_price;

$ticket_type_id_adult=1;
$ticket_type_id_senior=2;
$ticket_type_id_children=3;

$number_tickets=$adult_quantity+$senior_quantity+$child_quantity;





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

$return_flag=-1;





if($movie_info!=""){

    $query1=new SessionSql();
    $result1=$query1->findSessionByID($session_id);
    $arr=json_decode($result1);
    $available="available";
    $movie_info="movie_id";
    $seat_num=$arr[0]->$available;
    $movie_id=$arr[0]->$movie_info;
    $available_new=$seat_num-$number_tickets;
    //echo $available_new;
    if($available_new<0){
      $return_flag=0;
        echo "0";
    }else{
          $query = new OrderSql();
          $order_id=$query->AddOrder($user_id,$number_tickets,$session_id,$total_amount);
          $result2=$query1->modifySessionSeatsByID($session_id,$available_new);
          if($result2!=True){
            
               echo "-1";
          }

         if($order_id==0){
                   echo "-2";
          }else{
                $result_ticket1=$query->Add_order_tickets_detail($order_id,$ticket_type_id_adult,$adult_ticket_price,$adult_quantity);
                $result_ticket2=$query->Add_order_tickets_detail($order_id,$ticket_type_id_senior,$senior_ticket_price,$senior_quantity);
                $result_ticket3=$query->Add_order_tickets_detail($order_id,$ticket_type_id_children,$child_ticket_price,$child_quantity);
 
              if($result_ticket1=True&&$result_ticket2==True&&$result_ticket3==True){
                            $return_flag=1;
                }else{
                  echo "-3 ";
                }
              

              if($goods_info!=""){

                      $goods_length=count($goods_info);

                      for($i=0;$i<$goods_length;$i++){
                        $goods_id=$goods_info[$i]->goods_id;
                        $goods_quantity=$goods_info[$i]->quantity;
                        $result_goods=$query->Add_order_goods_detail($order_id,$goods_id,$goods_quantity);
                        if($result_goods!=TRUE){
                          echo "-4";
                        }else{
                          $return_flag=1;
                        }
    
                      }

                }
          }
        

    }

  }else{
          $query = new OrderSql();
          
          $number_tickets=0;
          $order_id=$query->AddOnlyGoodsinOrder($user_id,$number_tickets,$total_amount);
          //AddOrder($user_id,$number_tickets,$session_id,$total_amount);
          if($order_id==0){
                   echo "-2";
          }else{
                  $goods_length=count($goods_info);

                  for($i=0;$i<$goods_length;$i++){
                        $goods_id=$goods_info[$i]->goods_id;
                        $goods_quantity=$goods_info[$i]->quantity;
                        $result_goods=$query->Add_order_goods_detail($order_id,$goods_id,$goods_quantity);
                        if($result_goods!=TRUE){
                          echo "-4";
                        }else{
                          $return_flag=1;
                        }
    
                  }
           

          }

    



   }
if($return_flag==1){
  $query_cart=new CartSql;
  $result_delete_goods=$query_cart->DeleteCart_goods_detail($user_id);
  $result_delete_tickets=$query_cart->DeleteCart_tickets_detail($user_id);
  $result_delete_cart=$query_cart->DeleteCart($user_id);
  if($result_delete_goods==TRUE&&$result_delete_tickets==TRUE&&$result_delete_cart==TRUE){
    echo $return_flag;
  }

}






?>