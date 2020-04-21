File name: page-picture-initial.js
File path: js/main/page-picture-initial.js
    1. This file is used to get image about carousel and also what's new section
    2. To get image for carousel section
        1. url: need to fill ????
        2. type: get
        3. dataType: json
        4. expect data format: 
                [
                    {
                        "movie_name": name,
                        "url": img/img_name
                    },

                        "movie_name": name,
                        "url": img/img_name
                    }
                ]
        5. It is expected to receive 4 movie info
    3.To get image for what's new section
        1. url: need to fill ?????
        2. type: get
        3. dataType: json
        4. expect data format:
            [
                    {
                        "movie_name": name,
                        "url": img/img_name
                    },

                        "movie_name": name,
                        "url": img/img_name
                    }
                ]
        5. It is expected to receive 4 to 5 images


File name: add-food.js
File path: js/common/add-food.js
    1. This file is used to send the food plan user choose back to backend
    2. Details
        1. type: post
        2. url: ??????Cart
        3. sendData format:
            [
                {
                    "username": username,
                    "food": food_plan   //food_plan will be in a (popcore), b (drink), c (popcore & drink)
                }
            ]
        4. nothing will be returned.


////File name: admin_edit.js
////File path: js/common/admin_edit.js
    1. This file will collect front information and send back to end
    2. To send sendData back
        1. url: movie_api/Admin_add_session_byGroup.php
        2. type: post
        3. sendData will be in this format (json)
            [
                { "movie-name": movie_name },
                { "release-date": release_date },
                { "duration": duration },
                { "off-date": off_date },
                { "category": category },
                { "director": director },
                { "rate": rate },
                { "room": room_id },
                { "time": time_flag }
            ]

      e.g. [
            { "movie_name": "movie_name" },
            { "release_date": "2020-01-01" },
            { "duration": "2" },
            { "off_date": "2020-01-02" },
            { "category": "category" },
            { "director": "director" },
            { "rate": "12" },
            { "room": "1" },
            {"info":"info"},
            { "time": [
            {"movie_time_flag":"000010000000000000000000000000000000000000000000","group":1},
            ...........
            //Yibo edit: movie_time_flag should be the time movie takes, something like this
            000011111111000000000000000000000000000000000000000 so that you can just add it to the corresponding group.
            ............
            {"movie_time_flag":"000010000000000000000000000000000000000000000000","group":2}
            ]
          }]
            //each image keys' value will be an array of image id
            //time in this format: xx:xx am/pm
    //// 4. No need to send information back:return movie_id or not??
            ............
            please return movie name
            [
                {"movie_name": name};
            ]
            ............

///File name: select-room.js(updated)
File path: js/common/select-room.js
    1. This file is used to first get room information and then base on room selected, get time information then.
    2. to get room information
    ////1. url: external/movie_api/Listrooms.php
        2. type: post
        3. expected return data in json
            [
                {"room", 1},
                {"room", 2},
                {"room", 3}
            ]
       //// return data
           [
           {"room_id":1,"room_name":"aaa","capacity":"120"},
           {"room_id":2,"room_name":"bbb","capacity":"50"}
           ]
       ////
           
    3. to get time information
     ////  1. sendData format (json)// "sendData"
            [
                {"room_id": 1},
                {"start_date": "2020-01-01"},
                {"end_date":"2020-01-02"}

            ]
     ////   2. url: external/room_session_api/Find_room_by_start_end_date.php 
            3. type: post
     ////   4. expected return data type (json)
            [
                {
                    "date":"2020-01-01",
                    "time_flag":"000110000000000000000000000000000000000000000001",
                    "group":1
                },
                {
                    "date":"2020-01-02",
                    "time_flag":"110010000000000000000000000000000000000000000010",
                    "group":2
                }
            ]


File name: movie-page-initial-change.js
File path: js/movie/movie-page-initial-change.js
    1. This file is used to get information for loading the movie page
    2. to get information
        1. type: post
        2. url: need to fill ?????
        3. data: sendData (json)
            [
                {"movie": movie}
            ]
        4. expected return data format (json)
            [
                {   
                    "movie_id": id
                    "movie_name": "spiderman",
                    "release_date": "2019-02-23",
                    "duration": 110,
                    "off_date": "2020-01-01",
                    "category": "Action",
                    "director": "xizi",
                    "rate": 50,
                    "img_url": "img/spiderMan-small.jpg" //should be a middle size image
                },
                {       
                    "path": [
                        "../img/spiderMan-small.jpg",
                        "../img/spiderMan-small.jpg",
                        "../img/spiderMan-small.jpg",
                        "../img/spiderMan-small.jpg",
                        "../img/spiderMan-small.jpg"
                    ]
                }
            ]


