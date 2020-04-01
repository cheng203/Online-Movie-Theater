# Internal/Core Class/Function
src path: ```core/* ```

## 1. class MysqlConnector
src path: ```core/MysqlConnector.php```

### Constructor

```cpp
__construct(string $servername, string $username, string $password, string $dbname)
```

#### Constructor Parameters

- ```$servername```: name of mysql server. Default port is 3306
- ```$username```: Username of user on mysql server
- ```$password```: Password of the user
- ```$dbname```: dababase name to be connected

### Member Functions
**1. ```query(string $sql)```**
   
Parameters: 
- ```$sql```: sql query or update language

Return Value:
- ```false```: If ```$sql``` is invalid.
- ```mysqli_result object```: For successful SELECT, SHOW, DESCRIBE or EXPLAIN queries.
- ```true```: Other successful queries.

**2. ```query_json(string $sql)```**

Parameters: 
- ```$sql```: sql query or update language

Return Value:
- ```false```: If query is invalid.
- Empty string: If query returns no data.
- JSON string: If query returns one or more than one row. 

#### Example
Called in php: 
```php
include_once('core/MysqlConnector.php');
$conn = new MysqlConnector("localhost", "root", "root", "test");
$result = $conn->query("select * from babynames where year=2010");
while($r = mysqli_fetch_assoc($result)){
    $arr[] = $r; 
}
echo json_encode($arr);
```

```php
include_once('core/MysqlConnector.php');
$conn = new MysqlConnector("localhost", "root", "root", "test");
$result = $conn->query_json("select * from babynames where year=2010");
echo $result;
```


## 2. class UserSql
### Member Function

**1. ```findUser(string $username)```**
Parameters: 
- ```$username```: username

Return Value:
- ```false```: Query error
- Empty string: If username don't exist
- JSON string: If username exists
  - For example: [{"person_id":"233","username":"user1","email":"aaa@aaa.com"}] 

#### Example
Called by php
```php
include_once('/core/UserSql.php');
echo $register->findUser("user1");
// result if exists
// [{"person_id":"233","username":"user1","email":"aaa@aaa.com"}]
```



**2. ```findEmail(string $email)```**
Parameters: 
- ```$email```: email

Return Value:
- ```false```: Query error
- Empty string: If email don't exist
- JSON string: If email exists
  - For example: [{"person_id":"233","username":"user1","email":"aaa@aaa.com"}] 

#### Example
Called by php
```php
include_once('/core/UserSql.php');
echo $register->findEmail("aaa@aaa.com");
// result if exists
// [{"person_id":"233","username":"user1","email":"aaa@aaa.com"}]
```





<!-- ## 2. class UserSql
### Constructor:

#### Constructor Parameters

- ```$arg1```: ...
- ```$arg2```: ...
### Member Function

**1. ```query(string $sql)```**
Parameters: 
- ```$sql```: sql query or update language

Return Value:
- Empty string: If query is invalid.
- JSON string: If query is valid. 

### Example -->