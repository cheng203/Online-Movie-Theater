# External API
src path: ```external/*```

Called by http request(eg. jQeury)

## API list
### 1. Login&Register
Jump to: [Login&Register Documentation](./login&register.md)

1. ```register.php```
2. ```login.php```
3. ```logout.php```

### 2. Movie API
Jump to: [Movie Api Documentation](./login&register.md)

1. ```listMovies.php```
2. ```addMoive.php```
3. ```deleteMovie.php```
4. ```modifyMovie.php```
5. ```findMovie.php```
6. ```getMoviePrice.php```
7. ```setMoviePrices.php```


> 下面的还没统一修改

## 8. Customer_get_MPrice.php

src path: ```external/Customer_get_MPrice.php```

Customer gets the price of a movie.
### Require and Response
- Requirire: movie_id,ticket_type_id
- Response: json string
-```[{"price":"30.00"}]
```

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Customer_get_MPrice.php",
        data: { "movie_id":"9","ticket_type_id":"1"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    ````


## 9. Admin_add_goods.php

src path: ```external/Admin_add_goods.php```

Add the info of goods.
### Require and Response
- Requirire: goods_name,price
- Response: "Goods Added Successfully" or "Error"


### example

Called by ajax
```javascript
  $.ajax({
        type: "POST",
        url: "external/Admin_add_goods.php",
        data: { "goods_name":"water","price":"14"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    ```
## 10. Admin_deleteGoods.php

src path: ```external/Admin_deleteGoods.php```

Delete the info of goods.
### Require and Response
- Requirire: goods_id
- Response: "Goods deleted Successfully" or "Error"


### example

Called by ajax
```javascript
 $.ajax({
        type: "POST",
        url: "external/Admin_deleteGoods.php",
        data: { "goods_id":"1"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    ````

## 11. Admin_modify_goods.php

src path: ```external/Admin_modify_goods.php```

Modify the info of goods.
### Require and Response
- Requirire: goods_id,goods_name,price
- Response: "Goods Updated Successfully" or "Error"


### example

Called by ajax
```javascript  
$.ajax({
        type: "POST",
        url: "external/Admin_modify_goods.php",
        data: { "goods_id":"2","goods_name":"water","price":"23"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
````
## 12. Customer_get_goods_price.php

src path: ```external/Customer_get_goods_price.php```

Customer gets the price of goods.
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
        url: "external/Customer_get_goods_price.php",
        data: { "goods_id":"2",},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    `````
## 13. Find_Room_ByName.php

src path: ```external/Find_Room_ByName.php```

Find the info of a room by room_name.
### Require and Response
- Requirire: room_name
- Response: json string
-```[{"room_id":"1","room_name":"aaa","capacity":"30"}]
```


### example

Called by ajax
```javascript  
$.ajax({
        type: "POST",
        url: "external/Find_Room_ByName.php",
        data: { "room_name":"aaa",},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
````
## 14. Find_Room_ByID.php

src path: ```external/Find_Room_ByID.php```

Find the info of a room by room_id.
### Require and Response
- Requirire: room_id
- Response: json string
-```[{"room_id":"1","room_name":"aaa","capacity":"30"}]
```


### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Find_Room_ByID.php",
        data: { "room_id":"1",},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
````

## 15. ListRooms.php

src path: ```external/ListRooms.php```

List all the rooms
### Require and Response
- Requirire: none
- Response: json string
-```[{"room_id":"1","room_name":"aaa","capacity":"30"},{"room_id":"2","room_name":"acs","capacity":"50"}]
```


### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/ListRooms.php",
        data: { },
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```


## 16. Find_room_by_date.php

src path: ```external/Find_room_by_date.php```

Find the timeflag of a room on someday
### Require and Response
- Requirire: room_id, date
- Response: json string
-```[{"room_id":"1","date":"2020-01-01","time_flag":"1000000"}]
```


### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Find_room_by_date.php",
        data: {"room_id":"1","date":"2020-01-01"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    ```

## 17. Listroombydate.php

src path: ```external/Listroombydate.php```

List the timeflag of all rooms on someday
### Require and Response
- Requirire:  date
- Response: json string
-``` [{"room_id":"1","date":"2020-02-01","time_flag":"000000"},{"room_id":"2","date":"2020-02-01","time_flag":"000000"}]
```


### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Listroombydate.php",
        data: {"date":"2020-02-01"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
    ```