File name: movie.js(updated)
File path: js/movie/movie.js
    1. This file is used to edit or delete an existing movie
    2. To edit a movie
    ////    1. sendData (json)
            [{
                "movie_id":movie_id
                "name": name,
                "release_date": release,
                "duration": duration,
                "off_date": off_date,
                "type_name": category,
                "director": director,
                "rating": rate
                ..............
                delete info attribute
                ...............
            }]
           2. type: post
    ////   3. url: external/movie_api/ modifyMovie.php
           4. no need to send back data
    3. To delete a movie
        1. sendData (json)
            [{
                    "movie_id": movie_id;
            }]
        2. type = post
   //// 3. url = external/movie_api/ deleteMovie.php
        4. no need to return data


File name: user-buy-ticket.js
File path: js/movie/user-buy-ticket.js
    1. This file is used to allow user buy a ticket and send back to server; Also when date select, return back available time.
    2. send info after click buy ticket
        1. sendData (json)
        [{
            'date': date,
            'movie': movie,
            'adult_ticket_number': adult_ticket,
            'senior_ticket_number': senior_ticket,
            'child_ticket_number': child_ticket
        }];
        2. type: post
        3. url: need to fill ???????
        4. no need to return back data
    3. to get available time for that movie once time is selected
        1. sendData (json)
            [{
                "movie_name": movie,
                "date": date
            }]
        2. type: post
        3. url: need to fill ?????
        4. expected returned data format (json)
            [
                {"time": 12:30pm},
                {"time": 4:30pm},
                {"time": 4:30pm}
            ]


////File name: 
////File path: 
    1. This file is add or update info of goods and tickets in the shopping cart 
    2. type: post
    3. url: external/shopping_api/AddCart.php
    4. sendData

        [
            
        {
            "session_id":"23",
            "senior_price": "5",
            "adult_price": "20",
            "child_price":"2",
            "senior_ticket_num": "2",
            "adult_ticket_num": "2",
            "child_ticket_num": "1"
        },
        {
            "session_id":"23",
            "senior_price": "5",
            "adult_price": "6",
            "child_price":"4",
            "adult_ticket_num": "4".
            "senior_ticket_num": "1",
            "child_ticket_num": "1"
        }
        
        ]

////File Name: checkout.js(updated)
////File path: js/shopping/checkout.js
    1. This file is add goods and tickets in order 
    2. type: post
    3. url: external/shopping_api/add_order.php
    4. sendData
        [
            
        {
            "session_id":"23",
            "senior_price": "5",
            "adult_price": "20",
            "child_price":"2",
            "senior_ticket_num": "2",
            "adult_ticket_num": "2",
            "child_ticket_num": "1"
        },
        {
            "session_id":"23",
            "senior_price": "5",
            "adult_price": "6",
            "child_price":"4",
            "adult_ticket_num": "4".
            "senior_ticket_num": "1",
            "child_ticket_num": "1"

            ........................
        }
        
        ]

File Name: shopping-initials
File Path: js/shopping/shopping-initails.js
    1. This file is used to load 




File Name: search-initial.js
File Path: js/search/search-initial.js
    1. This file is used to initialize the search page
        1. To get movie type array
            1. type: POST
            2. url: "........"
            3. expected return data
                [
                    {  
                    "type": Scientific
                    },
                    {  
                    "type": Magical
                    },
                    {  
                    "type": ....
                    }
                ]
    2. To get all movie list had in DB for initilizing page (all will be by default)
            1. type: POST
        2. url: listMovies.php
            3. expected return data
                [
                    {
                        "movie_name": ...,
                        "url": .....
                    },
                    {
                        "movie_name": ...,
                        "url": .....
                    },
                    {
                        "movie_name": ...,
                        "url": .....
                    }
                ]


////File Name: seach-by-name
////File Path: js/search/search-by-name.js
    1. This file is used for user to type movie name and search
    2. section 1 is to get real-time result back while user type
        1. sendData:
            [{
                "start_string":"abd"

            }]
        2. type: POST
        3. url: external/movie_api/searchMoviebyStartString.php
        4. expected return type in json
            [{"name":"foo"}]
            
    3. section 2 is to get searched movie back
        1. sendData:
            {
                "key": key  // key is movie name
            }
        2. type: POST
        3. url: "......"
        4. expected return type in json
            here should notice, if not found a record, please send back a empty json array []
            else 
            [
               {
                   "movie_name": movie,
                   "url": url;
               } 
            ]


File Name: search-by-category
File Path: js/search/search-by-category
    1. This file is used to get same type movie list
    2. sendData
        {
            "type": category // category is string, like Scientiic
        }
    3. url: "................"
    4. type: POST
    5. expected return data in json
        [
            {
                "movie-name": "spider",
                "url": "img/doctorStrange-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
        ]
        url should be the full image url