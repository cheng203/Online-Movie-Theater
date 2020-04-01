$(document).ready(function(){

    $.ajax({
        type: "POST",
        url: "external/register.php",
        dataType: "text",
        data: { "person_type":1, "username": "putoaaang", "password_hash": "haha", "email": "aasa@aaa.com"},
        success: function (data) {
            $("#output").append("<p>" + data + "</p>");
        },
        error: function () {
            console.log("error");
        }
    })




});