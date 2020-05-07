$(document).ready(function() {

    $.ajax({
        type: "post",
        url: "external/goods_api/listGoods.php",
        success: function(data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                var goods_name = data[i].goods_name;
                var goods_id = data[i].goods_id;
                var goods_price = data[i].price;
                var url = data[i].image_name;
                $("#food .row").append(
                    '<div class="col-lg-4">' +
                    '<div class="card card-style food-background">' +
                    '<img src="./uploads/' + url + '" class="card-img-top" style="height:300px" alt="...">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title card-text" value="' + goods_id + '">' + goods_name + '</h5>' + '<h6 class="card-title card-text">Price: $<span class="goods-price-section card-text">' + goods_price + '<span></h6>' +
                    '<button class="btn btn-primary food-plan">Add To Cart</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
            bind_foods();
        }
    })
})

function bind_foods() {
    $(".food-plan").on("click", function() {
        //first get user information
        var username = localStorage.getItem("username");
        //if user is not log in, do not allow to add to shopping cart
        if (username == null || username == "") {
            alert("Please Sign In First");
        } else {
            var food_plan = $(this).siblings("h5").attr("value");
            // send user name and the food plan user choose to add to the db
            var sendData = [{
                "username": username,
                "food_id": food_plan,
                "quantity": 1
            }]
            $.ajax({
                type: "post",
                url: "external/shopping_api/addFood.php",
                data: { "sendData": JSON.stringify(sendData) },
                success: function(data) {
                    if (data == 1) {
                        alert("You have successfully add it to your cart");
                    } else {
                        alert("Food is currently out of order. Please come back later!")
                    }
                },
                error: function() {}
            })
        }
    })
}