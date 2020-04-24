<?php
include_once('MysqlConnector.php');

Class CartSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    
    function GetUserinCarts($user_id){
         $sql = sprintf("SELECT user_id  from carts where user_id = '%s'", $user_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function FindCartInfo($user_id){
        $sql = sprintf("SELECT * from carts where user_id = '%s'", $user_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }
    function FindCartGoodsInfo($user_id){
         $sql = sprintf("SELECT * from cart_goods_detail where user_id = '%s'", $user_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }
     function FindCartTicketInfo($user_id){
         $sql = sprintf("SELECT * from cart_tickets_detail where user_id = '%s'", $user_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }


    function ModifyCartAmount($user_id,$good_amount){
        $sql=  sprintf("UPDATE carts SET total_amount=total_amount+'%s' WHERE user_id='%s'", $good_amount,$user_id);

        return $this->conn->query($sql);
    }
    function ModifyCartSessionAndAmount($user_id,$ticket_num,$session_id,$ticket_amount){
        $sql=  sprintf("UPDATE carts SET number_tickets=number_tickets+'%s', session_id='%s',total_amount=total_amount+'%s' WHERE user_id='%s'", $ticket_num,$session_id,$ticket_amount,$user_id);

        return $this->conn->query($sql);
    }
    


    function GetUserinCart_goods_detail($user_id,$goods_id){
         $sql = sprintf("SELECT user_id  from cart_goods_detail where user_id = '%s' and goods_id='%s'", $user_id,$goods_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }
    function GetUserinCart_tickets_detail($user_id,$ticket_type_id){
         $sql = sprintf("SELECT user_id  from cart_tickets_detail where user_id = '%s' and ticket_type_id='%s'", $user_id,$ticket_type_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }
//
    function AddOneGoodsInCart($user_id,$goods_id){
     
        $sql=  sprintf("UPDATE cart_goods_detail SET quantity=quantity+1 WHERE user_id='%s' and goods_id='%s'", $user_id,$goods_id);

        return $this->conn->query($sql);
    }

    function AddOneTicketInCart($user_id,$ticket_type_id){
        
        $sql=  sprintf("UPDATE cart_tickets_detail SET quantity=quantity+1 WHERE user_id='%s' and ticket_type_id='%s'", $user_id,$ticket_type_id);

        return $this->conn->query($sql);
    }



    function AddCart($user_id,$number_tickets,$session_id,$total_amount)
    {
     
        $sql = sprintf("INSERT into carts (user_id, number_tickets,session_id,total_amount) values ('%s','%s', '%s', '%s')",$user_id,$number_tickets,$session_id,$total_amount);
          $result=$this->conn->query($sql);
          
          return $result;
       
      
    }

    function AddOnlyGoodinCart($user_id,$total_amount)
    {
     
        $sql = sprintf("INSERT into carts (user_id, total_amount) values ('%s','%s')",$user_id,$total_amount);
          $result=$this->conn->query($sql);
          
          return $result;
       
      
    }
    
    function DeleteCart($user_id){
        $sql = sprintf("DELETE from carts WHERE user_id = '%s'", $user_id);
        return $this->conn->query($sql);
    }

    function ModifyCart($user_id,$number_tickets,$session_id,$total_amount)
    {
     
        $sql = sprintf("UPDATE carts SET number_tickets='%s',session_id='%s',total_amount='%s' WHERE user_id='%s'", $number_tickets,$session_id,$total_amount, $user_id);

        return $this->conn->query($sql);
       
      
    }

    function Add_cart_goods_detail($user_id,$goods_id,$quantity){
    	$sql = sprintf("INSERT into cart_goods_detail values ('%s','%s', '%s')",$user_id,$goods_id,$quantity);
        $result=$this->conn->query($sql);
          
        return $result;

    }
    //
   function DeleteCart_goods_detail($user_id){
        $sql = sprintf("DELETE from cart_goods_detail WHERE user_id = '%s'", $user_id);
        return $this->conn->query($sql);
    }

    function Modify_cart_goods_detail($user_id,$goods_id,$quantity)
    {
     
        $sql = sprintf("UPDATE cart_goods_detail SET quantity='%s' WHERE user_id='%s' AND goods_id='%s'", $quantity, $user_id,$goods_id);

        return $this->conn->query($sql);
       
      
    }


    function Add_cart_tickets_detail($user_id,$ticket_type_id,$price,$quantity)
    {
    	$sql = sprintf("INSERT into cart_tickets_detail values ('%s','%s', '%s','%s')",$user_id,$ticket_type_id,$price,$quantity);
        $result=$this->conn->query($sql);
          
        return $result;

    }
    //

     function DeleteCart_tickets_detail($user_id){
        $sql = sprintf("DELETE from cart_tickets_detail WHERE user_id = '%s'", $user_id);
        return $this->conn->query($sql);
    }


    function Modify_cart_tickets_detail($user_id,$ticket_type_id,$price,$quantity)
    {
     
        $sql = sprintf("UPDATE cart_tickets_detail SET price='%s',quantity='%s' WHERE user_id='%s' AND ticket_type_id='%s'", $price,$quantity,$user_id,$ticket_type_id);

        return $this->conn->query($sql);
       
      
    }


}


?>