$(document).ready(function() {
    //Every time user click a linked image, it will save movie's name (in alt attribute) into localStorgae variable "movie-name".
    $(".movie-link").on("click", function() {
        localStorage.setItem("movie-name", $(this).attr("alt"));
    })
})