# Plugins Documentation



## 1. Image Upload Plugin

### Feature
- Can upload images through html front page to server;
- Can upload multiple images at a time;
- Corresponding thumb image will be created in ```%upload_directory%/thumb```;
- Image name will be generated according to the format ```%current_timestamp%-%image_count_in database%-%image_name%```, such as ```1586833429-56-poster.png```;
- Thumb image name will be ```thumb-%saved_image_name%```, such as ```thumb-1586833429-56-poster.png```;
- Support image formats: ``jpeg``, ``jpg``, ``png``, ``gif``;
- Images will be saved in folder on server which you assigned in php script;
- The name of uploaded images will be saved on database(default table: image_library)
- Needs administrator authority



Attention: php.ini determines three upload limits. So if you want to upload many files with big size, you should modify php.ini by searching the corresponding statement.

1. POST data size limit
  - default: 8MB
  - ```post_max_size = 8M``` -> ```post_max_size = 100M```
2. Single file size limit
  - default: 2MB
  - ```upload_max_filesize = 2M``` -> ```upload_max_filesize = 10M```

3. File number limit in one POST request
  - default: 20
  - ```max_file_uploads = 20``` -> ```max_file_uploads = 40```


### Usage:
1. Include ```upload.js```
 ```html 
  <script src="./plugins/image_upload/upload.js"></script>
  ```
2. Create a element with ```plugin``` as type and ```image_upload``` as class
   
```html
<plugin class="image_upload" path="./plugins"></plugin>
```

In jqeury:
```javascript
var uploader = generateUploader(path);
$("div").append(uploader);
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


## 2. Image Select Plugin

### Feature
- Select&locate image in server
- Acquire id and file name of image
- Select image by list of thumbs
- Multiple instances of plugin can exist in same html 
- Needs administrator authority

### Usage:
1. Include ```select.js```
 
  ```html 
  <script src="./plugins/image_select/select.js"></script>
  ```
- Create a element with ```plugin``` as type and ```image_select``` as class
   
```html
<plugin class="image_select" path="./plugins"></plugin>
```

- In jqeury:
```javascript
var selector = generateSelector(path);
$("div").append(selector);
```

- path: relative path to folder plugins
  - For example, in index.html: ```path="./plugins"```
1. In the image library, click the check box of image to be selected, then click ```Confirm``` button
2. If you want to clear previous select, click ```Cancel``` in the media library.

After selection, you will get

1. Names of files will be displayed;
2. Important: a list of image id will saved as a attribute in this plugin element. You can get the value of attribute ```imgidlist``` and send it to server ,then server can locate the image you want by those id.
   - Such as: ```<plugin class="image_select" path="./plugins" style="display: block;" imgidlist="132,138">...</plugin>```

## 3. Image Setting Plugin

### Feature
- Can set images for movies and goods
- Integrate image uploader
- Based on image_upload and image_select plugins
- Needs administrator authority

### Usage:
1. Include ```select.js```, ```upload.js``` and ```image_setting.js```
  ```html
      <script src="./plugins/image_upload/upload.js"></script>
      <script src="./plugins/image_select/select.js"></script>
      <script src="./plugins/image_setting/image_setting.js"></script>
  ```

   - In html: create a element with ```plugin``` as type and ```image_setting``` as class
   
```html
<plugin class="image_setting" path="./plugins"></plugin>
```

   - In jqeury:
```javascript
var setter = generateImageSetter(path);
$("div").append(setter);
```