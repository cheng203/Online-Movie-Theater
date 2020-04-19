$(document).ready(function() {
    $(".food-plan").on("click", function() {
        //first get user information
        var username = localStorage.getItem("username");
        //if user is not log in, do not allow to add to shopping cart
        if (username == "") {
            alert("Please Sign In First");
        } else {
            var food_plan = $(this).siblings("h5").text();
            if (food_plan == "Popcorn") {
                food_plan = "a";
            } else if (food_plan == "Drink") {
                food_plan = "b";
            } else {
                food_plan = "c";
            }

            // send user name and the food plan user choose to add to the db
            var sendData = [{
                "username": username,
                "food": food_plan
            }]
            $.ajax({
                type: "post",
                url: "core/sendFood.php",
                data: sendData,
                success: function() {
                    console.log("You successfullt add it!");
                },
                error: function() {
                    console.log("Running out of stock.");
                }

            })
        }
    })
})