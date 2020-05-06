$(document).ready(function () {
    initSetter();
});

/**
 * method to generate plugin by jqeury
 * @param {string} path 
 */
function generateImageSetter(path) {
    var newImageSetting = $("<plugin/>").attr("path", path).addClass("image_setting");
    buildElements(newImageSetting);
    return newImageSetting;
}

/**
 * init pre-created plugin in html
 */
function initSetter() {
    buildElements($(".image_setting"));
}

/**
 * To build elements of plugin
 * @param {plugin object} selector 
 */
function buildElements(selector) {
    var path = $("plugin.image_setting").attr("path");
    if (path && path.charAt(path.length - 1) != "/") {
        path = path + "/";
        $("plugin.image_setting").attr("path", path);
    }
    var openBtn = $("<button/>").html("Image Setter").addClass("setter_open_btn");
    $(selector).append(openBtn);
    $(selector).find(".setter_open_btn").on("click", openImageSetter);
}

function openImageSetter() {
    var path = $($(this).parent()).attr("path");
    $(this).parent().find(".image_setter_panel").remove();
    $(this).parent().append(createImageSetterPanel(path));
    loadMovieMode($(this).parent().find(".image_setter_panel"));
}

function createImageSetterPanel(path) {
    var panel = $("<div/>").addClass("image_setter_panel").html("Image Setting Panel (Login as Administrator)")
        .css("width", "800px")
        .css("height", "700px")
        .css("border", "solid")
        .css("border-width", "2px")
        .css("border-color", "#bebebe")
        .css("background-color", "#FFFFFF")
        .center()
        .attr("mode", "movie");
    var movieBtn = $("<button/>").html("movie").addClass("setter_movie_switch")//Switch for movie setting
        .click(switchToMovie);
    var goodsBtn = $("<button/>").html("goods").addClass("setter_goods_switch")// Switch for goods setting
        .click(switchToGoods);
    var closeBtn = $("<button/>").html("Close").addClass("setter_close_btn").css("float", "right")
        .click(closeImageSetter);
    var modeHint = $("<p style='display: inline; float: right'> Current mode: <b>MOVIE</b> &nbsp</p>")
        .addClass("mode_hint");//indicate current mode
    var newUploader = generateUploader(path);
    panel.append(closeBtn).append("<br><hr><br>Upload New Images: ").append(newUploader).append("<br><hr>")
        .append("<p style='display: inline'>Set images for </p>")
        .append(movieBtn).append("<p style='display: inline'> or </p>")
        .append(goodsBtn).append(modeHint);
    return panel;
}

function switchToMovie() {
    panel = $(this).parent();
    if ($(panel).attr("mode") != "movie") {
        $(panel).attr("mode", "movie");
        $(panel).find(".mode_hint").html('Current mode: <b>MOVIE</b> &nbsp');
        $(panel).find(".present_area").empty();
        loadMovieMode(panel);
    }
}

function switchToGoods() {
    panel = $(this).parent();
    if ($(panel).attr("mode") != "goods") {
        $(panel).attr("mode", "goods");
        $(panel).find(".mode_hint").html('Current mode: <b>GOODS</b> &nbsp');
        $(panel).find(".present_area").empty();
        loadGoodsMode(panel);
    }
}


function loadMovieMode(panel) {
    var path = $($(panel).parent()).attr("path");
    $.ajax({
        type: "POST",
        url: path + "../external/movie_api/listMovies.php",
        success: function (data) {
            if (data != "No Movie") {
                loadMovieSelector(panel, data, path);
            }
            else {
                panel.append("<p>" + data + "</p>");
            }
        },
        error: function () {
            console.log("error");
        }
    })

}

function loadMovieSelector(panel, data, path) {
    var arr = JSON.parse(data);
    var presentArea = $("<div/>").addClass("present_area");
    var movieSelector = $("<select/>").addClass("movie_selector");
    $.each(arr, function (i, movie) {
        var option = $("<option/>").html(movie.name).attr("movie_id", movie.movie_id);
        movieSelector.append(option);
    });
    presentArea.append($("<label/>").html("Select a movie: ")).append(movieSelector);
    presentArea.append(createMovieInfoTable(arr[0].movie_id, path));
    presentArea.append(createImgInfo(arr[0].movie_id, path));
    panel.append(presentArea);
    movieSelector.change(function () {
        var movie_id = $(this).children("option:selected").attr("movie_id");
        presentArea.find(".movie_info_table").remove();
        presentArea.find(".img_select_area").remove();
        presentArea.append(createMovieInfoTable(movie_id, path));
        presentArea.append(createImgInfo(movie_id, path));
    });

}

function createMovieInfoTable(movie_id, path) {
    var table = $("<table/>").addClass("movie_info_table");
    var text = "<tr><th>Movie</th> <th>Director</th> <th>Type</th> <th>Movie ID</th></tr>";
    table.append(text);
    $.ajax({
        type: "POST",
        url: path + "../external/movie_api/findMovie.php",
        data: { "movie_id": movie_id },
        success: function (data) {
            var movie = JSON.parse(data)[0];
            var newRow = $("<tr/>").append($("<td/>").html(movie.name))
                .append($("<td/>").html(movie.director))
                .append($("<td/>").html(movie.type_name))
                .append($("<td/>").html(movie_id));
            table.append(newRow);
        },
        error: function () {
            console.log("error");
        }
    })
    return table;
}

