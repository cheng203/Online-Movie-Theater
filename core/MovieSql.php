<?php
include_once('MysqlConnector.php');

Class MovieSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    function findMoviePriceByID($movieID,$ticketTypeID){
        $sql = sprintf("SELECT price  from ticket_price where movie_id = '%s', ticket_type_id= '%s'", $movieID,$ticketTypeID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findMovieByName($name){
        $sql = sprintf("SELECT *  from movies where name = '%s'", $name);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findMovieByID($movieID){
        $sql = sprintf("SELECT *  from movies where movie_id = '%s'", $movieID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function addMovie($name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url)
    {
     
        $sql = sprintf("INSERT into movies values(null, '%s', '%s', '%s', '%s','%s','%s','%s','%s','%s')",$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url);
        return $this->conn->query($sql);
   
       
    }
    function deleteMovieByID($movieID){
    	$sql = sprintf("DELETE from movies WHERE movie_id = '%s'", $movieID);
        return $this->conn->query($sql);

    }
    function modifyMovieByID($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url){

       
        $sql = sprintf("UPDATE movies SET name='%s',type_name='%s',release_date='%s',off_date='%s',director='%s',info='%s',duration='%s',rating='%s',url='%s' WHERE movie_id='%s'", $name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating,$url, $movieID);
        return $this->conn->query($sql);
        
    }




}





?>
