<?php
include_once('../core/UserSql.php');

/** person type
 * 0: administrator
 * 1: normal user
 */
$person_type = $_POST['person_type'];
if(($person_type==0&&(!isset($_SESSION['user_type'])||$_SESSION['user_type']!=0))){
    die("You have no perssiom to create administrator account.");
}

$username = $_POST['username'];
$password_hash = $_POST['password_hash'];
$email = $_POST['email'];

// $person_type = 1;
// $username = "sadmaaain";
// $password_hash = "abc";
// $email = "faaa@foso.com";


$register = new UserSql();

/**
 * 10: // username or email exists
 * 11: //success
 * 12: //(unkown) error
 */
// $status_code;


if($register->findUser($username)!=""||$register->findEmail($email)!=""){
    $status_code = 10; // username or email exists
}
else{
    if($register->insertUser($person_type, $username, $password_hash, $email)){
        $status_code = 11; //success
    }
    else{
        $status_code = 12; //(unkown) error
    }
}

echo $status_code;

// echo $register->findEmail($email);

?>