$(document).ready(function() {
    $(".carousel-control-prev").on("click", function() {
        $("#carousel").carousel("prev")
    })
    $(".carousel-control-next").on("click", function() {
        $("#carousel").carousel("next")
    })
    $(".carousel-indicators").on("click", "li", function() {
        $("#carousel").carousel(parseInt($(this).attr("data-slide-to")));
    })
})