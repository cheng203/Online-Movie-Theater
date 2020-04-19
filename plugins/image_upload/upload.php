<?php
use Thumb\Thumb;
include_once('../../core/MysqlConnector.php');
include_once('./thumb.php');
session_start();
if(!isset($_SESSION['user_type'])||$_SESSION['user_type']!=0){
    die("You have no perssiom to upload images.");
}
$_SESSION["image_count"] = 0;// number of images uploaded successfully

$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt'); // valid extensions
$path = '../../uploads/'; // upload directory
$thumbPath = '../../uploads/thumb/';
$thumbWidth = 200;
$thumbHeight = 400;

if(isset($_FILES['image'])){
    if(!is_dir($path)){
        mkdir($path,0700);
        mkdir($thumbPath, 0700);
    }
    $returnJson = "[";
    $size = count($_FILES['image']['name']);
    for($i = 0; $i < $size; $i++){
        $img = $_FILES['image']['name'][$i];
        $tmp = $_FILES['image']['tmp_name'][$i];
        processImage($img, $tmp);
    }
    // if($size>0){
    //     echo substr($returnJson, 0, -1) . "]";
    // }
    // else echo "[]";
    echo $_SESSION["image_count"];
}

function processImage($img, $tmp){
    global $valid_extensions, $path, $returnJson, $thumbHeight, $thumbWidth, $thumbPath;
    // get uploaded file's extension
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    // can upload same image using rand function
    $final_image = time() . '-'. imageCount() . '-' . $img;
    // check's valid format
    if(in_array($ext, $valid_extensions)){ 
        if(move_uploaded_file($tmp,$path.$final_image)) {
            if(imagePathToDatabase($final_image)){
                //output thumb
                Thumb::out($path.$final_image, $thumbPath.'thumb-'.$final_image, $thumbWidth, $thumbHeight);
                $returnJson = $returnJson . sprintf("{'image' : '%s'},", $img);
                $_SESSION["image_count"] += 1;
            }
        }
    } 
}

function imagePathToDatabase($final_image){
    $conn = new MysqlConnector("localhost", "root", "root", "test");
    $sql = sprintf("insert into `image_library` values (null, '%s')", $final_image);
    return $conn->query($sql);
}

function imageCount(){
    $conn = new MysqlConnector("localhost", "root", "root", "test");
    $sql = sprintf("select count(*) from `image_library`");
    $result = $conn->query_json($sql);
    $arr = json_decode($result);
    $name = "count(*)";
    return $arr[0]->$name;
}

?>