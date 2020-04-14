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
1. Include ```upload.js```
   - <script src="./plugins/image_upload/upload.js"></script>
2. Create a element with plugin as type and image_upload as class
   
```html
<plugin class="image_upload" path="./plugins"></plugin>
```
- path: relative path to folder plugins
  - For example, in index.html: ```path="./plugins"```

About ajax response:
- If there's no permission
  - string: You have no perssiom to upload images.
- else
  - Number of images uploaded successfully.
<!-- - If no image has been uploaded
  - JSON string: []
- If image uploaded success
  - JSON string: [{'image' : 'img11.png'},{'image' : img22.png'}]
  - The value of 'image' is the image file name on your client -->



Default:

The picture will be stored in /uploads folder on server.

### Default Destination Setting

- You can set up destination directory by modify ```upload.php```.

```php
$path = '../../uploads/'; //upload directory relative to upload.php
```

### References
Thumb by ```Dejan  QQ: 673008865```: https://github.com/aileshe/Thumb


## Image Select Plugin