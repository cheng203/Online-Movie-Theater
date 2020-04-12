$(document).ready(function() {
    $(".sign-in").on("click", function() {
        var username = $("#username").val();
        var password = $("#password").val();
        password = $.md5(password);
        $.ajax({
            type: "POST",
            url: "external/login.php",
            dataType: "text",
            data: { "username": username, "password_hash": password },
            success: function(data) {
                if (successfully) {
                    window.location("index.html");
                }
            },
            error: function() {
                alert("Username or password does not match. Please try again");
            }
        })
    })
})