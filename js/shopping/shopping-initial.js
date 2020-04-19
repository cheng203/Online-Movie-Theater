$(document).ready(function() {
    var username = localStorage.getItem("username");
    if (username == null || username == "") {
        var header = $(".display-4").find("span");
        header.innerHTML = "please sign in first."
    } else {
        var header = $(".display-4").find("span");
        header.innerHTML = username;
        var sendData = [{
            "username": username
        }]
        $.ajax({
            type: "post",
            url: ".....",
            data: sendData,
            dataType: "json",
            success: function(data) {
                $(".product_info").clear();
                for (var i = 0; i < data.length; i++) {
                    var img_url = data[i].url;
                    var movie_name = data[i].movie_name;
                    var ticket_time = data[i].ticket_time; //just date
                    var senior_price = data[i].senior_price;
                    var adult_price = data[i].adult_price;
                    var child_price = data[i].child_price;
                    var senior_num = data[i].senior_ticket_num;
                    var adult_num = data[i].adult_ticket_num;
                    var child_num = data[i].child_ticket_num;

                    $(".product_info").append(
                        '<tr>' +
                        '<th scope="row" class="border-0">' +
                        '<div class="p-2">' +
                        '<img src="' + img_url + '" alt="" width="70" class="img-fluid rounded shadow-sm">' +
                        '<div class="ml-3 d-inline-block align-middle">' +
                        '<h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle movie-name">' + movie_name + '</a></h5><span class="text-muted font-weight-normal font-italic d-block">Time: <span class="movie-time>' + ticket_time + '</span></span>' +
                        '</div>' +
                        '</div>' +
                        '</th>' +
                        '<!-- display price -->' +
                        '<td class="border-0 align-middle unit-price">' +
                        '<ul class="price-display">' +
                        '<li class="senior-price">Senior: $<strong>' + senior_price + '</strong></li>' +
                        '<li class="adult-price">Adult: $<strong>' + adult_price + '</strong></li>' +
                        '<li class="child-price">Child: $<strong>' + child_price + '</strong></li>' +
                        '</ul>' +
                        '</td>' +
                        '<!-- display add/decrease button -->' +
                        '<td class="border-0 align-middle">' +
                        '<ul class="quantity-display">' +
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
                        '<td class="border-0 align-middle cost">$0</td>' +
                        '<!-- display delete button -->' +
                        '<td class="border-0 align-middle">' +
                        '<a href="#" class="text-dark"><i class="fa fa-trash"></i></a>' +
                        '</td>' +
                        '</tr>'
                    );
                }
            }
        })
    }
})