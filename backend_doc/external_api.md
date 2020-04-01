# External API
src path: ```external/*```

Called by http request(eg. jQeury)

## register.php

To register a user. 
### Require and Response
- Requirire: person_type, username, password_hash and email
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
            console.log(data);
        },
        error: function () {
            console.log("error");
        }
    })
```


