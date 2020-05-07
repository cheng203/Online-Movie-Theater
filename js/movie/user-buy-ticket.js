$(document).ready(function() {

    //once user choose the date it want to buy ticket, information about available time about this movie will be retrieved
    $(".user-choose-date").on("change", function() {
        var date = $(".user-choose-date").val();
        var movie_id = localStorage.getItem("movie_id");
        var sendData = [{
            "movie_id": movie_id,
            "date": date
        }];
        $.ajax({
            type: "post",
            url: "external/room_session_api/findSessionForMovie.php",
            data: { "sendData": JSON.stringify(sendData) },
            success: function(data) {
                data = JSON.parse(data);
                res = [];
                for (var i = 0; i < data.length; i++) {
                    //convert each movie time
                    var time = convertMovieTime(data[i].time_flag);
                    res += '<option id = "' + data[i].time_flag + '" value = "' + data[i].session_id + '">' + time + '</option>';
                }
                $(".user-select-date").append(res);
            },
            error: function() {
                console.log("failed");
            }
        })
    });

    //once user submit the form, it is ready send to the back server.
    $("#submit-ticket").on("click", function() {
        var username = localStorage.getItem("username");
        //indicate if user has already have movie added to cart: true for yes, false for no
        var movie_flag = localStorage.getItem("movie_flag");
        movie_flag = "false";
        if (username == null || username == "") {
            alert("Please sign in first");
            return;
        } else {
            if (movie_flag != null && movie_flag == "true") {
                alert("You have movie added in the cart. Please checkout that item first. Thanks!");
            } else {
                //set movie_flag as true first to indicate that user has already select a movie and added in the cart
                localStorage.setItem("movie_flag", "true");

                var date = $(".user-choose-date");
                var movie_id = localStorage.getItem("movie_id");
                var movie_name = $(".movie-info").find("span")[0].innerHTML;
                var adult_ticket = $(".adult-ticket-number option:selected").val();
                var senior_ticket = $(".senior-ticket-number option:selected").val();
                var child_ticket = $(".child-ticket-number option:selected").val();
                var time = [];
                time.push({
                    "movie_time_flag": $(".user-select-date option:selected").attr("id"),
                    "session_id": $(".user-select-date option:selected").attr("value"),
                })
                var sendData = [{
                    "username": username,
                    'date': date,
                    'movie_id': movie_id,
                    'movie_name': movie_name,
                    'adult_ticket_number': adult_ticket,
                    'senior_ticket_number': senior_ticket,
                    'child_ticket_number': child_ticket,
                    "time": time

                }];
                $.ajax({
                    type: 'post',
                    url: "external/shopping_api/addTicket.php",
                    data: { "sendData": JSON.stringify(sendData) },
                    success: function(data) {
                        console.log(data);
                        if (data == 1) {
                            window.location.href = "./shopping.html";
                        } else {
                            alert("Sorry, seats are just sold out.")
                        }
                    },
                    error: function() {
                        console.log("wrong");
                    }
                })
            }
        }
    });
    // convert movie time flag into regular time format
    function convertMovieTime(timeFlag) {
        var count = 0;
        for (var i = 0; i < timeFlag.length; i++) {
            if (timeFlag.charAt(i) == '1') {
                count = i;
                break;
            }
        }
        var hour = parseInt(count / 2);
        var min = count % 2;
        min = min == 0 ? "00" : "30";
        if (hour < 10) {
            hour = "0" + hour;
        }
        return hour + ":" + min;
    }
})