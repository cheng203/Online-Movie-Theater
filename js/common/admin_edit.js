$(document).ready(function() {
    // For admin to add movie
    $(".movie-add-button").on("click", function() {
        var movie_edit_name = $("#added-movie-name").val();
        var release_date = $("#added-movie-release-date").val();
        var duration = $("#added-movie-duration").val();
        var off_date = $("#added-movie-off-date").val();
        var category = "";
        $.each($("input[name='edit-movie']:checked"), function() {
            category = $(this).val();
        })
        var director = $("#added-movie-director").val();
        var rate = $("#added-movie-rate").val();
        var front_image = $(".added-movie-frontImg")[0].files;
        var info_image = $(".added-movie-infoImg")[0].files;
        //stage_image is an array;
        var stage_image = $(".added-movie-stageImg")[0].files;
        console.log(stage_image);
        var shop_image = $(".added-movie-shopImg")[0].files;
        var room = $(".added-movie-room").val();
        var time = $(".added-movie-time option:selected").text();

        var formData = new FormData();
        formData.append("movie_edit_name", movie_edit_name);
        formData.append("release_date", release_date);
        formData.append("duration", duration);
        formData.append("off_date", off_date);
        formData.append("category", category);
        formData.append("director", director);
        formData.append("rate", rate);
        formData.append("front_image", front_image);
        formData.append("info_image", info_image);
        // formData.append("stage_image", stage_image);
        for (var i = 0; i < stage_image.length; i++) {
            formData.append('stage_image[]', stage_image[i]);
        }
        formData.append("shop_image", shop_image);
        formData.append("room", room);
        formData.append("time", time);

        // send formData to backend
        $.ajax({
            url: "adminEdit.php",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                if (data == 'invalid') {
                    alert("Added Successfully")
                } else {
                    alert("Not Added Successfully")
                }
            },
            error: function(e) {
                console.log("error");
            }
        });
    })
})