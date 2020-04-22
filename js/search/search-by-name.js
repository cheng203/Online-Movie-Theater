$(document).ready(function() {

    //This event will show content of movie while user search
    $('.user-search').bind("input propertychange", function() {
        var key = $(".user-search").val();
        if (key.trim().length == 0) {
            $(".search-name").hide();
            return;
        } else {
            $(".search-name").show();
            $(".search-name").empty();
            $.ajax({
                type: "POST",
                url: "../external/movie_api/searchMoviebyStartString.php",
                data: { "key": key },
                dataType: "json",
                success: function(data) {
                    //expected to receive a list of movie-name including key
                    for (var i = 0; i < data.length; i++) {
                        $(".search-name").append(
                            '<li class="list-group-item search-name-item">' + data[i].movie_name + '</li>'
                        )
                    }
                },
                error: function() {
                    console.log("failed");
                }
            });
        }
    });

    //add event to submit button
    $(".search-submit").on("click", function() {
        var key = $(".user-search").val();
        $.ajax({
            type: "POST",
            url: "......",
            data: { "key": key },
            dataType: "json",
            success: function(data) {
                //expect to return movie-name, movie-image-url; if not found, return a indicator
                if (data[0].indicator == "false") {
                    $(".movie-list-body").empty();
                    $(".movie-list-body").append('<h3>Sorry, the movie you search is currently not on the show</h3>')
                } else {
                    //if found, add movie to list body
                    $(".movie-list-body").append(
                        '<li class=" clearfix movie-list-body-li">' +
                        '<div style="float: left;">' +
                        '<img src="' + data[1].url + '">' +
                        '<button class="btn btn-light value="' + data[1].movie_name + '">Go to Movie</button>' +
                        '</div>' +
                        '</li>'
                    );
                }
            }
        })
    })
})