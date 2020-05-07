<?php
include_once('../../core/MovieSql.php');
include_once('../../core/RoomSql.php');
include_once('../../core/SessionSql.php');
session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}
$test = $_POST['sendData'];
$data=json_decode($test);

$movieID = $data[0]->movie_id;
//echo $movieID;

$query = new MovieSql();
$result_delete_img=$query->deleteMovieImages($movieID);
/*if($result_delete_img==true){
	echo "1";
}*/

$query_room=new RoomSql();

$query_session=new SessionSql();
$session_info=$query_session->findSessionByMovie($movieID);
$session_data=json_decode($session_info);
$length=count($session_data);
//echo $length;
for($x=0;$x<$length;$x++){
	$room_id=$session_data[$x]->room_id;
	//echo $room_id;
	$date=$session_data[$x]->date;
	//echo $date;

	$session_id=$session_data[$x]->session_id;
	//echo $session_id;
	$session_time_flag=$session_data[$x]->time_flag;
	$room_info=json_decode($query_room->findRoomByDate($room_id,$date));
	$room_time_flag=$room_info[0]->time_flag;
	//echo $room_time_flag;
	//echo $session_time_flag;

	$room_time_array = str_split($room_time_flag, 1);
    $session_time_array = str_split($session_time_flag, 1);
	//echo  $available;
    //echo $room_time_array[47];
	

    for($y=0;$y<48;$y++){
    	//echo $session_time_array[$y];
    	//echo $room_time_array[$y];
	     if($session_time_array[$y]=='1'){
		     if($room_time_array[$y]=='1'){
			     $room_time_array[$y]='0';
		     }

	    }
    }
    $room_timeflag_update=implode($room_time_array);
    $room_timeflag_update;
    $change_room_time=$query_room->modifyRoomByDate($room_id,$date,$room_timeflag_update);
    $delete_session=$query_session->deleteSessionByID($session_id);


}

$result1=$query->deleteMoviePrices($movieID);


$result2=$query->deleteMovieByID($movieID);
if($result1===TRUE&&$result2===TRUE){
	echo "1";
}else{
	echo "0";
}
?>





