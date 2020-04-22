$(document).ready(function() {
    $(".sign-in").on("click", function() {
        var username = $("#username").val();
        var password = $("#password").val();
        //hash the password
        password = $.md5(password);
        $.ajax({
            type: "POST",
            url: "external/login.php",
            dataType: "text",
            data: { "username": username, "password_hash": password },
            success: function(data) {
                if (data.login_status == 20) {
                    alert("Either username or password does not match. Please try again");
                } else {
                    var user_type = data["user_type"];
                    localStorage.setItem("username", username);
                    localStorage.setItem("user-type", user_type);
                    window.location.href = "../index.html";
                }

            },
            error: function() {
                alert("Username or password does not match. Please try again");
            }
        })


        // This is just for testing
        // var user_type = 0;
        // localStorage.setItem("username", username);
        // localStorage.setItem("password", password);
        // localStorage.setItem("user_type", user_type);
        // window.location.href = "index.html";
    })
})