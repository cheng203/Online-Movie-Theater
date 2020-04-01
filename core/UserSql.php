<?php
include_once('core/MysqlConnector');

Class UserSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }

    function findUser($username){
        $sql = "select username, email  from persons where username = $username";
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findEmail($email){
        $sql = "select username, email  from persons where email = $email";
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function insertUser($person_type, $username, $password_hash, $email){
        $sql = "insert into persons values(null, $person_type, $username, $password_hash, $email)";
        return $this->conn->query($sql);
    }

}


?>



