<?php
include_once('core/MysqlConnector.php');
class UserRegister{
        
    
}




$person_type = $POST['person_type'];
if($person_type==0&&($_SESSION['user_type']!=0)){
    die("You have no perssiom to create administrator account.");
}

$username = $POST['username'];
$password_hash = $_POST['password_hash'];
$email = $_POST['email'];




?>