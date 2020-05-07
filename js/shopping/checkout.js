function checkOut(){
    var username = localStorage.getItem("username");
    if (username == null || username == "") {
        alert("Please sign in first");
    } else {
        var sendData = {
            "movie": [],
            "goods": [],
            "total_cost": []
        };
        //get movie info
        var movie_id = $(".movie-name").attr("value");
        var movie_name = $(".movie-name").text();
        var movie_date = $(".movie-time").attr("value");
        var movie_time_flag = $(".movie-time").attr("alt");
        var senior_num = $(".senior-count").val();
        var adult_num = $(".adult-count").val();
        var child_num = $(".child-count").val();
        sendData.movie.push({
            "movie_id": movie_id,
            "session_id": localStorage.getItem("session_id"),
            "name": movie_name,
            "movie_date": movie_date,
            "movie_time_flag": movie_time_flag,
            "senior_num": senior_num,
            "adult_num": adult_num,
            "child_num": child_num
        });
        //get goods info
        $(".goods").each(function(index){
            var goods_id = $(this).find(".goods-name").attr("value");
            var goods_name = $(this).find(".good-name").text();
            var quantity = $(this).find(".goods-quantity").val();
            sendData.goods.push({
                "goods_id": goods_id,
                "goods_name": goods_name,
                "quantity": quantity
            });
        })
        
        
        //get total cost info
        var total_cost = $(".sum-total").text();
        total_cost = total_cost.substr(1, total_cost.length-1);
        sendData.total_cost.push({
            "total_cost": total_cost
        });


        $.ajax({
            type: "post",
            url: "external/shopping_api/addOrder.php",
            data: { "sendData": JSON.stringify(sendData) },
            success: function(data) {
                console.log(data);
                if (data == 1) {
                    alert("You purchase is successfully finished. Will direct to homepage.");
                    window.location.href = "./index.html";
                } else {
                    alert("Unfortunately, the movie you choose is just sold out. Please go back and select another available time.")
                }

            }
        })
    }
}