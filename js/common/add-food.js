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
                url: ".........",
                data: sendData,
                success: function() {
                    alert("You have successfully add it to your cart");
                },
                error: function() {}
            })
        }
    })
})