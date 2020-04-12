$(document).ready(function (e) {
    $(".image_form").on('submit',(function(e) {
        var formData = new FormData();
        var images = $(this).children(".images_input")[0].files;
        for(var i=0;i<images.length;i++){
            formData.append('image[]',images[i]);
        }
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data:  formData,
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
                if(data=='invalid'){
                    console.log("Invalid Image");
                }
                else{
                    $("#output").append(data);
                    $(".image_form")[0].reset(); 
                }
            },
            error: function(e) {
                console.log("error");
            }          
        });
    }));
});