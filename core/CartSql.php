<?php
include_once('MysqlConnector.php');

Class CartSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    /*function findMoviePriceByID($movieID,$ticketTypeID){
        $sql = sprintf("SELECT price  from ticket_price where movie_id = '%s' and ticket_type_id= '%s'", $movieID,$ticketTypeID);
        $result = $this->conn->query_json($sql);
        return $result;
    }*/
    function GetUserinCarts($user_id){
         $sql = sprintf("SELECT user_id  from carts where user_id = '%s'", $user_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function AddCart($user_id,$number_tickets,$session_id,$total_amount)
    {
     
        $sql = sprintf("INSERT into carts (user_id, number_tickets,session_id,total_amount) values ('%s','%s', '%s', '%s')",$user_id,$number_tickets,$session_id,$total_amount);
          $result=$this->conn->query($sql);
          
          return $result;
       
      
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


    function Modify_cart_tickets_detail($user_id,$ticket_type_id,$price,$quantity)
    {
     
        $sql = sprintf("UPDATE cart_tickets_detail SET price='%s',quantity='%s' WHERE user_id='%s' AND ticket_type_id='%s'", $price,$quantity,$user_id,$ticket_type_id);

        return $this->conn->query($sql);
       
      
    }


}


?>