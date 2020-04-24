File name: main-page-picture-initial.js
File path: js/main/main-page-picture-initial.js
////1. This file is used to get image about carousel and also what's new section
////2. To get image for carousel section
        1. url: movie_api/SelectFiveNewMovie.php
        2. type: post
        3. dataType: json
        4. expect data format: 
                [
                    {
                        "movie_id": id
                        "movie_name": name,
                        "url": image name
                    },
                    {
                        "movie_id": id 
                        "movie_name": name,
                        "url": image name
                    }
                ]

         return data:
         [{"movie_id":"33","name":"cvbg","url":"aqwed.jpg\r\n"},
             {"movie_id":"32","name":"dfgbv","url":"shjdfm.jpg"},
         {"movie_id":"31","name":"moviesssd","url":"jsaksg.jpg"},
        {"movie_id":"30","name":"cvbfd","url":"haisjkdfg.jpg\r\n"},
        {"movie_id":"29","name":"avs","url":"ahsudfkg.jpg"}]

    ////5. It is expected to receive 4 movie info
           url: movie_api/SelectTopFourMovie.php
           [{"movie_id":"29","name":"avs","url":"ygfds.jpg"},
           {"movie_id":"31","name":"moviesssd","url":"drtghfdsd.jpg"},
           {"movie_id":"30","name":"cvbfd","url":"eeee.jpg"},
        {"movie_id":"33","name":"cvbg","url":"qqqqww.jpg"}]

 ////3.To get image for what's new section(which image type???Search Image)
        1. url: movie_api/NewMovie_Search.php
        2. type: get
        3. dataType: json
        4. expect data format:
            [
                    {
                        "movie_id": id,
                        "movie_name": name,
                        "url": image name
                    },
                        "movie_id": id,
                        "movie_name": name,
                        "url": image name
                    }
                ]

            return data:

            [{"movie_id":"33","name":"cvbg","url":"asdfghj.jpg"},{"movie_id":"32","name":"dfgbv","url":null},{"movie_id":"31","name":"moviesssd","url":null},{"movie_id":"30","name":"cvbfd","url":null},{"movie_id":"29","name":"avs","url":null}]

        5. It is expected to receive 4 to 5 images


////File name: add-food.js
////File path: js/common/add-food.js
    1. This file is used to send the food plan user choose back to backend
    2. Details
        1. type: post
        2. url: shopping_api/addFood.php
        3. sendData format:
            [
                {
                    "username": username,
                    "food_id": 1
                    "quantity": 1    //will be 1 always, user only allow to change quantity in cart
                }
            ]

             send data: var data=[{ "username":"sdf","food_id":"1","quantity":"1"}];
        4. nothing will be returned. 
        return data:"Success" or "Fail"


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


////File name: movie-page-initial-change.js
////File path: js/movie/movie-page-initial-change.js
    1. This file is used to get information for loading the movie page
    2. to get information
        1. type: post
        2. url: movie_api/MoviePage_Initial.php
        3. data: sendData (json)
            [
                {"movie_id": movie_id},
                {"movie_name": movie_name}
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
                    "img_url": "spiderMan-small.jpg" //should be a middle size image
                    "stage_image": [
                        "spiderMan-small.jpg",
                        "spiderMan-small.jpg",
                        "piderMan-small.jpg",
                        "spiderMan-small.jpg",
                        "spiderMan-small.jpg"
                    ]
                }
            ]

            return data:
            [
            {
                "movie_id":"9",
                "name":"foo",
                "type_name":"sci",
                "release_date":"2020-03-04",
                "off_date":"2020-05-15",
                "director":"Trump",
                "info":"asasas",(may be deleted )
                "duration":"120",
                "rating":"10",
                "img_url":"zzzzxx.jpg",
                "stage_image":[
                {"image_name":"qqqqq.jpg"},
                {"image_name":"qwerf.jpg"},
                {"image_name":"zzz.jpg"}
                ]
                }
                ]


////File name: movie.js(updated)
////File path: js/movie/movie.js
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


