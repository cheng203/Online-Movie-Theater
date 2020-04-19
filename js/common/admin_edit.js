$(document).ready(function() {
    // For admin to add movie
    $(".movie-add-button").on("click", function() {
        var movie_name = $("#added-movie-name").val();
        var release_date = $("#added-movie-release-date").val();
        var duration = $("#added-movie-duration").val();
        var off_date = $("#added-movie-off-date").val();
        var category = "";
        $.each($("input[name='edit-movie']:checked"), function() {
            category = $(this).val();
        })
        var director = $("#added-movie-director").val();
        var rate = $("#added-movie-rate").val();
        var front_image = $("#movie-front-img").attr("imgIdList");
        var info_image = $("#movie-info-image").attr("imgIdList");
        //stage_image is an array;
        var stage_image = $("#movie-stage-image").attr("imgIdList");
        var shop_image = $("#movie-shop-image").attr("imgIdList");
        var room = $(".added-movie-room").val();
        var time = [];
        // $("#added-movie-time").change(function() {
        //     time = $("#added-movie-time option:selected").attr("value");
        // });
        $("#add-movie-show-time").find("select").each(function() {
            var movie_time_flag = $(this).children("option:selected").attr("value");
            var group_id = $(this).children("option:selected").attr("id");
            time.push({
                "movie-time-flag": movie_time_flag,
                "group": group_id
            })
        })

        //create information send back to server
        var sendData = [
            { "movie-name": movie_name },
            { "release-date": release_date },
            { "duration": duration },
            { "off-date": off_date },
            { "category": category },
            { "director": director },
            { "rate": rate },
            { "front-image": front_image },
            { "info-image": info_image },
            { "stage-image": stage_image },
            { "shop-image": shop_image },
            { "room": room },
            { "time": time }
            //time here is a json array
        ];


        // send formData to backend
        $.ajax({
            type: "POST",
            url: "adminEdit.php",
            data: sendData,
            contentType: false,
            cache: false,
            processData: false,
            success: function() {
                console.log("successfully");
            },
            error: function(e) {
                console.log("error");
            }
        });
    })
})