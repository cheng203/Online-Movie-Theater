$(document).ready(function() {
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
            "name": movie_name,
            "movie_date": movie_date,
            "movie_time_flag": movie_time_flag,
            "senior_num": senior_num,
            "adult_num": adult_num,
            "child_num": child_num
        });
        //get goods info
        var goods_id = $(".goods-name").attr("value");
        var goods_name = $(".good-name").text();
        var quantity = $(".goods-quantity").val();
        for (var i = 0; i < goods_id.length; i++) {
            sendData.goods.push({
                "goods_id": goods_id[i],
                "goods_name": goods_name[i],
                "quantity": quantity[i]
            });
        }
        //get total cost info
        var total_cost = $(".sum-total").text();
        sendData.total_cost.push({
            "total_cost": total_cost
        });

        $.ajax({
            type: "post",
            url: "........",
            data: sendData,
            success: function() {
                alert("You purchase is successfully finished. Will direct to homepage.");
                window.location.href = "../index.html";
            }
        })
    }
})