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
        console.log(movie_url);
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
        $(".movie-url").val(movie_url);
    })
})