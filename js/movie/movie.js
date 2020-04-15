$(document).ready(function() {
    // when admin click to edit, used to extract information
    $(".admin-edit").on("click", function() {
            var result = $(".movie-info").find("span");
            var res = [];
            $.each(result, function() {
                res.push($(this).text());
            })
            var movie_name = res[0];
            var release = res[1];
            var duration = res[2];
            var off = res[3];
            var category = res[4];
            var director = res[5];
            var rate = res[6];
            var movie_url = $(".left").attr("src");
            $(".movie-name").val(movie_name);
            $(".release-date").val(release);
            $(".duration").val(duration);
            $(".off-date").val(off);
            var movie_type = $(".category").find("input");
            $.each(movie_type, function() {
                if ($(this).val() == category) {
                    $(this).prop("checked", true);
                }
            })
            $(".director").val(director);
            $(".rate").val(rate);
            $(".movie-url").html(movie_url);
        })
        //once admin click delete, send movie name back to backend
    $(".edit-movie-delete").on("click", function() {
            var movie_name = localStorage.getItem("movie_name");
            var sendData = {
                "movie_name": movie_name
            }
            $.ajax({
                type: "post",
                url: "core/deleteMovie.php",
                data: sendData,
                success: function() {
                    console.log("you have successfullt delete item");
                },
                error: function() {
                    console.log("Deletion failed");
                }
            })
        })
        //once admin click save changes, send data back to backend
    $(".edit-movie-save-change").on("click", function() {
        var movie_name = $(".movie-name").val();
        var release = $(".release-date").val();
        var duration = $(".duration").val();
        var off_date = $(".off-date").val();
        var category = "";
        $.each($("input[name='movie-category']:checked"), function() {
            category = $(this).val();
        })
        var director = $(".director").val();
        var rate = $(".rate").val();
        var url = $(".movie-url").html();
        // only name of the updated image is returned
        var update_img = $(".updated_infoImg")[0].files[0].name;

        //create JSON data format send
        var sendData = {
            movie_name: movie_name,
            release: release,
            duration: duration,
            off_date: off_date,
            category: category,
            director: director,
            rate: rate,
            url: url,
            update_img: update_img
        };
        $.ajax({
            url: "admin_edit_movie_info.php",
            type: "POST",
            data: sendData,
            dataType: "json",
            success: function(data) {
                console.log("successfully");
            },
            error: function() {
                console.log("Error");
            }
        })

    })
})