$(document).ready(function (e) {
    $("#image_form").on('submit',(function(e) {
        e.preventDefault();
        $.ajax({
            url: "process.php",
            type: "POST",
            data:  new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
                if(data=='invalid'){
                    console.log("Invalid Image");
                }
                else{
                    $("#output").append(data);
                    // console.log(data);
                    $("#image_form")[0].reset(); 
                }
            },
            error: function(e) {
                console.log("error");
            }          
        });
    }));
});