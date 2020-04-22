$(document).ready(function() {
    var username = localStorage.getItem("username");
    var user_type = localStorage.getItem("user_type");
    if (username == null || username == "") {
        $(".signin-show").show();
        $(".logout").hide();
        $(".admin-edit").hide();
    } else {
        if (user_type == 0) {
            $(".signin-show").hide();
            $(".user-show").show();
            $(".logout").show();
            var user = "Welcome, Admin " + username;
            $(".username-login").html(user);
            $(".admin-edit").show();
        } else {
            $(".signin-show").hide();
            $(".admin-edit").hide();
            $(".user-show").show();
            $(".logout").show();
            var user = "Welcome, " + username
            $(".username-login").html(user);
        }
    }
})