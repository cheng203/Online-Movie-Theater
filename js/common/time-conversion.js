//This is used to break up all time into segmentations
function convert(data) {
    var result = [];
    var slow = 0;
    var fast = 0;
    var start_date = "";
    var end_date = "";
    while (fast < data.length) {
        if (data[fast].group == data[slow].group) {
            while (fast < data.length && data[fast].group == data[slow].group) {
                fast++;
            }
        } else {
            start_date = data[slow].date;
            end_date = data[fast - 1].date;
            var time_flag = data[slow].time_flag;
            var group_id = data[slow].group;
            slow = fast;
            result.push({
                "start_date": start_date,
                "end_date": end_date,
                "time_flag": time_flag,
                "group_id": group_id
            })
        }
    }
    result.push({
        "start_date": data[slow].date,
        "end_date": data[fast - 1].date,
        "time_flag": data[slow].time_flag,
        "group_id": data[slow].group
    })
    return result;
}

function timeConversion(data, duration) {
    var time_flag = data.time_flag;
    var start_date = data.start_date;
    var end_date = data.end_date;
    var group_id = data.group_id;
    var time_option = [];
    var time_display = "";
    var time_interval = 0; //indicate how many bit it will use
    if (duration % 30 == 0) {
        time_interval = parseInt(duration / 30);
    } else {
        time_interval = parseInt(duration / 30) + 1;
    }
    // minus extra 4 here to indicate that after 10pm, there will be no avaialbe time
    // i starts at 17 to inditicate that earlist movie start time should be after 9 o'clock
    for (var i = 17; i < time_flag.length - time_interval - 4; i++) {
        if (time_flag.charAt(i) == '0') {
            var flag = true;
            for (var j = i; j < i + time_interval; j++) {
                if (time_flag.charAt(j) != '0') {
                    flag = false;
                    break;
                }
            }
            if (flag == true) {
                conversion(time_flag, i, time_interval, time_option);
            }
        }
    }
    time_display = '<label for="movie-time" class="control-label">' + start_date + ' to ' + end_date + '</label><div class="time-wrapper"><select class="added-movie-time" name="timelist">'
    for (var i = 0; i < time_option.length; i++) {
        time_display += '<option id = "' + group_id + '"value = "' + time_option[i].string + '">' + time_option[i].time + '</option>';
    }
    time_display += '</select></div>';
    $("#add-movie-show-time").append(time_display);
}

//used to create a movie-time-flag
function conversion(time_flag, start, end, time_option) {
    var time = Array(48).fill(0).toString().replace(/,/g, "");
    for (var i = start; i < start + end; i++) {
        time = time.substring(0, i) + '1' + time.substring(i + 1);
    }

    var hour = parseInt(start / 2);
    var min = start % 2;
    if (min == 0) {
        min = "00";
    } else {
        min = "30";
    }
    var time_format = hour + ":" + min;
    time_option.push({
        "time": time_format,
        "string": time //this is the 48 bit string for movie start-end time
    })
}