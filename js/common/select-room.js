$(document).ready(function() {
    var room_option = "";
    var time_option = "";
    $.ajax({
        type: 'post',
        url: '.......',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                room_option += '<option value = "' + data[i].room + '">' + data[i].room + '</option>';
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
        var sendData = [{
            "room": pid
        }]
        $.ajax({
            type: 'post',
            url: '......',
            data: sendData,
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    time_option += '<option value = "' + data[i].time + '">' + data[i].time + '</option>';
                }
            },
            error: function() {
                console.log("Unsuccessfully");
            }
        })
        $("#added-movie-time").append(time_option);
    })
})