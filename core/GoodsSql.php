<?php
include_once('MysqlConnector.php');

Class GoodsSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    function findGoodsPriceByID($GoodsID){
        $sql = sprintf("SELECT price  from goods where goods_id = '%s'", $GoodsID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    /*function findMovieByName($name){
        $sql = sprintf("SELECT *  from movies where name = '%s'", $name);
        $result = $this->conn->query_json($sql);
        return $result;
    }*/

    function findGoodsByID($GoodsID){
        $sql = sprintf("SELECT *  from goods where goods_id = '%s'", $GoodsID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function addGoods($goods_name,$price)
    {
     
        $sql = sprintf("INSERT into goods values(null, '%s', '%f', '1')",$goods_name,$price);
        return $this->conn->query($sql);
   
       
    }
    function deleteGooodsByID($goods_id){
    	$sql = sprintf("DELETE from goods WHERE goods_id = '%s'", $goods_id);
        return $this->conn->query($sql);

    }
    function modifyMovieByID($goods_id,$goods_name,$price){

       
        $sql = sprintf("UPDATE goods SET goods_name='%s',price='%s' WHERE goods_id='%s'", $goods_name,$price, $goods_id);
        return $this->conn->query($sql);
        
    }




}





?>
