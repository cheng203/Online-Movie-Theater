$(document).ready(function() {
    // $("#carousel").carousel({
    //     interval: 2000
    // }, 'cycle');
    $("#signIn").on("click", function() {
        $("#myModal").attr("aria-hidden", "false")
    })
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