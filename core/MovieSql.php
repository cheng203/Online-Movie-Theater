<?php
include_once('MysqlConnector.php');

Class MovieSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }

    function listTicketTypes(){
        $sql = sprintf("select * from `ticket_types` where 1");
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function getTicketTypeByName($ticketName){
        $sql = sprintf("select `ticket_type_id` from `ticket_types` where `ticket_name` = '%s'", $ticketName);
        return json_decode($this->conn->query_json($sql))[0]->ticket_type_id;
    }

    function setMoviePrice($movieID, $ticketTypeID, $price){
        $sql = sprintf("select * from `ticket_price` where `movie_id` = %s and `ticket_type_id` = %s", $movieID, $ticketTypeID);
        if($this->conn->query_json($sql)==""){
            $sql = sprintf("insert into `ticket_price` values('%s', '%s', '%s')", $movieID, $ticketTypeID, $price);
            $result = $this->conn->query($sql); 
        }
        else{
            $sql = sprintf("UPDATE `ticket_price` SET `price` = '%s' WHERE `ticket_price`.`movie_id` = '%s' AND `ticket_price`.`ticket_type_id` = '%s'", $price, $movieID, $ticketTypeID);
            $result = $this->conn->query($sql);
        }
        return $result;
    }

    function setMoviePrices($movieID, $adult, $senior, $children){
        $adultID =  $this->getTicketTypeByName("adult");
        $seniorID =  $this->getTicketTypeByName("senior");
        $childrenID =  $this->getTicketTypeByName("children");
        return $this->setMoviePrice($movieID, $adultID, $adult)&&$this->setMoviePrice($movieID, $seniorID, $senior) && $this->setMoviePrice($movieID, $childrenID, $children);
    }


    function findMoviePriceByMovieID($movieID){
        $sql = sprintf("select `movie_id`, `name`, `ticket_name`, `price` from `movies` natural join `ticket_price` natural join `ticket_types` where `movie_id` = %s", $movieID);
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

    function addMovie($name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating)
    {
     
        $sql = sprintf("INSERT into movies values(null, '%s', '%s', '%s', '%s','%s','%s','%s','%s')",$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating);
        return $this->conn->query($sql);
    }

    function deleteMovieByID($movieID){
    	$sql = sprintf("DELETE from movies WHERE movie_id = '%s'", $movieID);
        return $this->conn->query($sql);

    }

    function modifyMovieByID($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating){
        $sql = sprintf("UPDATE movies SET name='%s',type_name='%s',release_date='%s',off_date='%s',director='%s',info='%s',duration='%s',rating='%s' WHERE movie_id='%s'", $name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating, $movieID);
        return $this->conn->query($sql);
        
    }

    function listMovies(){
        $sql = sprintf("select * from movies where 1");
        return $this->conn->query_json($sql);
    }



}





?>
