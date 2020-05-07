<?php
include_once('../../core/RoomSql.php');
include_once('../../core/SessionSql.php');
include_once('../../core/MovieSql.php');
session_start();
if(!isset($_SESSION["user_type"])||$_SESSION["user_type"]!=0){
	die("You have no permission.");
}

$test = $_POST['sendData'];

$data=json_decode($test);

$room_id = $data[10]->room;

$name=$data[0]->movie_name;
//echo $name;
$type_name=$data[4]->category;
$start_date=$data[1]->release_date;
$end_date=$data[3]->off_date;
$director=$data[5]->director;
$duration=$data[2]->duration;
$rating=$data[6]->rate;
$adult_price=$data[7]->adult_price;
$senior_price=$data[8]->senior_price;
$child_price=$data[9]->child_price;


//$front_image=$data[7]->front_image;
//$info_image=$data[8]->info_image;
//$stage_image=$data[9]->stage_image;
//$shop_image=$data[10]->shop_image;
$info="default";
$return_time_flags=$data[11]->time;
//echo $time_flags[1]->movie_time_flag;
//echo $end_date;
//Add movie and get movie id
$query = new MovieSql();
$movie_id=$query->addMovieGetID($name,$type_name,$start_date,$end_date,$director,$info,$duration,$rating);
//echo $movie_id;
//if($movie_id!=0){
	//echo "New movie added successfully";
//}else{
	//echo "There is an ERROR !";
//}
$ticketTypeID_adult="1";
$ticketTypeID_senior="2";
$ticketTypeID_child="3";

$price_result1=$query->setMoviePrice($movie_id, $ticketTypeID_adult, $adult_price);
$price_result2=$query->setMoviePrice($movie_id, $ticketTypeID_senior, $senior_price);
$price_result3=$query->setMoviePrice($movie_id, $ticketTypeID_child, $child_price);

$query1= new RoomSql;


$formated_end_date = date("Y-m-d", strtotime("+1 day", strtotime($end_date)));




$arr=array();
$result=$query1->findRoomByDate($room_id,$start_date);
if($result!=''){
	//echo "yes";
	$group_num ="1";
	$r=json_decode($result);
    $group_time_flag=$r[0]->time_flag;
    //echo  $group_time_flag;
    
    for($j=$start_date;$j!=$formated_end_date;){
		$rx=$query1->findRoomByDate($room_id,$j);
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







$result1= json_encode($arr);
//echo $result1;
$result11=json_decode($result1);
$array_length = count($result11,COUNT_NORMAL);
//echo "length".$array_length ;
for($i=0;$i<$array_length;$i++){
	$group=$result11[$i]->group;
	$date=$result11[$i]->date;
	$session_time_flag=$return_time_flags[$group-1]->movie_time_flag;
	$room_time_flag=$result11[$i]->time_flag;
	//echo $room_time_flag;
	$roominfo=$query1->findRoomByID($room_id);
    $room_info=json_decode($roominfo);
    $available=$room_info[0]->capacity;

    $room_time_array = str_split($room_time_flag, 1);
    $session_time_array = str_split($session_time_flag, 1);
	//echo  $available;

	$occupy_flag=False;

    for( $y=0;$y<48;$y++){
	     if($session_time_array[$y]!='0'){
		     if($room_time_array[$y]=='0'){
			     $room_time_array[$y]='1';
		     }else{
		
			    $occupy_flag=True;
			//echo "Wrong";
		     }

	    }
    }
    if($occupy_flag==False){

	      $query222 = new SessionSql();
          $result222=$query222->addSession($movie_id,$room_id,$date,$session_time_flag,$available);
          if($result222==True){
    	       //echo "Session Added sucessfully!";
    	       $room_timeflag_update=implode($room_time_array);
    	       //echo $room_timeflag_update;
    	       $result333=$query1->modifyRoomByDate($room_id,$date,$room_timeflag_update);
    	       if($result333==True){
    	       	     $result_flag[]=1;
    		        
    	       }else{
    		         $result_flag[]=0;
    	       }
	    
         }else{
	          echo "There is an ERROR !";
         }
    }else{
	       echo "The time has already been occupied!";
    }
	//
	//echo  $group;
	//$return_time_flags
}
$len=count($result_flag);


$xxx = 0;
for($x=0;$x<$len;$x++){
	if($result_flag[$x]==0){
		$xxx=1;
	}
}
if($xxx!=1){
	echo $name;
}else{
	echo "Not succeed";
}

//$result= json_decode($result1);
//$room_flags=






/*if($result1!=""){
	echo $result1;
}else{
	echo "There is an ERROR";
}*/





?>