$(document).ready(function() {

    //following will be used to get image for carousel section
    //before get information, first delete content inside of carousel now
    $(".carousel-inner").empty();
    $(".carousel-indicators").empty();

    //path for movie template html
    $.ajax({
        type: "POST",
        url: "external/movie_api/SelectFiveNewMovie.php",
        dataType: "text",
        success: function(data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                // need to add the first carousel-item an active class to show
                if (i == 0) {
                    // add bottom li first
                    $(".carousel-indicators").append('<li data-target="#carouselExampleCaptions" data-slide-to="' + i + '" class="active"></li>')
                        // add carousel body image
                    $(".carousel-inner").append(
                        '<div class="carousel-item active">' +
                        '<a class = "movie-link" href="movie.html" value = "' + data[i].movie_id + '" alt="' + data[i].name + '"><img src="./uploads/' + data[i].url + '" class="d-block w-100 movie-link" alt="' + data[i].name + '"></a>' +
                        '<div class="carousel-caption d-none d-md-block">' +
                        '<h5>' + data[i].name + '</h5>' +
                        '</div></div>'
                    )
                } else {
                    // add bottom li first
                    $(".carousel-indicators").append('<li data-target="#carouselExampleCaptions" data-slide-to="' + i + '"></li>')
                        // add carousel body image
                    $(".carousel-inner").append(
                        '<div class="carousel-item">' +
                        '<a class = "movie-link" href="movie.html" " value = "' + data[i].movie_id + '" alt="' + data[i].name + '"><img src="./uploads/' + data[i].url + '" class="d-block w-100 movie-link" alt="' + data[i].name + '"></a>' +
                        '<div class="carousel-caption d-none d-md-block">' +
                        '<h5>' + data[i].name + '</h5>' +
                        '</div></div>'
                    )
                }
            }
            $(".movie-link").on("click", function() {
                console.log($(this).attr("value"))
        
                localStorage.setItem("movie_id", $(this).attr("value"));
                localStorage.setItem("movie_name", $(this).attr("alt"));
            })
        },
        error: function() {
            console.log("failed");
        }
    })


    //following will be used to get image for what's new section
    //before get information, first delete content inside of what's new body
    $("#new ul").empty();
    $.ajax({
        type: "get",
        url: "external/movie_api/NewMovie_Search.php",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                // add movie_id to value, add movie_name to alt
                $("#new ul").append(
                    '<li class="nav-item">' +
                    '<a class="nav-link movie-link" href="./movie.html" value = "' + data[i].movie_id + '" alt = "' + data[i].name + '">' +
                    '<img class="recommendation-img" src="./uploads/' + data[i].url + '">' +
                    '</a></li>'
                )
            }
            $(".movie-link").on("click", function() {
                localStorage.setItem("movie_id", $(this).attr("value"));
                localStorage.setItem("movie_name", $(this).attr("alt"));
            })
        }
    })
})