////File name: user-buy-ticket.js
////File path: js/movie/user-buy-ticket.js
    1. This file is used to allow user buy a ticket and send back to server; Also when date select, return back available time.
    2. send info after click buy ticket
    ////1. sendData (json)(user_name or user_id???)
        [{
            'date': date,
            'movie_id': movie_id,
            'movie_name': movie_name,
            'adult_ticket_number': adult_ticket,
            'senior_ticket_number': senior_ticket,
            'child_ticket_number': child_ticket,
            "time": {
                "session_id": 1,
                "movie_time_flag": 00000000000011111100000000
            }
        }];

        var data=[{
            'username':"2wsdf",
            'date':"2020-01-01",
            'movie_id': "9",
            'movie_name': "movie_name",
            'adult_ticket_number': "1",
            'senior_ticket_number': "1",
            'child_ticket_number': "2",
            "time": {
                "session_id": "23",
                "movie_time_flag": "00000000000011111100000000"
            }
        }];

        2. type: post
        3. url: shopping_api/addTicket.php
        4. no need to return back data :0: No available seats;  1:add 
////3. to get available time for that movie once time is selected
        1. sendData (json)
            [{
                "movie_id": movie_id,
                "date": date
            }]
        2. type: post
        3. url: room_session_api/findSessionForMovie.php
        4. expected returned data format (json)
            [
            {"session_id":"23","time_flag":"000100000000000000000000000000000000000000000000"}
            ]




////File Name: checkout.js(updated)
////File path: js/shopping/checkout.js
    1. This file is add goods and tickets in order 
    2. type: post
    3. url: external/shopping_api/addOrder.php
    4. sendData
        {
            "movie":
                [
                    "movie_id": movie_id,
                    "session_id":"23",
                    "name": movie_name,
                    "movie_date": movie_date,
                    "movie_time_flag": movie_time_flag,
                    "senior_num": senior_num,
                    "adult_num": adult_num,
                    "child_num": child_num
                ],
            "goods":
                [
                    {"goods_id": goods_id,
                    "goods_name": goods_name,
                    "quantity": quantity},
                    {"goods_id": goods_id,
                    "goods_name": goods_name,
                    "quantity": quantity}
                    
                ],
            "total_cost":
                [
                    "total_cost": total_cost
                ]
        }

        sendData:

        var data=[{
            "movie":
                [{
                    "movie_id": "9",
                    "session_id":"23",
                    "name": "foo",
                    "movie_date": "2020-01-01",
                    "movie_time_flag": "0000001000",
                    "senior_num": "2",
                    "adult_num": "1",
                    "child_num": "2"
                }],
            "goods":
                [
                    {"goods_id": "1",
                    "goods_name": "aaa",
                    "quantity": "1"},

                    {"goods_id": "2",
                    "goods_name": "bbb",
                    "quantity": "2"}
                    
                ],
            "total_cost":
                [
                {
                    "total_cost": "85"
                }
                ]
        }];

////File Name: shopping-initials
///File Path: js/shopping/shopping-initails.js
    1. This file is used to load user's choice
    2. sendData: 
        [
            {
                "username": username
            }
        ]
    3. url: shopping_api/shoppingInitial.php
    4. return data should be in this format
        data = {
                "movie": [{

                        "url": "img/spiderMan-small.jpg",
                        "movie_id": 1,
                        "session_id":"23",
                        "name": "spider man",
                        "movie_date": "2020-03-13",
                        "movie_time": "00000000000000100000000000000000000000000000000",
                        "senior_price": 18,
                        "adult_price": 12,
                        "child_price": 7,
                        "senior_ticket_num": 4,
                        "adult_ticket_num": 4,
                        "child_ticket_num": 4
                }],
                "goods": [{
                        "goods_name": "Popcorn & Drink",
                        "url": "img/warCraft-small.jpg",
                        "price": 20,
                        "quantity": 3
                }]
    }

    return data:{"movie":
    [{"url":"qqqqq.jpg","movie_id":"9","session_id":"23","name":"foo","movie_date":"2020-01-01","movie_time":"000100000000000000000000000000000000000000000000","senior_price":"10.00","adult_price":"30.00","child_price":"2.00","senior_ticket_num":"2","adult_ticket_num":"2","child_ticket_num":"1"}],
    "goods":
    [{"goods_name":"sss","url":"0","price":"13.00","quantity":"1"},{"goods_name":"sss","url":"0","price":"13.00","quantity":"1"},{"goods_name":"sss","url":"0","price":"13.00","quantity":"1"}]}




