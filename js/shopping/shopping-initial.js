$(document).ready(function () {

    $(".checkout-btn").click(checkOut);


    var username = localStorage.getItem("username");
    if (username == null || username == "") {
        var header = $(".display-4").find("span").html("please sign in first.");
    } else {
        var header = $(".display-4").find("span").html(username);
        var sendData = [{
            "username": username
        }]
        $.ajax({
            type: "post",
            url: "external/shopping_api/shoppingInitial.php",
            data: {
                "sendData": JSON.stringify(sendData)
            },

            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                data = data[0];
                $(".product_info").empty();
                // path for small size picture
                path = "thumb/thumb-";
                //get information of movie
                var movie_img_url = path + data.movie[0].url;
                var movie_id = data.movie[0].movie_id;
                var movie_name = data.movie[0].name;
                var movie_date = data.movie[0].movie_date;
                var movie_time = data.movie[0].movie_time; //just date
                var senior_price = data.movie[0].senior_price;
                var adult_price = data.movie[0].adult_price;
                var child_price = data.movie[0].child_price;
                var senior_num = data.movie[0].senior_ticket_num;
                var adult_num = data.movie[0].adult_ticket_num;
                var child_num = data.movie[0].child_ticket_num;
                localStorage.setItem("session_id", data.movie[0].session_id);

                //add movie to the body
                $(".product_info").append(
                    '<tr value="movie" class="movie">' +
                    '<th scope="row" class="border-0">' +
                    '<div class="p-2">' +
                    '<img src="./uploads/' + movie_img_url + '" alt="" width="70" class="img-fluid rounded shadow-sm">' +
                    '<div class="ml-3 d-inline-block align-middle">' +
                    '<h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle movie-name" value = "' + movie_id + '">' + movie_name + '</a></h5><span class="text-muted font-weight-normal font-italic d-block">Time: <span class="movie-time" value="' + movie_date + '" alt ="' + movie_time + '">' + movie_date + ' ' + convertMovieTime(movie_time) + '</span></span>' +
                    '</div>' +
                    '</div>' +
                    '</th>' +
                    '<!-- display price -->' +
                    '<td class="border-0 align-middle unit-price">' +
                    '<ul class="price-display movie-price-display">' +
                    '<li class="senior-price">Senior: $<strong>' + senior_price + '</strong></li>' +
                    '<li class="adult-price">Adult: $<strong>' + adult_price + '</strong></li>' +
                    '<li class="child-price">Child: $<strong>' + child_price + '</strong></li>' +
                    '</ul>' +
                    '</td>' +
                    '<!-- display add/decrease button -->' +
                    '<td class="border-0 align-middle">' +
                    '<ul class="quantity-display movie-quantity-display">' +
                    '<li>' +
                    '<div class="p-num">' +
                    '<div class="quantity-form">' +
                    '<a href="javascript:;" class="decrement">-</a>' +
                    '<input type="text" class="itxt senior-count" value="' + senior_num + '">' +
                    '<a href="javascript:;" class="increment">+</a>' +
                    '</div>' +
                    '</div>' +
                    '</li>' +
                    '<li>' +
                    '<div class="p-num">' +
                    '<div class="quantity-form">' +
                    '<a href="javascript:;" class="decrement">-</a>' +
                    '<input type="text" class="itxt adult-count" value="' + adult_num + '">' +
                    '<a href="javascript:;" class="increment">+</a>' +
                    '</div>' +
                    '</div>' +
                    '</li>' +
                    '<li>' +
                    '<div class="p-num">' +
                    '<div class="quantity-form">' +
                    '<a href="javascript:;" class="decrement">-</a>' +
                    '<input type="text" class="itxt child-count" value="' + child_num + '">' +
                    '<a href="javascript:;" class="increment">+</a>' +
                    '</div>' +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '</td>' +
                    '<!-- display cost -->' +
                    '<td class="border-0 align-middle cost movie-cost">$0</td>' +
                    '<!-- display delete button -->' +
                    '<td class="border-0 align-middle">' +
                    '<a href="#" class="text-dark"><i class="fa fa-trash"></i></a>' +
                    '</td>' +
                    '</tr>'
                );
                //get good information
                if(data.goods){
                    for (var i = 0; i < data.goods.length; i++) {
                        var goods_id = data.goods[i].goods_id;
                        var goods_name = data.goods[i].goods_name;
                        console.log(data.goods[i]);
                        var goods_img_url = data.goods[i].url;
                        var price = data.goods[i].price;
                        var quantity = data.goods[i].quantity;
                        $(".product_info").append(
                            '<tr value="goods" class="goods">' +
                            '<th scope="row" class="border-0">' +
                            '<div class="p-2">' +
                            '<img src="./uploads/' + goods_img_url + '" alt="" width="70" class="img-fluid rounded shadow-sm">' +
                            '<div class="ml-3 d-inline-block align-middle">' +
                            '<h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle goods-name" value="' + goods_id + '">' + goods_name + '</a></h5>' +
                            '</div>' +
                            '</div>' +
                            '</th>' +
                            '<!-- display price -->' +
                            '<td class="border-0 align-middle unit-price">' +
                            '<ul class="price-display">' +
                            '<li class="goods-price">$<strong>' + price + '</strong></li>' +
                            '</ul>' +
                            '</td>' +
                            '<!-- display add/decrease button -->' +
                            '<td class="border-0 align-middle">' +
                            '<ul class="quantity-display">' +
                            '<li>' +
                            '<div class="p-num">' +
                            '<div class="quantity-form">' +
                            '<a href="javascript:;" class="decrement">-</a>' +
                            '<input type="text" class="itxt quantity goods-quantity" value="' + quantity + '">' +
                            '<a href="javascript:;" class="increment">+</a>' +
                            '</div>' +
                            '</div>' +
                            '</li>' +
                            '</ul>' +
                            '</td>' +
                            '<!-- display cost -->' +
                            '<td class="border-0 align-middle cost goods-cost">$0</td>' +
                            '<!-- display delete button -->' +
                            '<td class="border-0 align-middle">' +
                            '<a href="#" class="text-dark"><i class="fa fa-trash"></i></a>' +
                            '</td>' +
                            '</tr>'
                        );
                    }
                }
                getCostFirst();
                getSum();
                // increment the quantity
                $(".increment").on("click", function() {
                        var amount = $(this).siblings(".itxt").val();
                        amount++;
                        $(this).siblings(".itxt").val(amount);
                        getCost.call(this);
                        getSum();
                    })
                    // decrement the quantity
                $(".decrement").on("click", function() {
                    var amount = $(this).siblings(".itxt").val();
                    if (amount != 0) {
                        amount--;
                        $(this).siblings(".itxt").val(amount);
                    }
                    getCost.call(this);
                    getSum();
                })


                $(".itxt").change(function() {
                    getCost.call(this);
                    getSum();
                })

                //delete an item
                $(".fa").on("click", function() {
                    $(this).parents("tr").remove();
                    getSum();
                })
            }
            
        })
    }






    //testing
    // data = {
    //     "movie": [{
    //         "url": "spiderMan-small.jpg",
    //         "movie_id": 1,
    //         "name": "spider man",
    //         "movie_date": "2020-03-13",
    //         "movie_time": "00000000000000000000000000000000001000000000000",
    //         "senior_price": 18,
    //         "adult_price": 12,
    //         "child_price": 7,
    //         "senior_ticket_num": 4,
    //         "adult_ticket_num": 4,
    //         "child_ticket_num": 4
    //     }],
    //     "goods": [{
    //         "goods_name": "Popcorn & Drink",
    //         "url": "img/warCraft-small.jpg",
    //         "price": 20,
    //         "quantity": 3
    //     }]
    // }
    // $(".product_info").empty();
    // //get information of movie
    // if (data.movie != null) {
    //     var movie_img_url = data.movie[0].url;
    //     var movie_id = data.movie[0].movie_id;
    //     var movie_name = data.movie[0].name;
    //     var movie_date = data.movie[0].movie_date;
    //     var movie_time = data.movie[0].movie_time; //just date
    //     //convert from time flag to actual time format
    //     // var movie_time = convertMovieTime(movie_time);
    //     var senior_price = data.movie[0].senior_price;
    //     var adult_price = data.movie[0].adult_price;
    //     var child_price = data.movie[0].child_price;
    //     var senior_num = data.movie[0].senior_ticket_num;
    //     var adult_num = data.movie[0].adult_ticket_num;
    //     var child_num = data.movie[0].child_ticket_num;
    //     //add movie to the body
    //     $(".product_info").append(
    //         '<tr value="movie">' +
    //         '<th scope="row" class="border-0">' +
    //         '<div class="p-2">' +
    //         '<img src="uploads/' + movie_img_url + '" alt="" width="70" class="img-fluid rounded shadow-sm">' +
    //         '<div class="ml-3 d-inline-block align-middle">' +
    //         '<h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle movie-name" value = "' + movie_id + '">' + movie_name + '</a></h5><span class="text-muted font-weight-normal font-italic d-block">Time: <span class="movie-time" value="' + movie_date + '" alt ="' + movie_time + '">' + movie_date + ' ' + convertMovieTime(movie_time) + '</span></span>' +
    //         '</div>' +
    //         '</div>' +
    //         '</th>' +
    //         '<!-- display price -->' +
    //         '<td class="border-0 align-middle unit-price">' +
    //         '<ul class="price-display movie-price-display">' +
    //         '<li class="senior-price">Senior: $<strong>' + senior_price + '</strong></li>' +
    //         '<li class="adult-price">Adult: $<strong>' + adult_price + '</strong></li>' +
    //         '<li class="child-price">Child: $<strong>' + child_price + '</strong></li>' +
    //         '</ul>' +
    //         '</td>' +
    //         '<!-- display add/decrease button -->' +
    //         '<td class="border-0 align-middle">' +
    //         '<ul class="quantity-display movie-quantity-display">' +
    //         '<li>' +
    //         '<div class="p-num">' +
    //         '<div class="quantity-form">' +
    //         '<a href="javascript:;" class="decrement">-</a>' +
    //         '<input type="text" class="itxt senior-count" value="' + senior_num + '">' +
    //         '<a href="javascript:;" class="increment">+</a>' +
    //         '</div>' +
    //         '</div>' +
    //         '</li>' +
    //         '<li>' +
    //         '<div class="p-num">' +
    //         '<div class="quantity-form">' +
    //         '<a href="javascript:;" class="decrement">-</a>' +
    //         '<input type="text" class="itxt adult-count" value="' + adult_num + '">' +
    //         '<a href="javascript:;" class="increment">+</a>' +
    //         '</div>' +
    //         '</div>' +
    //         '</li>' +
    //         '<li>' +
    //         '<div class="p-num">' +
    //         '<div class="quantity-form">' +
    //         '<a href="javascript:;" class="decrement">-</a>' +
    //         '<input type="text" class="itxt child-count" value="' + child_num + '">' +
    //         '<a href="javascript:;" class="increment">+</a>' +
    //         '</div>' +
    //         '</div>' +
    //         '</li>' +
    //         '</ul>' +
    //         '</td>' +
    //         '<!-- display cost -->' +
    //         '<td class="border-0 align-middle cost movie-cost">$0</td>' +
    //         '<!-- display delete button -->' +
    //         '<td class="border-0 align-middle">' +
    //         '<a href="#" class="text-dark"><i class="fa fa-trash"></i></a>' +
    //         '</td>' +
    //         '</tr>'
    //     );
    // }

    // if (data.goods != null) {
    //     //get good information
    //     for (var i = 0; i < data.goods.length; i++) {
    //         var goods_id = data.goods[i].goods_id;
    //         var goods_name = data.goods[i].goods_name;
    //         var goods_img_url = data.goods[i].url;
    //         var price = data.goods[i].price;
    //         var quantity = data.goods[i].quantity;
    //         $(".product_info").append(
    //             '<tr value="goods" class="goods">' +
    //             '<th scope="row" class="border-0">' +
    //             '<div class="p-2">' +
    //             '<img src="/uploads/' + goods_img_url + '" alt="" width="70" class="img-fluid rounded shadow-sm">' +
    //             '<div class="ml-3 d-inline-block align-middle">' +
    //             '<h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle goods-name" value="' + goods_id + '">' + goods_name + '</a></h5>' +
    //             '</div>' +
    //             '</div>' +
    //             '</th>' +
    //             '<!-- display price -->' +
    //             '<td class="border-0 align-middle unit-price">' +
    //             '<ul class="price-display">' +
    //             '<li class="goods-price">$<strong>' + price + '</strong></li>' +
    //             '</ul>' +
    //             '</td>' +
    //             '<!-- display add/decrease button -->' +
    //             '<td class="border-0 align-middle">' +
    //             '<ul class="quantity-display">' +
    //             '<li>' +
    //             '<div class="p-num">' +
    //             '<div class="quantity-form">' +
    //             '<a href="javascript:;" class="decrement">-</a>' +
    //             '<input type="text" class="itxt quantity goods-quantity" value="' + quantity + '">' +
    //             '<a href="javascript:;" class="increment">+</a>' +
    //             '</div>' +
    //             '</div>' +
    //             '</li>' +
    //             '</ul>' +
    //             '</td>' +
    //             '<!-- display cost -->' +
    //             '<td class="border-0 align-middle cost goods-cost">$0</td>' +
    //             '<!-- display delete button -->' +
    //             '<td class="border-0 align-middle">' +
    //             '<a href="#" class="text-dark"><i class="fa fa-trash"></i></a>' +
    //             '</td>' +
    //             '</tr>'
    //         );
    //     }
    // }

    // convert movie time flag into regular time format
    function convertMovieTime(timeFlag) {
        var count = 0;
        for (var i = 0; i < timeFlag.length; i++) {
            if (timeFlag.charAt(i) == '1') {
                count = i;
                break;
            }
        }
        var hour = parseInt(count / 2);
        var min = count % 2;
        min = min == 0 ? "00" : "30";
        if (hour < 10) {
            hour = "0" + hour;
        }
        return hour + ":" + min;
    }
})