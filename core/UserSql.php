<?php
include_once('MysqlConnector.php');

Class UserSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }

    function findUser($username){
        $sql = sprintf("select person_type, person_id, username, email  from persons where username = '%s'", $username);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findEmail($email){
        $sql = sprintf("select person_type, person_id, username, email  from persons where email = '%s'", $email);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function insertUser($person_type, $username, $password_hash, $email){
        $sql = sprintf("insert into persons values(null, '%s', '%s', '%s', '%s')", $person_type, $username, $password_hash, $email);
        return $this->conn->query($sql);
    }

    function checkPasswordHash($username, $password_hash_input){
        $sql = sprintf("select password_hash from persons where username = '%s'", $username);
        $result = $this->conn->query_json($sql);
        if($result==""||$result==false){
            return false;
        }
        else{
            $jsonObj = json_decode($result);
            $password_hash_stored = $jsonObj[0]->password_hash;
            return ($password_hash_input == $password_hash_stored);
        }


    }

    function getUserType($username){
        $sql = sprintf("select person_type from persons where username = '%s'", $username);
        $result = $this->conn->query_json($sql);        
        if($result==""||$result==false){
            return false;
        }
        else{
            $jsonObj = json_decode($result);
            return $jsonObj[0]->person_type;
        }
    }

    function getUserID($username){
        $sql = sprintf("select person_id from persons where username = '%s'", $username);
        $result = $this->conn->query_json($sql);        
        if($result==""||$result==false){
            return false;
        }
        else{
            $jsonObj = json_decode($result);
            return $jsonObj[0]->person_id;
        }
    }
}
?>



