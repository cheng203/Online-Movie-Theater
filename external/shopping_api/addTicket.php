<?php
include_once('../../core/CartSql.php');
include_once('../../core/MovieSql.php');
include_once('../../core/UserSql.php');
include_once('../../core/SessionSql.php');
session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
    //die("You have no permission.");
//}
//get json data
$test = $_POST['sendData'];
$data=json_decode($test);


$user_name=$data[0]->username;

$date=$data[0]->date;

$movie_id=$data[0]->movie_id;
$adult_ticket_number=$data[0]->adult_ticket_number;
$senior_ticket_number=$data[0]->senior_ticket_number;
$child_ticket_number=$data[0]->child_ticket_number;
//$ticket_number=array($adult_ticket_number,$senior_ticket_number,$child_ticket_number);
$total_ticket_number=$adult_ticket_number+$senior_ticket_number+$child_ticket_number;

$adult_ticket_id="1";
$senior_ticket_id="2";
$child_ticket_id="3";
//$ticket_id=array(1,2,3);
//echo $ticket_id[0];

$time=$data[0]->time;
$time = $time[0];

$session_id=$time->session_id;
//If there are enough available seats
$session_query=new SessionSql;


$session_info=json_decode($session_query->findSessionByID($session_id));
$available_num=$session_info[0]->available;
if($available_num<$total_ticket_number){
	echo "0";
}else{




$person=new UserSql;
$user_id=$person->getUserID($user_name);

$query = new CartSql();
$query_movie = new MovieSql();
$ticket_prices=json_decode( $query_movie->findMoviePriceByMovieIDAndType($movie_id));

//$ticket_price_array=array(0,0,0);

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


/*for($j=0;$j<3;$j++){
	$result1=$query->GetUserinCart_tickets_detail($user_id,$ticket_id[$j]);
    $some_ticket_amount=$ticket_price[$j]*$ticket_number[$j];
    if($result1==''){

      $result_user_in_carts=$query->GetUserinCarts($user_id);
 
      if($result_user_in_carts==''){


}*/
//add Adult tickets
$adult_flag=0;
$senior_flag=0;
$child_flag=0;
$result1=$query->GetUserinCart_tickets_detail($user_id,$adult_ticket_id);
$adult_ticket_amount=$adult_ticket_price*$adult_ticket_number;

if($result1==''){

      $result_user_in_carts=$query->GetUserinCarts($user_id);
 
      if($result_user_in_carts==''){
      	    
      	    
            $result_add_cart=$query->AddCart($user_id,$adult_ticket_number,$session_id,$adult_ticket_amount);
            $result_add_tickets_detail=$query->Add_cart_tickets_detail($user_id,$adult_ticket_id,$adult_ticket_price,$adult_ticket_number);
            if($result_add_cart==TRUE&&$result_add_tickets_detail==TRUE){
		                  $adult_flag=1;
	         }else{
	    	            echo "Fail";
	         }

      }else{

 	         $result_add_tickets_detail=$query->Add_cart_tickets_detail($user_id,$adult_ticket_id,$adult_ticket_price,$adult_ticket_number);
 	         $result_modify_cart=$query->ModifyCartSessionAndAmount($user_id,$adult_ticket_number,$session_id,$adult_ticket_amount);
 	         if($result_modify_cart==TRUE&&$result_add_tickets_detail==TRUE){
		                  $adult_flag=1;
	         }else{
	    	            echo "Fail";
	         }


      }

}else{
	    $result_add_one_tickets=$query->AddOneTicketInCart($user_id,$adult_ticket_id);
	    $result_add_tickets_amount=$query->ModifyCartSessionAndAmount($user_id,$adult_ticket_number,$session_id,$adult_ticket_amount);
	    if($result_add_one_tickets==TRUE&&$result_add_tickets_amount==TRUE){
		           $adult_flag=1;
	    }else{
	    	            echo "Fail";
	         }


}


//add senior tickets
$result2=$query->GetUserinCart_tickets_detail($user_id,$senior_ticket_id);
$senior_ticket_amount=$senior_ticket_price*$senior_ticket_number;

if($result2==''){

      //$result2_user_in_carts=$query->GetUserinCarts($user_id);
 
      

 	         $result_add_tickets_detail=$query->Add_cart_tickets_detail($user_id,$senior_ticket_id,$senior_ticket_price,$senior_ticket_number);
 	         $result_modify_cart=$query->ModifyCartSessionAndAmount($user_id,$senior_ticket_number,$session_id,$senior_ticket_amount);
 	         if($result_modify_cart==TRUE&&$result_add_tickets_detail==TRUE){
		                  $senior_flag=1;
	         }else{
	    	            echo "0";
	         }


      

}else{
	    $result_add_one_tickets=$query->AddOneTicketInCart($user_id,$senior_ticket_id);
	    $result_add_tickets_amount=$query->ModifyCartSessionAndAmount($user_id,$senior_ticket_number,$session_id,$senior_ticket_amount);
	    if($result_add_one_tickets==TRUE&&$result_add_tickets_amount==TRUE){
		   
                  $senior_flag=1;

	    }else{
	    	            echo "Fail";
	         }


}


//add child tickets
$result3=$query->GetUserinCart_tickets_detail($user_id,$child_ticket_id);
$child_ticket_amount=$child_ticket_price*$child_ticket_number;

if($result2==''){

      //$result2_user_in_carts=$query->GetUserinCarts($user_id);
 
      

 	         $result_add_tickets_detail=$query->Add_cart_tickets_detail($user_id,$child_ticket_id,$child_ticket_price,$child_ticket_number);
 	         $result_modify_cart=$query->ModifyCartSessionAndAmount($user_id,$child_ticket_number,$session_id,$child_ticket_amount);
 	         if($result_modify_cart==TRUE&&$result_add_tickets_detail==TRUE){
		                  $child_flag=1;
	         }else{
	    	            echo "Fail";
	         }


      

}else{
	    $result_add_one_tickets=$query->AddOneTicketInCart($user_id,$child_ticket_id);
	    $result_add_tickets_amount=$query->ModifyCartSessionAndAmount($user_id,$child_ticket_number,$session_id,$child_ticket_amount);
	    if($result_add_one_tickets==TRUE&&$result_add_tickets_amount==TRUE){
		
                  $child_flag=1;

	    }else{
	    	            echo "Fail";
	         }


}

}
if( $child_flag==1&& $adult_flag==1&& $senior_flag==1){
	echo 1;
}else{
	echo 0;
}

?>

 