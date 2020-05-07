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
        var room = $("#added-movie-room").val();
        var adult_price = $("#adult-price-header").val();
        var senior_price = $("#senior-price-header").val();
        var child_price = $("#child-price-header").val();
        var time = [];
        // $("#added-movie-time").change(function() {
        //     time = $("#added-movie-time option:selected").attr("value");
        // });
        $(".added-movie-time").each(function() {
            var movie_time_flag = $(this).children("option:selected").attr("value");
            var group_id = $(this).children("option:selected").attr("id");
            time.push({
                "movie_time_flag": movie_time_flag,
                "group": group_id
            })
        })

        //create information send back to server
        var sendData = [
            { "movie_name": movie_name },
            { "release_date": release_date },
            { "duration": duration },
            { "off_date": off_date },
            { "category": category },
            { "director": director },
            { "rate": rate },
            { "adult_price": adult_price },
            { "senior_price": senior_price },
            { "child_price": child_price },
            { "room": room },
            { "time": time }
            //time here is a json array
        ];

        sendData = JSON.stringify(sendData);
        console.log(sendData);
        // send formData to backend
        $.ajax({
            type: "POST",
            url: "external/movie_api/Admin_add_session_byGroupNew.php",
            data: { "sendData": sendData },
            success: function(data) {
                alert(data);
                $("body").append(data);
                //if added successfully, return alert admin and return back to main page
                alert("You successfully added movie " + data + " to the system");
                // window.location.href = "./index.html";
            },
            error: function(e) {
                console.log("error");
            }
        });
    })
})