$(document).ready(function() {
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
})