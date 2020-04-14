$(document).ready(function() {
    var username = localStorage.getItem("username");
    var user_type = localStorage.getItem("user_type");
    if (username == null || username == "") {
        $(".signin-show").show();
        $(".user-show").hide();
    } else {
        if (user_type == 0) {
            $(".signin-show").hide();
            $(".user-show").show();
            var user = "Welcome, Admin " + username;
            $(".username-login").html(user);
            $(".add-delete-movie").show();
        } else {
            $(".signin-show").hide();
            $(".user-show").show();
            var user = "Welcome, " + username
            $(".username-login").html(user);
        }
    }
})