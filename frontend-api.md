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
        2. url: ??????
        3. sendData format:
            [
                {
                    "username": username,
                    "food": food_plan   //food_plan will be in a (popcore), b (drink), c (popcore & drink)
                }
            ]
        4. nothing will be returned.


File name: admin_edit.js
File path: js/common/admin_edit.js
    1. This file will collect front information and send back to end
    2. To send sendData back
        1. url: need to fill ???????
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
                { "front-image": front_image },
                { "info-image": info_image },
                { "stage-image": stage_image },
                { "shop-image": shop_image },
                { "room": room },
                { "time": time }
            ]
            //each image keys' value will be an array of image id
            //time in this format: xx:xx am/pm
        4. No need to send information back


File name: select-room.js
File path: js/common/select-room.js
    1. This file is used to first get room information and then base on room selected, get time information then.
    2. to get room information
        1. url: need to fill ????
        2. type: post
        3. expected return data in json
            [
                {"room", 1},
                {"room", 2},
                {"room", 3}
            ]
    3. to get time information
        1. sendData format (json)
            [
                "room": 1
            ]
        2. url: need to fill ?????
        3. type: post
        4. expected return data type (json)
            [
                {
                    "time": 08:40am
                },
                {
                    "time": 12:40pm
                },
                {
                    "time": 01:40pm
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


File name: movie.js
File path: js/movie/movie.js
    1. This file is used to edit or delete an existing movie
    2. To edit a movie
        1. sendData (json)
            [{
                "movie-name": movie_name,
                "release": release,
                "duration": duration,
                "off-date": off_date,
                "category": category,
                "director": director,
                "rate": rate
            }]
        2. type: post
        3. url: need to fill ??????
        4. no need to send back data
    3. To delete a movie
        1. sendData (json)
            [{
                    "movie_name": movie_name;
            }]
        2. type = post
        3. url = need to fill ??????
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


File name: shopping-initial.js
File path: js/shopping/shopping-initial.js
    1. This file is used to get movie added to cart by user and display
    2. type: post
    3. url: need to fill ???????
    4. expected data send back format (json)
        special note here: as we have food section and it is very complicated to add food logic into shopping cart right now. Please send back food information as following style as well. Here is a reference: movie_name --> food, ticket_time --> "", senior_price --> meal plan A's price, adult_price --> meal plan B's price, child_price --> meal plan C's price, senior_ticket_num --> meal plan A's count, adult_ticket_num --> meal plan B's count, child_ticket_num --> meal plan C's count

        [
            {
                "movie_name": ...,
                "url": ....,
                "ticket_time": .... //date not including time
                "senior_price": ......
                "adult_price": ......
                "child_price": .....
                "senior_ticket_num": ....
                "adult_ticket_num": .....
                "child_ticket_num": ....
            },
            {
                "movie_name": ...,
                "url": ....,
                "ticket_time": .... //date not including time
                "senior_price": ......
                "adult_price": ......
                "child_price": .....
                "senior_ticket_num": ....
                "adult_ticket_num": .....
                "child_ticket_num": ....
            },
            {
                "movie_name": ...,
                "url": ....,
                "ticket_time": .... //date not including time
                "senior_price": ......
                "adult_price": ......
                "child_price": .....
                "senior_ticket_num": ....
                "adult_ticket_num": .....
                "child_ticket_num": ....
            }
        ]


File Name: checkout.js
File path: js/shopping/checkout.js
    1. This file is used to checkout and send back modified data
    2. sendData (json)
        [
            {
                "movie-name": movie_name,
                "movie-date": movie_date,
                "movie_senior_count": movie_senior_count,
                "movie-adult-count": movie_adult_count,
                "movie-child-count": movie_child_count
            },
            {
                "movie-name": movie_name,
                "movie-date": movie_date,
                "movie_senior_count": movie_senior_count,
                "movie-adult-count": movie_adult_count,
                "movie-child-count": movie_child_count
            },
            {
                "total-order-cost": total_cost
            }
        ]
    3. type: post
    4. url: need to fill ?????
    5: expect to get data back indicate if added movie ticket exceed available seats


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
            2. url: "........"
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


File Name: seach-by-name
File Path: js/search/search-by-name.js
    1. This file is used for user to type movie name and search
    2. section 1 is to get real-time result back while user type
        1. sendData:
            {
                "key": key  // here key means few word, like doc, db should return docter strange 用正则表达式来判断
            }
        2. type: POST
        3. url: "......."
        4. expected return type in json
            [
                {
                    "movie_name": name
                },
                {
                    "movie_name": name
                },
                {
                    "movie_name": name
                }
            ]
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