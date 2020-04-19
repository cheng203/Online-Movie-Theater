# Goods API

src path: ```external/goods_api/*```

## Goods Attributes Constraint
```sql
`goods_id` tinyint unsigned auto_increment,
`goods_name` varchar(64) not null unique,
`price` decimal(8,2) unsigned not null,
`image_id` int unsigned not null foreign key references `image_library`(`image_id`) 
```

## 1. listGoods.php
src path: ```external/goods_api/listGoods.php```

Fetch all goods and its info.

### Require and Response
- Require: none
- Response: 
  - json string 
```
[{"image_id":"10","goods_id":"1","goods_name":"pop","price":"15.00","image_name":"1587246179-9-2020-01-15.png"},
{"image_id":"10","goods_id":"2","goods_name":"drink","price":"10.00","image_name":"1587246179-9-2020-01-15.png"},
{"image_id":"7","goods_id":"3","goods_name":"pop+drink","price":"20.00","image_name":"1587246179-6-2018-10-10 (1).png"}]
```       
  - If no movie: "No Goods"

  
All information about goods will be return. Such as name, price, image name.

Image path:
```
/uploads/$image_name$
```




### example

Called by ajax
```javascript
    $.ajax({
        type: "POST",
        url: "external/goods_api/listGoods.php",
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 2. getGoodsPriceByID

src path: ```external/goods_api/getGoodsPricebyID.php```

Get the price of goods.
### Require and Response
- Requirire: goods_id
- Response: json string
-```[{"price":"23.00"}]
```

### example

Called by ajax
```javascript
 $.ajax({
        type: "POST",
        url: "external/goods_api/getGoodsPricebyID.php",
        data: { "goods_id":"2",},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 3. addGoods.php

src path: ```external/goods_api/addGoods.php```

Add the info of goods.
### Require and Response
- Requirire: goods_name,price
- Response: "Goods Added Successfully" or "Error"


### example

Called by ajax
```javascript
  $.ajax({
        type: "POST",
        url: "external/goods_api/addGoods.php",
        data: { "goods_name":"water","price":"14.50"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 4. deleteGoods.php

src path: ```external/goods_api/deleteGoods.php```

Delete the info of goods.
### Require and Response
- Requirire: goods_id
- Response: "Goods deleted Successfully" or "Error"


### example

Called by ajax
```javascript
 $.ajax({
        type: "POST",
        url: "external/goods_api/deleteGoods.php",
        data: { "goods_id":"1"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 5. modifyGoods.php

src path: ```external/goods_api/modifyGoods.php```

Modify the info of goods.
### Require and Response
- Requirire: goods_id,goods_name,price
- Response: "Goods Updated Successfully" or "Error"


### example

Called by ajax
```javascript  
$.ajax({
        type: "POST",
        url: "external/goods_api/modifyGoods.php",
        data: { "goods_id":"2","goods_name":"water","price":"23"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```



