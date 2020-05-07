$(document).ready(function() {
    var room_option = "";
    $.ajax({
        type: 'post',
        url: './external/room_session_api/ListRooms.php',
        dataType: 'text',
        success: function(data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                var option = $("<option/>").attr("value", data[i].room_id).html(data[i].room_name);
                $("#added-movie-room").append(option);
                // room_option += '<option value = "' + data[i].room_id + '">' + data[i].room_name + '</option>';
            }
            // $("#add-movie-room").append(room_option);
        },
        error: function() {
            console.log("Unsuccessfully");
        }
    })

    // if room is selected, get information for available time
    $("#added-movie-room").on("change", function() {
        var pid = this.value;
        var movie_start_date = $("#added-movie-release-date").val();
        var movie_end_date = $("#added-movie-off-date").val();
        if (movie_start_date == '' || movie_end_date == '') {
            alert("Please select the date you would like to add movie first.")
        }
        var sendData = [{
            "room": pid,
            "start_date": movie_start_date,
            "end_date": movie_end_date
        }];

        console.log(sendData);

        $.ajax({
            type: 'post',
            url: 'external/room_session_api/Find_room_by_start_end_dateNew.php',
            data: { "sendData": JSON.stringify(sendData) },
            success: function(data) {
                console.log(data);
                data = JSON.parse(data);
                $('body').append(data);
                var segment = convert(data);
                var duration = $("#added-movie-duration").val();
                for (var i = 0; i < segment.length; i++) {
                    //insert time conversion function
                    timeConversion(segment[i], duration);
                }
            },
            error: function() {
                console.log("Unsuccessfully");
            }
        })
    })
})