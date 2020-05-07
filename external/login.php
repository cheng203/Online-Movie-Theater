<?php
include_once('../core/UserSql.php');

session_start();
$_SESSION["login"] = false; // false: unlogined, true: already login
$_SESSION["user_type"] = -1; // Visitor
$username = $_POST['username'];
$password_hash_input = $_POST['password_hash'];

$query = new UserSql();
$loginStatus = 20;
$result;
if($query->checkPasswordHash($username, $password_hash_input)){
    //login success
    $_SESSION["user_id"] = $query->getUserID($username);
    $loginStatus = 21;
    $_SESSION["login"] = true;
    $_SESSION["user_type"] = $query->getUserType($username);
    $_SESSION["username"] = $username;
    $result = sprintf('{"username": "%s", "login_status" : %s, "user_type" : %s}', $_SESSION["username"], $loginStatus, $_SESSION["user_type"]);
}
else{
    $loginStatus = 20;
    //login error: user doesn't exist or password is wrong
    session_destroy();
    $result = sprintf('{"username": "%s", "login_status" : %s, "user_type" : %s}', "null", $loginStatus, -1);
}

echo $result;
?>