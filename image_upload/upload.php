<?php 
include_once('../core/MysqlConnector.php');
session_start();
if(!isset($_SESSION['user_type'])||$_SESSION['user_type']!=0){
    die("You have no perssiom to upload images.");
}

$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt'); // valid extensions
$path = '../uploads/'; // upload directory

if(isset($_FILES['image'])){
    if(!is_dir($path)){
        mkdir($path,0700);
    }
    $returnJson = "[";
    $size = count($_FILES['image']['name']);
    for($i = 0; $i < $size; $i++){
        $img = $_FILES['image']['name'][$i];
        $tmp = $_FILES['image']['tmp_name'][$i];
        processImage($img, $tmp);
    }
    if($size>0){
        echo substr($returnJson, 0, -1) . "]";
    }
    else echo "[]";
}

function processImage($img, $tmp){
    global $valid_extensions, $path, $returnJson;
    // get uploaded file's extension
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    // can upload same image using rand function
    $final_image = time() . '-'. imageCount() . '-' . $img;
    // check's valid format
    if(in_array($ext, $valid_extensions)){ 
        $path = $path.strtolower($final_image); 
        if(move_uploaded_file($tmp,$path)) {
            if(imagePathToDatabase($final_image)){
                $returnJson = $returnJson . sprintf("{'image' : '%s'},", $img);
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