<?php
include_once('../../core/CartSql.php');
//include_once('../core/SessionSql.php');
include_once('../../core/GoodsSql.php');
include_once('../../core/UserSql.php');
session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
    //die("You have no permission.");
//}
//get json data
$test = $_POST['sendData'];
$data=json_decode($test);
$user_name=$data[0]->username;
$goods_id=$data[0]->food_id;
$quantity=$data[0]->quantity;

$person=new UserSql;
$user_id=$person->getUserID($user_name);

//$user_id=$result_person[0]->person_id;
//$user_id="4";

$query = new CartSql();
$query_goods = new GoodsSql();
$result_goods=json_decode($query_goods->findGoodsPriceByID($goods_id));
$goods_price=$result_goods[0]->price;
//echo $goods_price;

$result=$query->GetUserinCart_goods_detail($user_id,$goods_id);
if($result==''){

      $result_user_in_carts=$query->GetUserinCarts($user_id);
 
      if($result_user_in_carts==''){
      	     

            $result_add_cart=$query->AddOnlyGoodinCart($user_id,$goods_price);
            $result_add_goods_detail=$query->Add_cart_goods_detail($user_id,$goods_id,$quantity);
            if($result_add_cart==TRUE&&$result_add_goods_detail==TRUE){

                         
		                  echo "1";
	         }else{
	    	            echo "0";
	         }

      }else{

 	         $result_add_goods_detail=$query->Add_cart_goods_detail($user_id,$goods_id,$quantity);
 	         $result_modify_cart=$query->ModifyCartAmount($user_id,$goods_price);
 	         if($result_modify_cart==TRUE&&$result_add_goods_detail==TRUE){
		                  echo "1";
	         }else{
	    	            echo "0";
	         }


      }

}else{
	    $result_add_one_goods=$query->AddOneGoodsInCart($user_id,$goods_id);
	    $result_add_goods_amount=$query->ModifyCartAmount($user_id,$goods_price);
	    if($result_add_one_goods==TRUE&&$result_add_goods_amount==TRUE){
		echo "1";
	    }


}





?>