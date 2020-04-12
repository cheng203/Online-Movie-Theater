# Doc

## Feature
- Can upload images through html front page to server;
- Can upload multiple images at a time;
- Support image formats: ``jpeg``, ``jpg``, ``png``, ``gif``, ``bmp`` , ``pdf`` , ``doc`` , ``ppt``;
- Images will be saved in folder on server which you assigned in php script;
- The name of uploaded images will be saved on database(default table: image_library)



Attention: default upload size limit in php.int is 2MB. So if you want to upload images, you should modify php.ini on your server.

```
upload_max_filesize = 2M
```
change 2M to any size you want. 
```
upload_max_filesize = 8M
```

## Usage:

1. Copy html code;
2. Include javascript file ```/image_upload/upload.js``` in your html file;
3. Change the relative path of ```upload.php``` in html part.
   - For example, html file which is in root directory: ```action="./image_upload/upload.php"```

About ajax response:
- If there's no permission
  - string: You have no perssiom to upload images.
- If no image has been uploaded
  - JSON string: []
- If image uploaded success
  - JSON string: [{'image' : 'img11.png'},{'image' : img22.png'}]
  - The value of 'image' is the image file name on your client



Default:

The picture will be stored in /uploads folder on server.



## Html Part
```html
<form class="image_form" action="process.php" method="post" enctype="multipart/form-data">
<input class="images_input" type="file" name="image" accept="image/*"  multiple="true"/>
<input type="submit" value="Upload">
</form>
```


## Javasript Part
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
```
## php part

You can set up destination directory on server.

```php
<?php 
$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt'); // valid extensions
$path = '../uploads/'; // upload directory
if($_FILES['image']){
    $size = count($_FILES['image']['name']);
    for($i = 0; $i < $size; $i++){
        $img = $_FILES['image']['name'][$i];
        $tmp = $_FILES['image']['tmp_name'][$i];
        processImage($img, $tmp);
    }
}
function processImage($img, $tmp){
    global $valid_extensions, $path;
    // get uploaded file's extension
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    // can upload same image using rand function
    $final_image = time() . '-' . $img;
    // check's valid format
    echo $ext;
    echo " ".in_array($ext, $valid_extensions);
    if(in_array($ext, $valid_extensions)){ 
        $path = $path.strtolower($final_image); 
        if(move_uploaded_file($tmp,$path)) {
            return true;
        }
    } 
    return false;
}
?>
```