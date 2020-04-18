<?php
include_once('../core/SessionSql.php');
include_once('../core/RoomSql.php');

session_start();

//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}
$session_id=$_POST['session_id'];


$query = new SessionSql();
$session_info=$query->findSessionByID($session_id);
$result=$query->deleteSessionByID($session_id);
if($result==True){
    echo "Session is deleted sucessfully";

    //Find the room_id and date of the deleted session
    $arr=json_decode($session_info);
    $time="time_flag";
    $room="room_id";
    $session_date="date";
    $session_time_flag=$arr[0]->$time;
    $room_id=$arr[0]->$room;
    $date=$arr[0]->$session_date;

    //Change the time_flag of the room and date
    $query1=new RoomSql();
    $result1=$query1->findRoomByDate($room_id,$date);
    $arr=json_decode($result1);
    $room_time_flag=$arr[0]->$time;

    $room_time_array = str_split($room_time_flag, 1);
    $session_time_array = str_split($session_time_flag, 1);

    for( $i=0;$i<48;$i++){
	    if($session_time_array[$i]!='0'){
		   if($room_time_array[$i]!='0'){
			   $room_time_array[$i]='0';
		   }else{
		
			   echo "Room time flag is Wrong";
		   }

	    }
    }
    $room_timeflag_update=implode($room_time_array);
    $result2=$query1->modifyRoomByDate($room_id,$date,$room_timeflag_update);
    if($result2==True){
    		echo "Time_flag is updated";
    }else{
    		echo "Time_flag is not updated";
    }

}else{
	echo "There is an ERROR !";
}




?>