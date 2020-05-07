<?php
include_once('MysqlConnector.php');

Class MovieSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector("localhost", "root", "root", "test");
    }

    function listTicketTypes(){
        $sql = sprintf("select * from `ticket_types` where 1");
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function getTicketTypeByName($ticketName){
        $sql = sprintf("select `ticket_type_id` from `ticket_types` where `ticket_name` = '%s'", $ticketName);
        return json_decode($this->conn->query_json($sql))[0]->ticket_type_id;
    }

    function setMoviePrice($movieID, $ticketTypeID, $price){
        $sql = sprintf("select * from `ticket_price` where `movie_id` = %s and `ticket_type_id` = %s", $movieID, $ticketTypeID);
        if($this->conn->query_json($sql)==""){
            $sql = sprintf("insert into `ticket_price` values('%s', '%s', '%s')", $movieID, $ticketTypeID, $price);
            $result = $this->conn->query($sql); 
        }
        else{
            $sql = sprintf("UPDATE `ticket_price` SET `price` = '%s' WHERE `ticket_price`.`movie_id` = '%s' AND `ticket_price`.`ticket_type_id` = '%s'", $price, $movieID, $ticketTypeID);
            $result = $this->conn->query($sql);
        }
        return $result;
    }

    function setMoviePrices($movieID, $adult, $senior, $children){
        $adultID =  $this->getTicketTypeByName("adult");
        $seniorID =  $this->getTicketTypeByName("senior");
        $childrenID =  $this->getTicketTypeByName("children");
        return $this->setMoviePrice($movieID, $adultID, $adult)&&$this->setMoviePrice($movieID, $seniorID, $senior) && $this->setMoviePrice($movieID, $childrenID, $children);
    }


    function findMoviePriceByMovieID($movieID){
        $sql = sprintf("select `movie_id`, `name`, `ticket_name`, `price` from `movies` natural join `ticket_price` natural join `ticket_types` where `movie_id` = %s", $movieID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

     function findMoviePriceByMovieIDAndType($movieID){
        $sql = sprintf("SELECT ticket_name,price from ticket_price natural join ticket_types where movie_id = '%s' ", $movieID);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findMovieByName($name){
        $sql = sprintf("SELECT *  from movies where name = '%s'", $name);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findMovieByID($movieID){
        $sql = sprintf("SELECT *  from movies where movie_id = '%s'", $movieID);
        $result = $this->conn->query_json($sql);
        return $result;
    }
   
   function findMoviesByCategory($category){
    $sql = sprintf("SELECT movie_id, name  from movies where type_name = '%s'", $category);
        $result = $this->conn->query_json($sql);
        return $result;
   }
    function findNewestFiveMovie(){
        
        $sql = sprintf("SELECT movie_id, name  from movies ORDER BY movie_id DESC LIMIT 5 ");
        //ORDER BY movie_id ");
       // "SELECT *  from movies ORDER BY movie_id DESC LIMIT 5
        $result = $this->conn->query_json($sql);
        return $result;

    }

    function findTOPFourMovie(){

        $sql = sprintf("SELECT movie_id, name from movies ORDER BY rating ASC LIMIT 4");
        $result = $this->conn->query_json($sql);
        return $result;
    }



    function addMovie($name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating)
    {
     
        $sql = sprintf("INSERT into movies values(null, '%s', '%s', '%s', '%s','%s','%s','%s','%s')",$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating);
        return $this->conn->query($sql);
    }

    function addMovieGetID($name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating){
        $sql = sprintf("INSERT into movies values(null, '%s', '%s', '%s', '%s','%s','%s','%s','%s')",$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating);
        return $this->conn->get_insert_id($sql);
    }

    function deleteMovieByID($movieID){
    	$sql = sprintf("DELETE from movies WHERE movie_id = '%s'", $movieID);
        return $this->conn->query($sql);

    }

    function modifyMovieByID($movieID,$name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating){
        $sql = sprintf("UPDATE movies SET name='%s',type_name='%s',release_date='%s',off_date='%s',director='%s',info='%s',duration='%s',rating='%s' WHERE movie_id='%s'", $name,$type_name,$release_date,$off_date,$director,$info,$duration,$rating, $movieID);
        return $this->conn->query($sql);
        
    }

    function listMovies(){
        $sql = sprintf("select movie_id, name from movies where 1");
        return $this->conn->query_json($sql);
    }

   function listCategory(){
    $sql = sprintf("SELECT DISTINCT type_name from movies where 1");
        return $this->conn->query_json($sql);
   }

    function SearchMovieNameStartByString($start_string){
        $sql = sprintf("SELECT name from movies WHERE name LIKE '%%%s%%'",$start_string);
        return $this->conn->query_json($sql);
    }

    function getMovieImages($movieID){
        $sql = sprintf("select `movie_id`, `name`, `image_type_name`, `image_id`, `image_name` from movie_images natural join image_types natural join image_library natural join movies where movie_id = '%s'", $movieID);
        return $this->conn->query_json($sql);
    }
    function getMovieCarouselImages($movieID){
        $sql = sprintf("SELECT  image_name from movie_images natural join image_types natural join image_library where movie_id = '%s' AND image_type_name = 'carousel' ", $movieID);
        return $this->conn->query_json($sql);
    }
    function getMovieSearchImages($movieID){
        $sql = sprintf("SELECT  image_name from movie_images natural join image_types natural join image_library where movie_id = '%s' AND image_type_name = 'search' ", $movieID);
        return $this->conn->query_json($sql);
    }
     function getMovieCartImages($movieID){
        $sql = sprintf("SELECT  image_name from movie_images natural join image_types natural join image_library where movie_id = '%s' AND image_type_name = 'cart' ", $movieID);
        return $this->conn->query_json($sql);
    }
    function getMovieStageImages($movieID){
        $sql = sprintf("SELECT  image_name from movie_images natural join image_types natural join image_library where movie_id = '%s' AND image_type_name = 'stage' ", $movieID);
        return $this->conn->query_json($sql);
    }

    function getMovieMovieImages($movieID){
        $sql = sprintf("SELECT  image_name from movie_images natural join image_types natural join image_library where movie_id = '%s' AND image_type_name = 'movie' ", $movieID);
        return $this->conn->query_json($sql);
    }

    function setMovieImages($movieID, $imageArr){
        $sql = sprintf("delete from `movie_images` where movie_id = '%s'", $movieID);
        if(!$this->conn->query($sql)){
            return false;
        }
        else{
            foreach($imageArr as $imageTypeID=>$imageIDList){
                $imageIDArr = explode(",", $imageIDList);
                
                foreach($imageIDArr as $index=>$imageID){
                    $sql = sprintf("insert into `movie_images` values ('%s', '%s', '%s')", $movieID, $imageTypeID, $imageID);

                    if(!$this->conn->query($sql)){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function getImageTypes(){
        $sql = sprintf("select * from `image_types` where 1");
        return $this->conn->query_json($sql);
    }


   function deleteMovieImages($movie_id){
    $sql = sprintf("DELETE from movie_images WHERE movie_id = '%s'", $movie_id);
        return $this->conn->query($sql);

   }

   function deleteMoviePrices($movie_id){
     $sql = sprintf("DELETE from ticket_price WHERE movie_id = '%s'", $movie_id);
        return $this->conn->query($sql);
   }


}





?>
