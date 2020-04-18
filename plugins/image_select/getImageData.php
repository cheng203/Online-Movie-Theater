<?php
session_start();
include_once('../../core/MysqlConnector.php');
$conn = new MysqlConnector("localhost", "root", "root", "test");
$sql = "select * from `image_library` where 1 order by `image_id` desc";
echo $conn->query_json($sql);
?>   