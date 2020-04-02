$(document).ready(function(){

    // $.ajax({
    //     type: "POST",
    //     url: "external/login.php",
    //     dataType: "text",
    //     data: { "person_type":1, "username": "putoaang", "password_hash": "haha", "email": "aasa@aaa.com"},
    //     success: function (data) {
    //         $("#output").append("<p>" + data + "</p>");
    //     },
    //     error: function () {
    //         console.log("error");
    //     }
    // })
    $.ajax({
        type: "POST",
        url: "external/logout.php",
        dataType: "text",
        success: function (data) {
            console.log(data); // "Logout Sucess"
        },
        error: function () {
            console.log("error");
        }
    })
});