function createImgInfo(movie_id, path) {
    var imgSelectArea = $("<div/>").addClass("img_select_area").attr("movie_id", movie_id);
    $.ajax({
        type: "POST",
        url: path + "image_setting/getImageTypes.php",
        success: function (data) {
            var arr = JSON.parse(data);
            $.each(arr, function (i, type) {
                var typeName = type.image_type_name;
                var typeID = type.image_type_id;
                var movieImgSelector = $("<tr/>").addClass("movie_img_selector")
                    .attr("img_type_name", typeName)
                    .attr("img_type_id", typeID)
                    .append("<td>" + typeName + ": <td/>")
                    .append(generateSelector(path).css("display", "inline")
                        .attr("img_type_name", typeName)
                        .attr("img_type_id", typeID)
                        .attr("imgidlist", " ")
                        .addClass(typeName + "_selector"));
                imgSelectArea.append(movieImgSelector);
            });
            $.ajax({
                type: "POST",
                url: path + "../external/movie_api/getMovieImages.php",
                data: { "movie_id": movie_id },
                success: function (data) {
                    if (data != "No Images") {
                        $.each(JSON.parse(data), function (index, info) {
                            var className = info.image_type_name + "_selector";
                            var imgidlist = $(imgSelectArea).find("." + className).attr("imgidlist") + info.image_id + ",";
                            $(imgSelectArea).find("." + className).attr("imgidlist", imgidlist);
                            var imgnamelist = $(imgSelectArea).find("." + className + " .select_hint").html() + info.image_name + ",";
                            $(imgSelectArea).find("." + className + " .select_hint").html(imgnamelist);
                        });
                        $(imgSelectArea).find(".image_select").each(function (index, s) {
                            var imgidlist = $(s).attr("imgidlist");
                            var sHtml = $(s).find(".select_hint").html();
                            imgidlist = imgidlist.substring(1, imgidlist.length - 1);
                            sHtml = sHtml.substring(1, sHtml.length - 1);
                            $(s).attr("imgidlist", imgidlist);
                            $($(s).find(".select_hint")).html("&nbsp&nbsp" + sHtml);
                        });
                    }
                    else {
                        console.log(data);
                    }
                },
                error: function () {
                    console.log("error");
                }
            })
        },
        error: function () {
            console.log("error");
        }
    })



    var submitBtn = $("<button/>").html("Update Images").addClass("img_setting_submit").click(submitImageSetting);
    imgSelectArea.append(submitBtn);
    imgSelectArea.append($("<p/>").addClass("image_submit_hint"))
    return imgSelectArea;
}

function submitImageSetting() {
    var path = $(".image_setting").attr("path");
    var imgSelectArea = $(this).parent();
    var movie_id = $(imgSelectArea).attr("movie_id");
    var requestArr = [];
    $(imgSelectArea).find(".image_select").each(function (index, s) {
        var imgidlist = $(s).attr("imgidlist");
        var img_type_id = $(s).attr("img_type_id");
        requestArr.push({ "image_type_id": img_type_id, "imgidlist": imgidlist });
    });

    $.ajax({
        type: "POST",
        url: path + "../external/movie_api/setMovieImages.php",
        data: { "movie_id": movie_id, "images": JSON.stringify(requestArr) },
        success: function (data) {
            $($(imgSelectArea).find(".image_submit_hint")).html(data);
        },
        error: function () {
            $($(imgSelectArea).find(".image_submit_hint")).html("error");
        }

    })

}

function loadGoodsMode(panel) {
    var path = $($(panel).parent()).attr("path");
    $.ajax({
        type: "POST",
        url: path + "../external/goods_api/listGoods.php",
        success: function (data) {
            if (data != "No Goods") {
                loadGoodsSelector(panel, data, path);
            }
            else {
                panel.append("<p>" + data + "</p>");
            }
        },
        error: function () {
            console.log("error");
        }
    })

}

function loadGoodsSelector(panel, data, path) {
    var arr = JSON.parse(data);
    var presentArea = $("<div/>").addClass("present_area").attr("path", path);
    var goodsTable = $("<table/>").addClass("goods_table");
    $.each(arr, function (i, good) {
        var one = $("<tr/>").append($("<td/>").html(good.goods_name));
        var imgSelector = generateSelector(path).addClass("goods_img_selector")
            .attr("goods_id", good.goods_id)
            .attr("imgidlist", good.image_id)
            .css("display", "inline");
        imgSelector.find(".select_hint").html("&nbsp&nbsp" + good.image_name);

        goodsTable.append(one.append($("<td/>").append(imgSelector)));
    });
    var goodImgSubmitBtn = $("<button/>").addClass("goods_img_setting_submit").click(submitGoodsImageSetting).html("Update Images");

    presentArea.append(goodImgSubmitBtn).append(goodsTable)
        .append($("<p/>").addClass("image_submit_hint"));
    panel.append(presentArea);
}

function submitGoodsImageSetting() {
    var path = $($(this).parent()).attr("path");
    var requestArr = [];
    $($(this).parent()).find(".goods_img_selector").each(function (index, s) {
        var imglist = $(s).attr("imgidlist");
        var goodsID = $(s).attr("goods_id");
        requestArr.push({ "goods_id": goodsID, "imgidlist": imglist });
    });

    $.ajax({
        type: "POST",
        url: path + "../external/goods_api/setGoodsImages.php",
        data: { "images": JSON.stringify(requestArr) },
        success: function (data) {
            $(".image_submit_hint").html(data);
        },
        error: function () {
            $(".image_submit_hint").html("error");
        }
    })


}

function closeImageSetter() {
    $(this).parent().remove();
}

function generateImageSetterModeSwitch() {
    var modeSwitch = $("<div/>").html("Please select either setting images for movie or goods.");
    var movieSwitch = $("<button/>").addClass("movieSwitch").html("Mode: change movie images");
    var goodsSwitch = $("<button/>").addClass("goodSwitch").html("Mode: change goods images");
    modeSwitch.append(movieSwitch).append(goodsSwitch);
    return modeSwitch;
}