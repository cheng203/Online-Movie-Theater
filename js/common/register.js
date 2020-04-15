$(document).ready(function() {

    $("#signUp").on("click", function() {
        $("#myModal").css("display", "none");
    });
    //once sign up is selected, sign-up modal will pop up and hide the first modal
    $(".signup-btn").on("click", function() {
        var username = $("#signup-username").val();
        var password = $("#signup-password").val();
        var email = $("#signup-email").val();
        // username validation
        if (username.trim() == "") {
            $("#signup-username").after("<span class='error'>This field is required</span>");
        }

        // valid password should be between 7 to 15 characters which contain at least one numeric digit and a special letter
        if (password.trim() == "") {
            $("#signup-password").siblings("span").text("This field is required");
        } else if (password.length < 7) {
            $("#signup-password").siblings("span").text("Password is too short");
        } else if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
            $("#signup-password").siblings("span").text("Password needs to contain at least one digit and a special letter");
        } else {
            $("#signup-password").siblings("span").text("");
        }

        // email validation
        if (email.trim() == "") {
            $("#signup-email").siblings("span").text("This field is required");
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            $("#signup-email").siblings("span").text("Email address is invalid");
        } else {
            $("#signup-email").siblings("span").text("");
        }

        // hash the password
        password = password = $.md5(password);

        // sending user info back to register.php
        $.ajax({
            type: "POST",
            url: "external/register.php",
            dataType: "text",
            data: {
                "person_type": 1,
                "username": username,
                "password_hash": password,
                "email": email
            },
            success: function(data) {
                console.log(data); // data will be 10, 11 or 12
            },
            error: function() {
                console.log("error");
            }
        })
    });

    //Solve the problem of closing second modal, but still have the shade of first one
    $("#sign-Up").on("hide.bs.modal", function() {
        $(".modal-backdrop").remove();
    })
})