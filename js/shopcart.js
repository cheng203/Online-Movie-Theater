$(document).ready(function() {
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
    getSum();

    $(".fa").on("click", function() {
        $(this).parents("tr").remove();
        getSum();
    })

    function getCostFirst() {
        var all_p = $(".unit-price").find("strong");
        var all_price = [];
        for (var i = 0; i < all_p.length; i++) {
            all_price.push(parseFloat(all_p[i].innerText));
        }
        var all_c = $(".itxt");
        var all_count = [];
        for (var i = 0; i < all_p.length; i++) {
            all_count.push(parseInt(all_c[i].value));
        }
        var unit_t = $(".cost");
        var count = 0;
        var cur = [];
        for (var i = 0; i < all_price.length / 3; i++) {
            var cur_sum = 0;
            for (var j = 0; j < 3; j++) {
                console.log(all_price[3 * i + j] * all_count[3 * i + j]);
                cur_sum += all_price[3 * i + j] * all_count[3 * i + j];
            }
            console.log(cur_sum);
            cur.push(cur_sum);
        }
        console.log(cur);
        for (var i = 0; i < unit_t.length; i++) {
            unit_t[i].innerText = "$" + cur[i];
        }
    }

    function getCost() {
        //get price of senior, adult and child and store them into price array
        var unitP = $(this).parents(".border-0").siblings(".unit-price");
        var unitP = unitP.find(".price-display").children("li");
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
        $(this).parents(".border-0").siblings(".cost")[0].innerText = "$" + cost_sum;
    }

    function getSum() {
        var sum = 0

        $(".cost").each(function(i, ele) {
            sum += parseFloat($(ele).text().substr(1));
        })
        $(".order-total").text("$" + sum);
        var ship = parseFloat($(".ship-total").text().substr(1));
        var total = sum + ship;
        $(".sum-total").text("$" + total);
    }
})