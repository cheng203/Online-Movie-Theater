<?php 
include_once('../core/MovieSql.php');
session_start();

if(!isset($_SEESION["user_type"])||$_SEESION["user_type"]!=0){
	die("You have no permission to upload image.");
}

$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt'); // valid extensions
$path = '../uploads/'; // upload directory
if($_FILES['image']){
    $size = count($_FILES['image']['name']);
    for($i = 0; $i < $size; $i++){
        $img = $_FILES['image']['name'][$i];
        $tmp = $_FILES['image']['tmp_name'][$i];
        processImage($img, $tmp);
    }
}


function processImage($img, $tmp){
    global $valid_extensions, $path;
    // get uploaded file's extension
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    // can upload same image using rand function
    $final_image = time() . '-' . $img;
    // check's valid format
    echo $ext;
    echo " ".in_array($ext, $valid_extensions);
    if(in_array($ext, $valid_extensions)){ 
        $path = $path.strtolower($final_image); 
        if(move_uploaded_file($tmp,$path)) {
            return true;
        }
    } 
    return false;
}


?>