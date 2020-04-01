<?php
include_once('../core/MysqlConnector.php');

Class UserSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }

    function findUser($username){
        $sql = sprintf("select person_id, username, email  from persons where username = '%s'", $username);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findEmail($email){
        $sql = sprintf("select person_id, username, email  from persons where email = '%s'", $email);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function insertUser($person_type, $username, $password_hash, $email){
        $sql = sprintf("insert into persons values(null, '%s', '%s', '%s', '%s')", $person_type, $username, $password_hash, $email);
        return $this->conn->query($sql);
    }
}
?>



