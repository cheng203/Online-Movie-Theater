<?php
if(isset($_SESSION["login"]))
    session_destroy();
echo "Logout Sucess";
?>