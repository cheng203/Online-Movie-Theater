$(document).ready(function() {
    initUploader();
});

function generateUploader(path){
    if (path.charAt(path.length - 1) != "/") {
        path = path + "/";
    }
    var uploader = $("<plugin/>").attr("path", path);
    path = path + 'image_upload/upload.php'; //relative path to upload.php
    var form = $("<form/>").addClass("image_form")
        .attr("action", path)
        .attr("method", "post")
        .attr("enctype", "multipart/form-data")
        .append('<input class="images_input" type="file" name="image" accept="image/*"  multiple="true"/><input type="submit" value="Upload"><p class="hint"></p>');
    uploader.append(form);
    uploader.on('submit', 'form', function(e) {
        var formData = new FormData();
        var images = $(this).find(".images_input")[0].files;
        var hint = $(this).find(".hint")[0];
        var thisForm = $(this);
        for (var i = 0; i < images.length; i++) {
            formData.append('image[]', images[i]);
        }
        e.preventDefault();
        $(hint).html(" ");
        $.ajax({
            url: path,
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                var date = new Date();
                $(hint).html(date.toLocaleString() + "&nbsp&nbsp&nbsp" + "under uploading...");
            },
            success: function(data) {
                var date = new Date();
                if (data != "You have no perssiom to upload images.") {
                    $(hint).html(date.toLocaleString() + "&nbsp&nbsp&nbsp" + data + " images uploaded successfully.");
                } else {
                    $(hint).html(data);
                }
                thisForm[0].reset();
            },
            error: function(e) {
                console.log("error");
            }
        });
    });
    return uploader;
}

function initUploader(){
    var path = $("plugin.image_upload").attr("path");
    if (path&&path.charAt(path.length - 1) != "/") {
        path = path + "/";
    }
    path = path + 'image_upload/upload.php'; //relative path to upload.php
    var form = $("<form/>").addClass("image_form")
        .attr("action", path)
        .attr("method", "post")
        .attr("enctype", "multipart/form-data")
        .append('<input class="images_input" type="file" name="image" accept="image/*"  multiple="true"/><input type="submit" value="Upload"><p class="hint"></p>');
    $("plugin.image_upload").append(form);
    $("plugin.image_upload").on('submit', 'form', function(e) {
        var formData = new FormData();
        var images = $(this).find(".images_input")[0].files;
        var hint = $(this).find(".hint")[0];
        var thisForm = $(this);
        for (var i = 0; i < images.length; i++) {
            formData.append('image[]', images[i]);
        }
        e.preventDefault();
        $(hint).html(" ");
        $.ajax({
            url: path,
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                var date = new Date();
                $(hint).html(date.toLocaleString() + "&nbsp&nbsp&nbsp" + "under uploading...");
            },
            success: function(data) {
                var date = new Date();
                if (data != "You have no perssiom to upload images.") {
                    $(hint).html(date.toLocaleString() + "&nbsp&nbsp&nbsp" + data + " images uploaded successfully.");
                } else {
                    $(hint).html(data);
                }
                thisForm[0].reset();
            },
            error: function(e) {
                console.log("error");
            }
        });
    });
}