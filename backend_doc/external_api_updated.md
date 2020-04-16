# External API
src path: ```external/*```

Called by http request(eg. jQeury)

## 1. register.php
src path: ```external/register.php```

To register a user. 
### Require and Response
- Requirire: person_type, username, password_hash and email
- person_type:  1: admin, 2: normal user
- Response(status_code):
  - 10: username or email exists
  - 11: success
  - 12: (server or query) error 

### example
Called by ajax

```javascript
    $.ajax({
        type: "POST",
        url: "external/register.php",
        dataType: "text",
        data: { "person_type":1, "username": "user1", "password_hash": "hasaaha", "email": "aaa@aaa.com"},
        success: function (data) {
            console.log(data); // data will be 10, 11 or 12
        },
        error: function () {
            console.log("error");
        }
    })
```

## 2. login.php
src path: ```external/login.php```

User login. Once login successed, a session will be created. And backend session will store username and usertype of the user. Then any actions to call a backend services, such as read movie info or modify movie, from html and js will be checked firstly whether user_type has the permission.  
### Require and Response
- Requirire: username, password_hash
- Response(json string):
  - ```{"username": "null", "login_status" : 20, "user_type" : -1}``` login failed. If login failed, the response username will be string "null". So "null" cannot be registed as a user.
  - ```{"username": admin, "login_status" : 21, "user_type" : 0}```  administater login success
  - ```{"username": user1, "login_status" : 21, "user_type" : 1}``` nomal user login success

### example
Called by ajax

```javascript
    $.ajax({
        type: "POST",
        url: "external/login.php",
        dataType: "text",
        data: {"username": "admin", "password_hash": "abc",},
        success: function (data) {
            $("#output").append("<p>" + data + "</p>");
            // data will be the response json string
        },
        error: function () {
            console.log("error");
        }
    })
```

## 3. logout.php
src path: ```external/logout.php```

Logout and destroy session. 
### Require and Response
- Requirire: none
- Response: string ```"Logout Sucess"```

### example
Called by ajax

```javascript
    $.ajax({
        type: "POST",
        url: "external/logout.php",
        dataType: "text",
        success: function (data) {
            console.log(data); // "Logout Sucess"
        },
        error: function () {
            console.log("error");
        }
    })


```
## 4. addMoive.php
src path: ```external/movie_api/admin/addMovie.php```

Add the info of a movie.
### Require and Response
- Requirire: name,type_name,release_date,off_date,director,info,duration,rating,url
- Response: "Movie Added Success" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/movie_api/admin/addMovie.php",
        data: { "name":'foo', "type_name": "Sci", "release_date": "2020/03/04", "off_date": "2020/05/15", "director": "Trump", "info": "asasas", "duration": "120", "rating": "10", "url": "aaaa.com"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 5. Admin_delete_movie.php
src path: ```external/Admin_delete_movie.php```

Delete the info of a movie.
### Require and Response
- Requirire: movie_id
- Response: "Movie deleted Successfully" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Admin_delete_movie.php",
        data: { "movie_id":"7"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```
## 6. Admin_modify_movie.php

src path: ```external/Admin_modify_movie.php```

Modify the info of a movie.
### Require and Response
- Requirire: movie_id,name,type_name,release_date,off_date,director,info,duration,rating,url
- Response: "Movie Modified Successfully" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/Admin_modify_movie.php",
        data: { "movie_id":"9","name":'fooa', "type_name": "Sci", "release_date": "2020/03/04", "off_date": "2020/05/15", "director": "Trump", "info": "asasas", "duration": "120", "rating": "10", "url": "aaaa.com"},
        success: function (data) {
            console.log(data); // "Logout Sucess"
        },
        error: function () {
            console.log("error");
        }
    })

```

## 7. Customer_get_movieInfo.php

src path: ```external/Customer_get_movieInfo.php```

Get the info of a movie.
### Require and Response
- Requirire: movie_id
- Response: json string
-```[{"movie_id":"9","name":"fooa","type_name":"Sci","release_date":"2020-03-04","off_date":"2020-05-15","director":"Trump","info":"asasas","duration":"120","rating":"10","url":"aaaa.com"}]
```

### example

Called by ajax
```javascript

  $.ajax({
        type: "POST",
        url: "external/Customer_get_movieInfo.php",
        data: { "movie_id":"9"},
        success: function (data) {
            console.log(data); // "Logout Sucess"
        },
        error: function () {
            console.log("error");
        }
    })
    ```

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