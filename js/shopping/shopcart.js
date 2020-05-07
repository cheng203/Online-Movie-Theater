function getCostFirst() {
        //before calculating, determine if there is a movie added
        // This is used to calculate the movie cost
        if ($(".product_info tr:first-child").attr("value") == "movie") {
            var all_p = $(".movie-price-display").find("strong");
            var all_price = [];
            for (var i = 0; i < all_p.length; i++) {
                all_price.push(parseFloat(all_p[i].innerText));
            }
            var all_c = $(".movie-quantity-display").find(".itxt");
            var all_count = [];
            for (var i = 0; i < all_p.length; i++) {
                all_count.push(parseInt(all_c[i].value));
            }
            var unit_t = $(".movie-cost");
            var cur_cost = 0;
            for (var i = 0; i < all_price.length; i++) {
                cur_cost += all_price[i] * all_count[i];
            }
            
            cur_cost = cur_cost.toFixed(2);
            unit_t[0].innerText = "$" + cur_cost;
        };
        if ($(".product_info tr:first-child").attr("value") == "goods" || $(".product_info tr:nth-child(2)" == "goods")) {
            //This is used to calculate the goods cost
            var goods_price = $(".goods-price");
            var goods_quantity = $(".goods-quantity")
            var goods_cost = $(".goods-cost");
            for (var i = 0; i < goods_price.length; i++) {
                var price = parseFloat(goods_price[i].innerText.substring(1));
                var quantity = goods_quantity[i].value;
                var cost = price * quantity;
                goods_cost[i].innerText = "$" + cost;
            }
        }
        //This is to get sum
        getSum();
    }

    function getCost() {
        //get price of senior, adult and child and store them into price array
        var unitP = $(this).parents(".border-0").siblings(".unit-price");
        var unitP = unitP.find(".price-display").children("li");
        if (unitP.length == 1) {
            var unitC = $(this).parents(".quantity-display").children("li");
            unitC = unitC.find(".itxt").val();
            var cost_sum = parseFloat(unitP[0].innerText.substr(1)) * unitC;
            $(this).parents(".border-0").siblings(".cost")[0].innerText = "$" + cost_sum;
        } else {
            var price = [];
            for (var i = 0; i < unitP.length; i++) {
                if (i == 0) {
                    price.push(parseFloat(unitP[i].innerText.substr(9)));
                } else if (i == 1) {
                    price.push(parseFloat(unitP[i].innerText.substr(8)));
                } else {
                    price.push(parseFloat(unitP[i].innerText.substr(8)));
                }
            }
            //get count of senior, adult and child and store them into count array;
            var unitC = $(this).parents(".quantity-display").children("li");
            unitC = unitC.find(".itxt");
            var count = [];
            for (var i = 0; i < unitC.length; i++) {
                count.push(unitC[i].value);
            }

            //calculate the cost of this movie
            var cost_sum = 0;
            for (var i = 0; i < price.length; i++) {
                cost_sum += price[i] * count[i];
            }
            cost_sum = cost_sum.toFixed(2);
            $(this).parents(".border-0").siblings(".cost")[0].innerText = "$" + cost_sum;
        }
    }

    function getSum() {
        var sum = 0

        $(".cost").each(function(i, ele) {
            sum += parseFloat($(ele).text().substr(1));
        })
        $(".order-total").text("$" + sum);
        var ship = parseFloat($(".ship-total").text().substr(1));
        var total = sum + ship;
        total = total.toFixed(2);
        $(".sum-total").text("$" + total);
    }
