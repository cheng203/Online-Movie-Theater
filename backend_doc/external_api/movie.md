# Movie API

src path: ```external/movie_api/*```


## Movie Attributes Constraint
```sql
`movie_id` int unsigned auto_increment,
`name` varchar(256) not null,
`type_name` varchar(64) not null,
`release_date` date not null,
`off_date` date not null,
`director` varchar(64) not null,
`info` varchar(512) not null,
`duration` smallint unsigned not null,
`rating` tinyint unsigned,
```

## 1. listMovies.php
src path: ```external/movie_api/listMovies.php```

Fetch all movies.

### Require and Response
- Require: none
- Response: 
  - json string 
  ```[{"movie_id":"1","name":"foo","type_name":"Sci","release_date":"2020-03-04","off_date":"2020-05-15","director":"Trump","info":"asasas","duration":"120","rating":"10"},
  {"movie_id":"2","name":"foo2","type_name":"Sci","release_date":"2020-01-04","off_date":"2020-01-15","director":"Trump","info":"asa\u554asas","duration":"240","rating":"10"}]
  ```
  - If no movie: "No Movie"

### example

Called by ajax
```javascript
    $.ajax({
        type: "POST",
        url: "external/movie_api/listMovies.php",
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```


## 2. addMoive.php
src path: ```external/movie_api/addMovie.php```

Add a movie.
### Require and Response
- Require: name,type_name,release_date,off_date,director,info,duration,rating
- Response: "Movie Added Success" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/movie_api/addMovie.php",
        data: { "name":'foo', "type_name": "Sci", "release_date": "2020/03/04", "off_date": "2020/05/15", "director": "Trump", "info": "asasas", "duration": "120", "rating": "10"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```

## 3. deleteMovie.php
src path: ```external/movie_api/deleteMovie.php```

Delete the info of a movie by movie id.
### Require and Response
- Require: movie_id
- Response: "Movie deleted Successfully" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/movie_api/deleteMovie.php",
        data: { "movie_id":"7"},
        success: function (data) {
            console.log(data); 
        },
        error: function () {
            console.log("error");
        }
    })
```
## 4. modifyMovie.php

src path: ```external/movie_api/modifyMovie.php```

Modify the info of a movie by ID.
### Require and Response
- Require: movie_id,name,type_name,release_date,off_date,director,info,duration,rating
- Response: "Movie Modified Successfully" or "Error"

### example

Called by ajax
```javascript
$.ajax({
        type: "POST",
        url: "external/movie_api/modifyMovie.php",
        data: { "movie_id":"9","name":'fooa', "type_name": "Sci", "release_date": "2020/03/04", "off_date": "2020/05/15", "director": "Trump", "info": "asasas", "duration": "120", "rating": "10"},
        success: function (data) {
            console.log(data); // "Logout Sucess"
        },
        error: function () {
            console.log("error");
        }
    })

```

## 5. findMovie.php

src path: ```external/movie_api/findMovieByID.php``

Get the info of a movie by movie ID.
### Require and Response
- Require: movie_id
- Response: json string
-```[{"movie_id":"9","name":"fooa","type_name":"Sci","release_date":"2020-03-04","off_date":"2020-05-15","director":"Trump","info":"asasas","duration":"120","rating":"10"}]```

### example

Called by ajax
```javascript
  $.ajax({
        type: "POST",
        url: "external/movie_api/findMovie.php",
        data: { "movie_id":"9"},
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("error");
        }
    })
```

## 6. getMoviePrice.php

src path: ```external/movie_api/getMoviePrice.php``

Get tickets price of movie by movie ID
### Require and Response
- Require: movie_id
- Response: json string
-```[{"movie_id":"1","name":"foo","ticket_name":"adult","price":"30.00"},{"movie_id":"1","name":"foo","ticket_name":"children","price":"20.00"},{"movie_id":"1","name":"foo","ticket_name":"senior","price":"28.00"}]```

### example

Called by ajax
```javascript
    $.ajax({
        type: "POST",
        url: "external/movie_api/getMoviePrice.php",
        dataType: "text",
        data: {"movie_id": 1},
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("error");
        }
    })
```

## 7. setMoviePrices.php

src path: ```external/movie_api/setMoviePrices.php``

Get tickets price of movie by movie ID
### Require and Response
- Require: movie_id, adult_price, senior_price, children_price
- Response: 
  - success: ```"success"```
  - failaure: ```"error"```

### example

Called by ajax
```javascript
    $.ajax({
        type: "POST",
        url: "external/movie_api/setMoviePrices.php",
        dataType: "text",
        data: {"movie_id": 1, "adult_price": 60, "senior_price": 35, "children_price": 20},
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("error");
        }
    })
```

## 8. getMovieImages.php

src path: ```external/movie_api/getMovieImages.php``

Get image list of movie by movie ID
### Require and Response
- Require: movie_id
- Response: 
  - success: 
    - No Images: ```No Images```
    - Images got: 
```
[{"movie_id":"4","name":"Foo1","image_type_name":"carousel","image_id":"2","image_name":"1587244121-1-2018-06-12.png"},
{"movie_id":"4","name":"Foo1","image_type_name":"cart","image_id":"7","image_name":"1587246179-6-2018-10-10 (1).png"},
{"movie_id":"4","name":"Foo1","image_type_name":"movie","image_id":"8","image_name":"1587246179-7-2018-10-10.png"},
{"movie_id":"4","name":"Foo1","image_type_name":"search","image_id":"3","image_name":"1587244121-2-2018-09-06 (1).png"},
{"movie_id":"4","name":"Foo1","image_type_name":"stage","image_id":"2","image_name":"1587244121-1-2018-06-12.png"},
{"movie_id":"4","name":"Foo1","image_type_name":"stage","image_id":"4","image_name":"1587244287-3-2018-05-28 (1).png"},
{"movie_id":"4","name":"Foo1","image_type_name":"stage","image_id":"9","image_name":"1587246179-8-2020-01-15 (1).png"}]
```
  - failaure: ```"error"```

In response, ```image_name``` can be directly used by html to fetch the image path. Format is:
```
/uploads/%image_name%
```
In index.html, image path is
```
./uploads/%image_name%
```


### example

Called by ajax
```javascript
    $.ajax({
        type: "POST",
        url: "external/movie_api/getMovieImages.php",
        dataType: "text",
        data: {"movie_id": 4},
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("error");
        }
    })
```