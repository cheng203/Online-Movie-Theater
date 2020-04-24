$(document).ready(function() {

    //following will be used to get image for carousel section
    //before get information, first delete content inside of carousel now
    $(".carousel-inner").clear();
    $(".carousel-indicators").clear();

    //path for movie template html
    var path = "movie/movie-page-template.html";
    $.ajax({
        type: "POST",
        url: "external/movie_api/SelectFiveNewMovie.php",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                // need to add the first carousel-item an active class to show
                if (i == 0) {
                    // add bottom li first
                    $("carousel-indicators").append('<li data-target="#carouselExampleCaptions" data-slide-to="' + i + '" class="active"></li>')
                        // add carousel body image
                    $("carousel-inner").append(
                        '<div class="carousel-item active">' +
                        '<a class = "movie-link" href="' + path + '" value = "' + data[i].movie_id + '" alt="' + data[i].movie_name + '"><img src="../uploads/' + data[i].url + '" class="d-block w-100 movie-link" alt="' + data[i].movie_name + '"></a>' +
                        '<div class="carousel-caption d-none d-md-block">' +
                        '<h5>' + data[i].movie_name + '</h5>' +
                        '</div></div>'
                    )
                } else {
                    // add bottom li first
                    $("carousel-indicators").append('<li data-target="#carouselExampleCaptions" data-slide-to="' + i + '"></li>')
                        // add carousel body image
                    $("carousel-inner").append(
                        '<div class="carousel-item">' +
                        '<a class = "movie-link" href="' + path + '" value = "' + data[i].movie_id + '" alt="' + data[i].movie_name + '"><img src="../uploads/' + data[i].url + '" class="d-block w-100 movie-link" alt="' + data[i].movie_name + '"></a>' +
                        '<div class="carousel-caption d-none d-md-block">' +
                        '<h5>' + data[i].movie_name + '</h5>' +
                        '</div></div>'
                    )
                }
            }
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
        url: "......",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                // add movie_id to value, add movie_name to alt
                $("#new ul").append(
                    '<li class="nav-item">' +
                    '<a class="nav-link movie-link" href="' + path + '" value = "' + data[i].movie_id + '" alt = "' + data[i].movie_name + '">' +
                    '<img class="recommendation-img" src="../uploads/' + data[i].url + '">' +
                    '</a></li>'
                )
            }
        }
    })
})