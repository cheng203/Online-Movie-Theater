$(document).ready(function() {
    var room_option = "";
    $.ajax({
        type: 'post',
        url: 'external/momvie_api/Listrooms.php',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                room_option += '<option value = "' + data[i].room_id + '">' + data[i].room_nanme + '</option>';
            }
        },
        error: function() {
            console.log("Unsuccessfully");
        }
    })
    $("#add-movie-room").append(room_option);

    // if room is selected, get information for available time
    $("#added-movie-room").on("change", function() {
        var pid = this.value;
        var movie_start_date = $("#added-movie-release-date").val();
        var movie_end_date = $("#added-movie-off-date").val();
        var sendData = [{
            "room": pid,
            "start_date": movie_start_date,
            "end_date": movie_end_date
        }]
        $.ajax({
            type: 'post',
            url: 'external/room_session_api/Find_room_by_start_end_date.php',
            data: sendData,
            success: function(data) {
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