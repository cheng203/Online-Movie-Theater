<?php
include_once('MysqlConnector.php');

Class SessionSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    /*function findMoviePriceByID($movieID,$ticketTypeID){
        $sql = sprintf("SELECT price  from ticket_price where movie_id = '%s' and ticket_type_id= '%s'", $movieID,$ticketTypeID);
        $result = $this->conn->query_json($sql);
        return $result;
    }*/

    /*function findMovieByName($name){
        $sql = sprintf("SELECT *  from movies where name = '%s'", $name);
        $result = $this->conn->query_json($sql);
        return $result;
    }*/

    function findSessionByID($session_id){
        $sql = sprintf("SELECT *  from sessions where session_id = '%s'", $session_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findSessionByMovieAndDate($movie_id,$date){
         $sql = sprintf("SELECT session_id,time_flag  from sessions where movie_id = '%s' and date='%s' ", $movie_id,$date);
        $result = $this->conn->query_json($sql);
        return $result;

    }

    function findSessionByMovie($movie_id){
         $sql = sprintf("SELECT room_id,date,time_flag, session_id from sessions where movie_id = '%s' ", $movie_id);
        $result = $this->conn->query_json($sql);
        return $result;

    }

    function addSession($movie_id,$room_id,$date,$time_flag,$available)
    {   
     
        $sql = sprintf("INSERT into sessions values(null, '%s', '%s', '%s', '%s', '%s')",$movie_id,$room_id,$date,$time_flag,$available);
        return $this->conn->query($sql);
   
       
    }
    function deleteSessionByID($session_id){
    	$sql = sprintf("DELETE from sessions WHERE session_id = '%s'", $session_id);
        return $this->conn->query($sql);

    }

    /*function deleteSessionByMovieID($movie_id){
        $sql = sprintf("DELETE from sessions WHERE movie_id = '%s'", $movie_id);
        return $this->conn->query($sql);

    }*/

    function modifySessionSeatsByID($session_id,$available){

       
        $sql = sprintf("UPDATE sessions SET available='%s' WHERE session_id='%s'", $available,$session_id);
        return $this->conn->query($sql);
        
    }




}





?>
