$(document).ready(function() {
    $(".logout").on("click", function() {
        localStorage.clear();
        window.location.href = "index.html";
    })
})