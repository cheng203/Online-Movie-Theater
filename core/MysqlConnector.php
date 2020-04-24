<?php
class MysqlConnector{
    private $servername;
    private $dbname;
    private $username;
    private $password;
    function __construct($servername, $username, $password, $dbname){
        $this->servername = $servername;
        $this->dbname = $dbname;
        $this->username = $username;
        $this->password = $password;

    }

    function query($sql){
        $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);
        if(!$conn){
            die("Connection failed: " . mysqli_connect_error());
        }
        $result = mysqli_query($conn, $sql);
        $conn->close();
        return $result;
    }

    function query_json($sql){
        $result = $this->query($sql);
        if($result){
            if($result->num_rows>0){
                while($r = mysqli_fetch_assoc($result)){
                    $arr[] = $r; 
                }
                return json_encode($arr);
            }
            else
                return "";
        }
        else{
            return false;
        }
    }

    function get_insert_id($sql){
        $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);
        if(!$conn){
            die("Connection failed: " . mysqli_connect_error());
        }
        $result = mysqli_query($conn, $sql);
        if($result==true){
            $last_id = mysqli_insert_id($conn);
            
        }else{
            $last_id= 0;
        }
        $conn->close();
        return $last_id;

    }
}




?>