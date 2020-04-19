$(document).ready(function() {

    //once user choose the date it want to buy ticket, information about available time about this movie will be retrieved
    $(".user-choose-date").on("change", function() {
        var date = $(".user-choose-date");
        var movie = $(".movie-info").find("span")[0].innerHTML;
        var sendData = [{
            "movie_name": movie,
            "date": date
        }];
        $.ajax({
            type: "post",
            url: "..........",
            data: sendData,
            success: function(data) {
                res = [];
                for (var i = 0; i < data.length; i++) {
                    //convert each movie time
                    var time = convertMovieTime(data[i].movie_timeFlag);
                    res += '<option id = "' + data[i].movie_timeFlag + '" value = "' + data[i].session_id + '">' + time + '</option>';
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
        var date = $(".user-choose-date");
        var movie = $(".movie-info").find("span")[0].innerHTML;
        var adult_ticket = $(".adult-ticket-number option:selected").val();
        var senior_ticket = $(".senior-ticket-number option:selected").val();
        var child_ticket = $(".child-ticket-number option:selected").val();
        var time = [];
        time.push({
            "session_id": $(".user-select-date option:selected").attr("id"),
            "movie_timeFlag": $(".user-select-date option:selected").attr("value"),
        })
        var sendData = [{
            'date': date,
            'movie': movie,
            'adult_ticket_number': adult_ticket,
            'senior_ticket_number': senior_ticket,
            'child_ticket_number': child_ticket,
            "time": time
        }];
        $.ajax({
            type: 'post',
            url: "........",
            data: sendData,
            success: function(data) {
                window.location.href = "../movie/movie-page-template.html";
            },
            error: function() {
                console.log("wrong");
            }
        })
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
        var hour = count / 2;
        var min = count % 2;
        hour = hour * 30 / 60;
        min = min == 0 ? 00 : 30;
        return hour + ":" + min;
    }
})