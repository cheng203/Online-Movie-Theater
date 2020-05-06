// $(document).ready(function() {
//     var username = localStorage.getItem("username");
//     var user_type = localStorage.getItem("user_type");
//     if (username == null || username == "") {
//         $(".signin-show").show();
//         $(".logout").hide();
//         $(".admin-edit").hide();
//     } else {
//         if (user_type == 0) {
//             var user = newFunction(username);
//         } else {
//             $(".signin-show").hide();
//             $(".admin-edit").hide();
//             $(".user-show").show();
//             $(".logout").show();
//             var user = "Welcome, " + username
//             $(".username-login").html(user);
//         }
//     }
// })

$(document).ready(function(){
    setTimeout(userLoad, 100);
});

function userLoad() {
    var username = localStorage.getItem("username");
    var user_type = localStorage.getItem("user_type");
    if (username == null || username == "") {
        $(".signin-show").show();
        $(".logout").hide();
        $(".admin-edit").hide();
    } else {
        if (user_type == 0) {
            var user = newFunction(username);
        } else {
            $(".signin-show").hide();
            $(".admin-edit").hide();
            $(".user-show").show();
            $(".logout").show();
            var user = "Welcome, " + username
            $(".username-login").html(user);
        }
    }
}

function newFunction(username) {
    console.log("load admin");
    $(".signin-show").hide();
    $(".user-show").show();
    $(".logout").show();
    var user = "Welcome, Admin " + username;
    $(".username-login").html(user);
    $(".admin-edit").show();
    return user;
}
