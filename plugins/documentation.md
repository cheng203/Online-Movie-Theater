# Plugins Documentation

## Image Upload Plugin

### Feature
- Can upload images through html front page to server;
- Can upload multiple images at a time;
- Corresponding thumb image will be created in ```%upload_directory%/thumb```;
- Image name will be generated according to the format ```%current_timestamp%-%image_count_in database%-%image_name%```, such as ```1586833429-56-poster.png```;
- Thumb image name will be ```thumb-%saved_image_name%```, such as ```thumb-1586833429-56-poster.png```;
- Support image formats: ``jpeg``, ``jpg``, ``png``, ``gif``;
- Images will be saved in folder on server which you assigned in php script;
- The name of uploaded images will be saved on database(default table: image_library)



Attention: default upload size limit in php.ini is 2MB. So if you want to upload images over 2MB, you should modify php.ini file on your server.

```
upload_max_filesize = 2M
```
change 2M to any size you want, such as 8M(8MB).
```
upload_max_filesize = 8M
```

### Usage:

1. Copy html code;
2. Include javascript file ```/plugins/image_upload/upload.js``` in your html file;
3. Change the relative path of ```upload.php``` in html part.
   - For example, index.html: ```action="./plugins/image_upload/upload.php"```

About ajax response:
- If there's no permission
  - string: You have no perssiom to upload images.
- Else
  - Number of images uploaded successfully.
<!-- - If no image has been uploaded
  - JSON string: []
- If image uploaded success
  - JSON string: [{'image' : 'img11.png'},{'image' : img22.png'}]
  - The value of 'image' is the image file name on your client -->



Default:

The picture will be stored in /uploads folder on server.



### Html Part
```html
<form class="image_form" action="./plugins/image_upload/upload.php" method="post" enctype="multipart/form-data">
    <input class="images_input" type="file" name="image" accept="image/*"  multiple="true"/>
    <input type="submit" value="Upload">
    <p class="hint"></p>
</form>
```


### Javasript Part
image_upload/upload.js

```javascript
$(document).ready(function (e) {
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
```
### php part

You can set up destination directory on server.

This php script uses Thumb plugin by ```Dejan  QQ: 673008865```.

```php
$path = '../../uploads/'; //upload directory relative to upload.php
```


## Image Select Plugin