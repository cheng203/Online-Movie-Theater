$(document).ready(function() {

    //once user choose the date it want to buy ticket, information about available time about this movie will be retrieved
    $(".user-choose-date").on("change", function() {
        var date = $(".user-choose-date");
        var movie = $(".movie-info").find("span")[0].innerHTML;
        var data = [{
            "movie_name": movie,
            "date": date
        }];
        // $.ajax({
        //     type: "get",
        //     url: "core/user_buy_ticiket_time.php",
        //     data: data,
        //     success: function(data) {
        //         res = [];
        //         for (var i = 0; i < data.length; i++) {
        //             res += '<option value = "' + data[i].time + '">' + data[i].time + '</option>';
        //         }
        //         $(".user-select-date").append(res);
        //     }
        // })
    })

    //once user submit the form, it is ready send to the back server.
    $("#submit-ticket").on("click", function() {
        var date = $(".user-choose-date");
        var movie = $(".movie-info").find("span")[0].innerHTML;
        var adult_ticket = $(".adult-ticket-number option:selected").val();
        var senior_ticket = $(".senior-ticket-number option:selected").val();
        var child_ticket = $(".child-ticket-number option:selected").val();
        var data = [{
            'date': date,
            'movie': movie,
            'adult_ticket_number': adult_ticket,
            'senior_ticket_number': senior_ticket,
            'child_ticket_number': child_ticket
        }];
        // $.ajax({
        //     type: 'post',
        //     url: 'core/user_buy_ticket.php',
        //     data: data,
        //     success: function(data) {
        //         console.log("successfully");
        //     },
        //     error: function() {
        //         console.log("wrong");
        //     }
        // })
    })
})