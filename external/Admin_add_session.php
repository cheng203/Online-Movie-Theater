<?php
include_once('../core/SessionSql.php');
include_once('../core/RoomSql.php');

session_start();

//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}

$movie_id=$_POST['movie_id'];
$room_id=$_POST['room_id'];
$date=$_POST['date'];
$time_flag=$_POST['time_flag'];
//$available=$_POST['available'];

$query1=new RoomSql();
$result1=$query1->findRoomByDate($room_id,$date);
$arr=json_decode($result1);
$time="time_flag";
$room_time_flag=$arr[0]->$time;
$roominfo=$query1->findRoomByID($room_id);
$arr1=json_decode($roominfo);
$available=$arr1[0]->capacity;

//echo $room_time_flag;

$room_time_array = str_split($room_time_flag, 1);
$session_time_array = str_split($time_flag, 1);
//echo "www";
//echo $session_time_array[4];
$occupy_flag=False;

for( $i=0;$i<48;$i++){
	if($session_time_array[$i]!='0'){
		if($room_time_array[$i]=='0'){
			$room_time_array[$i]='1';
		}else{
		
			$occupy_flag=True;
			//echo "Wrong";
		}

	}
}

if($occupy_flag==False){

	$query = new SessionSql();
    $result=$query->addSession($movie_id,$room_id,$date,$time_flag,$available);
    if($result==True){
    	echo "Session Added sucessfully!";
    	$room_timeflag_update=implode($room_time_array);
    	echo $room_timeflag_update;
    	$result2=$query1->modifyRoomByDate($room_id,$date,$room_timeflag_update);
    	if($result2==True){
    		echo "Time_flag is updated";
    	}else{
    		echo "Time_flag is not updated";
    	}
	    
    }else{
	    echo "There is an ERROR !";
    }
}else{
	echo "The time has already been occupied!";
}







?>