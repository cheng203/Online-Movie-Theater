$(document).ready(function() {
    //To get a list of movie type
    $.ajax({
        type: "POST",
        url: "external/movie_api/listMovieCategory.php",
        dataType: "json",
        success: function(data) {
            //return will a list of movie type
            //first clear category
            $(".movie-category-body ul").empty();
            //first append categeory and all to page
            $(".movie-category-body ul").append(
                '<li class="nav-item nav-link movie-search-link" style="font-weight: bold;">Category: </li>' +
                '<li class="nav-item"><a class="nav-link active movie-search-link" href="#">all</a></li>'
            );
            for (var i = 0; i < data.length; i++) {
                $(".movie-category-body ul").append(
                    '<li class="nav-item"><a class="nav-link movie-search-link" href="#">' + data[i].type_name + '</a></li>'
                )
            }
        },
        error: function() {
            console.log("error");
        }
    });

    //when page first loaded, it will show all movie first
    $.ajax({
        type: "POST",
        url: "external/movie_api/listMovieAndImage.php",
        data: [{ "type": "all" }],
        dataType: "json",
        success: function(data) {
            pagination(data);
            display(data, 1);
        }
    })
})