////File Name: search-initial.js
File Path: js/search/search-initial.js
//// 1. This file is used to initialize the search page
        1. To get movie type array
            1. type: POST
            2. url: movie_api/listMovieCategory.php
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
            return data:
            [{"type_name":"category"},{"type_name":"qwsx"},{"type_name":"Sci"}]
//// 2. To get all movie list had in DB for initilizing page (all will be by default)
            1. type: POST
            2. sendData: 
            [
                {
                    "type": "all"
                }
            ]
        2. url: movie_api/listMovieAndImage.php
            3. expected return data
                [
                    {
                        "movie_name": movie-name,
                        "url": image-name
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

                return data:
                
                [{"movie_id":"9","name":"foo","url":"ygfds.jpg"},{"movie_id":"11","name":"fad","url":null},{"movie_id":"12","name":"movie_name","url":null},{"movie_id":"13","name":"movie_name","url":null},{"movie_id":"14","name":"movie_name","url":null},{"movie_id":"15","name":"movie_name","url":null},{"movie_id":"16","name":"movie_name","url":null},{"movie_id":"17","name":"movie_name","url":null},{"movie_id":"18","name":"movie_name","url":null},{"movie_id":"19","name":"movie_name","url":null},{"movie_id":"20","name":"movie_name","url":null},{"movie_id":"21","name":"movie_name","url":null},{"movie_id":"22","name":"movie_name","url":null},{"movie_id":"23","name":"movie_name","url":null},{"movie_id":"24","name":"movie_name","url":null},{"movie_id":"25","name":"movie_name","url":null},{"movie_id":"26","name":"movie_name","url":null},{"movie_id":"27","name":"movie_name","url":null},{"movie_id":"28","name":"movie_name","url":null},{"movie_id":"29","name":"avs","url":null},{"movie_id":"30","name":"cvbfd","url":null},{"movie_id":"31","name":"moviesssd","url":null},{"movie_id":"32","name":"dfgbv","url":null},{"movie_id":"33","name":"cvbg","url":null}]


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
            
    3. section 2 is to get searched movie backa
        1. sendData:
            {
                "key": key  // key is movie name
            }
        2. type: POST
        3. url: movie_api/SearchMoviesByName.php
        4. expected return type in json
            here should notice, if not found a record, please send back a empty json array []
            else 
            [
               {
                   "movie_name": movie,
                   "url": url;
               } 
            ]


            return data:
            [{"movie_id":"9","name":"foo","url":"ygfds.jpg"}]


////File Name: search-by-category
////File Path: js/search/search-by-category
    1. This file is used to get same type movie list
    2. sendData
        {
            "type": category // category is string, like Scientiic
        }
    3. url: movie_api/SearchMovieByCategory.php
    4. type: POST
    5. expected return data in json
        [
            {
                "movie_id": id,
                "movie_name": "spider",
                "url": "doctorStrange-small.jpg"
            },
            {
                "movie_id": id,
                "movie_name": "spider",
                "url": "spiderMan-small.jpg"
            },
            {
                "movie_id": id,
                "movie_name": "spider",
                "url": "spiderMan-small.jpg"
            },
            {
                "movie_id": id,
                "movie_name": "spider",
                "url": "spiderMan-small.jpg"
            },
            {
                "movie_id": id,
                "movie_name": "spider",
                "url": "spiderMan-small.jpg"
            },
        ]
        url should be the full image url

        return data:
        [{"movie_id":"9","name":"foo","url":"ygfds.jpg"},{"movie_id":"12","name":"movie_name","url":null}]


////File Name: request-food-info.js(updated)
////File Path: js/common/request-food-info.js
    1. To get goods info
    2. sendData: none
    3. type: post
    4. url: goods_api/foodInfo.php
    5: expected received data
        data: 
        [
            {
                "goods_name": ....,
                "goods_id": ....,
                "goods_price": ....,
                "url": image name
            },
            {
                "goods_name": ....,
                "goods_id": ....,
                "goods_price": ....,
                "url": image name
            },
            {
                "goods_name": ....,
                "goods_id": ....,
                "goods_price": ....,
                "url": image name
            }
        ]

        return data:

        [{"goods_name":"sss","goods_id":"3","goods_price":"13.00","url":null},{"goods_name":"sss","goods_id":"3","goods_price":"13.00","url":null},{"goods_name":"sss","goods_id":"3","goods_price":"13.00","url":null}]