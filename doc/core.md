# Internal/Core Class/Function
src path: ```./core/* ```

## 1. class MysqlConnector
src path: ```./core/MysqlConnector.php```

### Constructor:

```cpp
__construct(string $servername, string $username, string $password, string $dbname)
```

### Constructor Parameters: 

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
- Empty string: If query is invalid.
- JSON string: If query is valid. 

### Example

```php
include_once('./core/MysqlConnector.php');
$conn = new MysqlConnector("localhost", "root", "root", "HW3");
$result = $conn->query("select * from babynames where year=2010");
while($r = mysqli_fetch_assoc($result)){
    $arr[] = $r; 
}
echo json_encode($arr);
```

```php
include_once('./core/MysqlConnector.php');
$conn = new MysqlConnector("localhost", "root", "root", "HW3");
$result = $conn->query_json("select * from babynames where year=2010");
echo $result;
```