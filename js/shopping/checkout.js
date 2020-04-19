$(document).ready(function() {
    var username = localStorage.getItem("username");
    if (username == null || username == "") {
        alert("Please sign in first");
    } else {
        var num_of_movie = $(".product_info").find("tr");
        var movie_name_arr = $(".product_info").find(".movie-name");
        var movie_date_arr = $(".product_info").find(".movie-time");
        var movie_senior_arr = $(".product_info").find(".senior-count");
        var movie_adult_arr = $(".product_info").find(".adult-count")
        var movie_child_arr = $(".product_info").find(".child-count")
        var total_cost = $(".sum-total").text().substr(1);


        var sendData = [];
        for (var i = 0; i < num_of_movie.length; i++) {
            var movie_name = movie_name_arr[i].text();
            var movie_date = movie_date_arr[i].text();
            var movie_senior_count = movie_senior_arr[i].val();
            var movie_adult_count = movie_adult_arr[i].val();
            var movie_child_count = movie_child_arr[i].val();
            var arr = {
                "movie-name": movie_name,
                "movie-date": movie_date,
                "movie_senior_count": movie_senior_count,
                "movie-adult-count": movie_adult_count,
                "movie-child-count": movie_child_count
            }
            sendData.push(arr);
        }
        //add total cost to sendData
        sendData.push({ "total-cost": total_cost });

        $.ajax({
            type: "post",
            url: "........",
            data: sendData,
            success: function() {
                alert("You purchase is successfully finished. Will direct to homepage.");
                window.location.href = "index.html";
            }
        })
    }
})