<?php
include_once('../../core/RoomSql.php');

session_start();
//if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	//die("You have no permission.");
//}

$test = $_POST['sendData'];
//echo $test;
$data=json_decode($test);
$room_id=$data[0]->room;
//echo $room_id;
$start_date = $data[0]->start_date;
//echo $start_date;
$end_date = $data[0]->end_date;

$end_date = date("Y-m-d", strtotime("+1 day", strtotime($end_date)));

//echo $end_date;
$query = new RoomSql();



for($i=$start_date;$i!=$end_date;){
      $result = $query->isRoomByDateCreated($room_id,$i);

      if($result==FALSE){
            $result1=$query->initRoomsByDate($room_id,$i);
        }
       $i = date("Y-m-d", strtotime("+1 day", strtotime($i)));
}




$arr=array();
$result=$query->findRoomByDate($room_id,$start_date);
if($result!=''){
	//echo "yes";
	$group_num ="1";
	$r=json_decode($result);
    $group_time_flag=$r[0]->time_flag;
    //echo  $group_time_flag;
    for($j=$start_date;$j!=$end_date;){
        $rx=$query->findRoomByDate($room_id,$j);
        $rrx=json_decode($rx);
        if($rrx[0]->time_flag==$group_time_flag){
                $rrx[0]->group=$group_num;
                //echo $rrx[0]->time_flag;
        }else{
            $group_time_flag=$rrx[0]->time_flag;
            $group_num++;
            $rrx[0]->group=$group_num;
        }

        $arr[] = $rrx[0];
        //echo json_encode($rrx[0]);
       $j = date("Y-m-d", strtotime("+1 day", strtotime($j)));
    }
         
}

echo json_encode($arr);




?>