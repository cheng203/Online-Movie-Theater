<?php
include_once('../core/MysqlConnector.php');

Class MovieSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    function findMPrice($movieID,$ticketTypeID){
        $sql = sprintf("SELECT price  from ticket_price where movie_id = '%s', ticket_type_id= '%s'", $movieID,$ticketTypeID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function Movie_info($movieID){
        $sql = sprintf("SELECT *  from movies where movie_id = '%s'", $movieID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function addMovie($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url)
    {
     
        $sql = sprintf("INSERT into movies(movie_id,name,type_name,release_date,off_date,director,info,duration,rating,url) values(null, '%s', '%s', '%s', '%s','%s','%s','%s','%s','%s')", $movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url);
        return $this->conn->query($sql);
   
       
    }
    function deleteMovie($movieID){
    	$sql = sprintf("DELETE from movies WHERE movie_id = '%s'", $movieID);
        return $this->conn->query($sql);

    }
    function modifyMovie($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url){

       
        $sql = sprintf("UPDATE movies SET name='%s',type_name='%s',release_date='%s',off_date='%s',director='%s',info='%s',duration='%s',rating='%s',url='%s' WHERE movie_id='%s'", $name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url, $movieID);
        return $this->conn->query($sql);
        
    }




}





?>
