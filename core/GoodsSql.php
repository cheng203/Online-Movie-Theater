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
        $sql = sprintf("SELECT *  from goods natural join image_library where goods_id = '%s'", $GoodsID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function addGoods($goods_name,$price)
    {
     
        $sql = sprintf("INSERT into goods values(null, '%s', '%f')",$goods_name,$price);
        return $this->conn->query($sql);
   
       
    }
    function deleteGooodsByID($goods_id){
    	$sql = sprintf("DELETE from goods WHERE goods_id = '%s'", $goods_id);
        return $this->conn->query($sql);

    }
    function modifyGoodsByID($goods_id,$goods_name,$price){

       
        $sql = sprintf("UPDATE goods SET goods_name='%s',price='%s' WHERE goods_id='%s'", $goods_name,$price, $goods_id);
        return $this->conn->query($sql);
        
    }

   function listAllfoods(){
    $sql = sprintf("SELECT *  from goods where 1");
        $result = $this->conn->query_json($sql);
        return $result;

   }

   function listGoods(){
    $sql = sprintf("select * from `goods` natural join `image_library` where 1");
    return $this->conn->query_json($sql);
   }

   function setGoodsImages($goodsImageList){
    foreach($goodsImageList as $goods){
        $imgidlist = explode(",", $goods->imgidlist)[0];
        $sql = sprintf("update `goods` set `image_id`='%s' where `goods_id`='%s'",  $imgidlist, $goods->goods_id);
        if(!$this->conn->query($sql)){
            return false;
        }
    }        
    return true;
}


}





?>
