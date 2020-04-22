$(document).ready(function() {
    $(".go-to-movie").on("click", function() {
        var movie_id = $(this).attr("value");
        var movie_name = $(this).attr("alt");
        localStorage.setItem("movie_id", movie_id);
        localStorage.setItem("movie_name", movie_name);
        window.location.href = "../movie/movie-page-template.html";
    })
})