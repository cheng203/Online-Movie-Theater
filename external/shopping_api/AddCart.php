<?php
include_once('../../core/CartSql.php');
//include_once('../core/SessionSql.php');
//include_once('../core/MovieSql.php');
session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
    //die("You have no permission.");
//}
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

$query = new CartSql();

//If the user has already add goods or tickets in the shopping cart
$user_cart_info=$query->GetUserinCarts($user_id);
//echo $user_cart_info;
if($user_cart_info==''){
    $addCart_result=$query->AddCart($user_id,$number_tickets,$session_id,$total_amount);

    $addCart_goods_result1=$query->Add_cart_goods_detail($user_id,$goods_id1,$goods_quantity1);
    $addCart_goods_result2=$query->Add_cart_goods_detail($user_id,$goods_id2,$goods_quantity2);
    $addCart_goods_result3=$query->Add_cart_goods_detail($user_id,$goods_id3,$goods_quantity3);
    $addCart_adult_ticket_result=$query->Add_cart_tickets_detail($user_id,$ticket_type_id_adult,$adult_ticket_price,$adult_quantity);
    $addCart_senior_ticket_result=$query->Add_cart_tickets_detail($user_id,$ticket_type_id_senior,$senior_ticket_price,$senior_quantity);
    $addCart_children_ticket_result=$query->Add_cart_tickets_detail($user_id,$ticket_type_id_children,$children_ticket_price,$children_quantity);
  if($addCart_result==TURE&& $addCart_goods_result1==TURE&& $addCart_goods_result2==TURE&& $addCart_goods_result3==TURE&& $addCart_adult_ticket_result==TURE&& $addCart_senior_ticket_result==TURE&& $addCart_children_ticket_result==TURE){
    echo "Add successfully!";
  }else{
    echo "Error";
  }


}else{
    $modifyCart_result=$query->ModifyCart($user_id,$number_tickets,$session_id,$total_amount);

    $modifyCart_goods_result1=$query->Modify_cart_goods_detail($user_id,$goods_id1,$goods_quantity1);
    $modifyCart_goods_result2=$query->Modify_cart_goods_detail($user_id,$goods_id2,$goods_quantity2);
    $modifyCart_goods_result3=$query->Modify_cart_goods_detail($user_id,$goods_id3,$goods_quantity3);
    $modifyCart_adult_ticket_result=$query->Modify_cart_tickets_detail($user_id,$ticket_type_id_adult,$adult_ticket_price,$adult_quantity);
    $modifyCart_senior_ticket_result=$query->Modify_cart_tickets_detail($user_id,$ticket_type_id_senior,$senior_ticket_price,$senior_quantity);
    $modifyCart_children_ticket_result=$query->Modify_cart_tickets_detail($user_id,$ticket_type_id_children,$children_ticket_price,$children_quantity);

   if($modifyCart_result==TURE&& $modifyCart_goods_result1==TURE&& $modifyCart_goods_result2==TURE&& $modifyCart_goods_result3==TURE&& $modifyCart_adult_ticket_result==TURE&& $modifyCart_senior_ticket_result==TURE&& $modifyCart_children_ticket_result==TURE){
    echo "Modify successfully!";
  }else{
    echo "Error";
  }





}





?>