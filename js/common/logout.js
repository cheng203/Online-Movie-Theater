$(document).ready(function() {
    $(".logout").on("click", function() {
        $.ajax({
            type: 'POST',
            url: 'external/logout.php',
            dataType: 'text',
            success: function(data) {
                localStorage.clear();
                alert(data);
                window.location.href = "index.html";
            }
        })
    })
})