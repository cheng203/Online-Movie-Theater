$(document).ready(function() {
    $.ajax({
        type: "post",
        url: "external/goods_api/foodInfo.php",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var goods_name = data[i].goods_name;
                var goods_id = data[i].goods_id;
                var goods_price = data[i].price;
                var url = data[i].url;
                $("#food row").append(
                    '<div class="col-md-4">' +
                    '<div class="card card-style">' +
                    '<img src="/uploads/' + url + '" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title card-text" value="' + goods_id + '">' + goods_name + '</h5>' + '<h6 class="card-title">Price: $<span class="goods-price-section">' + goods_price + '<span></h6>' +
                    '<button class="btn btn-primary food-plan">Add To Cart</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        }
    })
})