$(document).ready(function() {
    //once category is clicked. return corresponding movie list
    $(".movie-search-link").on("click", function() {
        //get selected movie type
        var category = $(this).text();
        $.ajax({
            type: "POST",
            url: "external/movie_api/SearchMovieByCategory.php",
            data: { "type": category },
            success: function(data) {
                //data has movie_id, movie_name, movie_url
                pagination(data);
                $(".pagination").on("click", "li", function() {
                    display(data, $(this).text());
                })
            }
        })
    })
})