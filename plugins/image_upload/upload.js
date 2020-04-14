$(document).ready(function (e) {
    // $.ajax({
    //     type: "POST",
    //     url: "../external/login.php",
    //     dataType: "text",
    //     data: { "person_type":0, "username": "normal", "password_hash": "normal", "email": "aasa@aaa.com"},
    //     success: function (data) {
    //         $("#output").append("<p>" + data + "</p>");
    //     },
    //     error: function () {
    //         console.log("error");
    //     }
    // })


    $(".image_form").on('submit',(function(e) {
        var formData = new FormData();
        var images = $(this).children(".images_input")[0].files;
        for(var i=0;i<images.length;i++){
            formData.append('image[]',images[i]);
        }
        e.preventDefault();
        $(".hint").html(" ");
        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data:  formData,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                var date = new Date();
                $(".hint").html(date.toLocaleString()+"&nbsp&nbsp&nbsp"+"under uploading...");
            },
            success: function(data){
                var date = new Date();
                $(".hint").html(date.toLocaleString()+"&nbsp&nbsp&nbsp"+data+" images uploaded successfully.");
                $(".image_form")[0].reset(); 
            },
            error: function(e) {
                console.log("error");
            }          
        });
    }));
});