<?php
include_once('MysqlConnector.php');

Class RoomSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }
    

    function findRoomByName($room_name){
        $sql = sprintf("SELECT *  from rooms where room_name = '%s'", $room_name);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findRoomByID($room_id){
        $sql = sprintf("SELECT *  from rooms where room_id = '%s'", $room_id);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function listRooms()
    {
     
        $sql = sprintf("SELECT *  from rooms ");
        $result = $this->conn->query_json($sql);
        return $result;
   
       
    }

    function listRoomByDate($date){
         $sql = sprintf("SELECT *  from rooms_by_date where date = '%s' ", $date);
        $result = $this->conn->query_json($sql);
        return $result;

    }

    function findRoomByDate($room_id,$date){

        $result = $this->isRoomByDateCreated($room_id,$date);
        if($result==FALSE){
            
            $result1=$this->initRoomsByDate($room_id,$date);
            return $this->findRoomByDate($room_id,$date);
        }else{
            
            $sql = sprintf("SELECT *  from rooms_by_date where room_id ='%s' and date = '%s' ", $room_id, $date);
            $result = $this->conn->query_json($sql);
            return $result;
        }
        

    }

    function modifyRoomByDate($room_id,$date,$time_flag){
       
       $sql = sprintf("UPDATE rooms_by_date SET time_flag='%s' WHERE room_id='%s' and date='%s'", $time_flag,$room_id,$date);
        return $this->conn->query($sql);
        

    }

    function initRoomsByDate($room_id,$date){
        $time_flag="000000000000000000000000000000000000000000000000";
        //$time_flag="000000";
        $sql = sprintf("INSERT into rooms_by_date values('%s', '%s', '%s')",$room_id,$date,$time_flag);
        return $this->conn->query($sql);

        


    }

    function isRoomByDateCreated($room_id,$date){
        $createdFlage =FALSE;
        $sql = sprintf("SELECT *  from rooms_by_date where room_id = '%s' and date= '%s' ", $room_id,$date);
        $result = $this->conn->query_json($sql);
        if($result!=""){
            $createdFlage=TRUE;
        }

        return $createdFlage;

    }
    




}





?>
