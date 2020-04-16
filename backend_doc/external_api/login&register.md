# API about login&register

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
