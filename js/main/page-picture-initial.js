$(document).ready(function() {

    //following will be used to get image for carousel section
    //before get information, first delete content inside of carousel now
    $(".carousel-inner").clear();
    $(".carousel-indicators").clear();
    var path = "movie/movie-page-template.html";
    $.ajax({
        type: "get",
        url: ".....",
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
                        '<a href="' + path + '"><img src="' + data[i].url + '" class="d-block w-100 movie-link" alt="image"></a>' +
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
                        '<a class= "movie-link" href="' + path + '"><img src="' + data[i].url + '" class="d-block w-100 " alt="' + data[i].movie_name + '"></a>' +
                        '<div class="carousel-caption d-none d-md-block">' +
                        '<h5>' + data[i].movie_name + '</h5>' +
                        '</div></div>'
                    )
                }
            }
        },
        error: function() {
            console.log("Failed to load");
        }
    })


    //following will be used to get image for what's new section
    //before get information, first delete content inside of what's new body
    $("#new ul").clear();
    $.ajax({
        type: "get",
        url: "......",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#new ul").append(
                    '<li class="nav-item">' +
                    '<a class="nav-link movie-link" href="' + path + '">' +
                    '<img class="recommendation-img" src="' + data[i].url + '" alt= "' + data[i].movie_name +
                    '">' +
                    '</a></li>'
                )
            }
        }
    })
})