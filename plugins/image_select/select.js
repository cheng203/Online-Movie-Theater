$(document).ready(function() {
    var btn = $("<button/>").html("Select")
        .addClass("select_submit")
    var hint = $("<p/>").html("")
        .addClass("select_hint")
        .css("display", "inline")
        .css("font-size", "12px");;
    $(".image_select").attr("image_list", " ").append(btn).append(hint).css("display", "block");
    $(".select_submit").on("click", function() {
        createMediaDiv($(this).parent());
        getImageData($(this).parent());
    });
});

function createMediaDiv(selector) {
    var imgLib = $("<div/>").html("Please select image(s)")
        .css("width", "1220px")
        .css("height", "800px")
        .css("border", "solid")
        .css("border-width", "2px")
        .css("border-color", "#bebebe")
        .addClass("imgLib")
        // .center();
    var imgDisplay = $("<div/>").addClass("img_display").css("float", "left").css("overflow", "auto").css("height", "770px");
    imgLib.append("<button class='imgLibConfirm' style='float: right'>Confirm</button>")
        .append("<button class='imgLibCancel' style='float: right'>Cancel</button>")
        .append("<br>");
    imgLib.append(imgDisplay);
    selector.append(imgLib);
}

function getImageData(selector) {
    var path = $(".image_select").attr("path");
    if (path.charAt(path.length - 1) != "/") {
        path = path + "/";
    }
    path = path + 'image_select/getImageData.php'; //relative path
    $(".imgLib").show();
    $.ajax({
        type: "POST",
        url: path,
        dataType: "text",
        success: function(data) {
            var imgDisplay = selector.find(".img_display");
            var imgArr = JSON.parse(data);
            $.each(imgArr, function(i, img) {
                imgDisplay.append(imgBlock(img.image_id, img.image_name));
            });
        },
        error: function() {
            console.log("error");
        }
    })

    $(".imgLibCancel").on("click", function() {
        $($(this).parent().parent().children(".select_hint")).html("");
        $($(this).parent().parent().children(".select_hint")).removeAttr("imgIdList");
        $(this).parent().remove();
    });
    $(".imgLibConfirm").on("click", function() {
        var imageCheckBoxes = $(this).parent().find(".image_check_box");
        var imgIdList = "";
        var imgNameList = "";
        $.each(imageCheckBoxes, function(index, checkBox) {
            if ($(checkBox).prop("checked")) {
                imgIdList += $(checkBox).attr("imgId") + ",";
                imgNameList += $(checkBox).attr("imgName") + ", ";
            }
        });
        if (imgIdList != "") {
            imgIdList = imgIdList.substr(0, imgIdList.length - 1);
            imgNameList = imgNameList.substr(0, imgNameList.length - 2);
            $($(this).parent().parent()).attr("imgIdList", imgIdList);
            $($(this).parent().parent().children(".select_hint")).html("&nbsp&nbsp" + imgNameList);
        }
        $(this).parent().remove();
    });

}

jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}

function imgBlock(imgId, imgName) {
    var block = $("<div/>").css("position", "relative")
        .css("display", "inline")
        .css("padding", "24px")
        .css("height", "auto")
        .addClass("img_block");
    var path = $(".image_select").attr("path");
    if (path.charAt(path.length - 1) != "/") {
        path = path + "/";
    }
    path = path + "../uploads/thumb/thumb-" + imgName; //relative path
    var img = $("<img/>").attr("src", path).css("width", "150px").css("max-height", "250px");
    var inputBox = $("<input/>").addClass("image_check_box")
        .attr("type", "checkbox")
        .attr("name", "box" + imgId)
        .attr("imgId", imgId)
        .attr("imgName", imgName)
        .css("width", "40px")
        .css("height", "40px")
        .css("position", "absolute").css("top", "-2px").css("right", "20px").css("z-index", "1000");

    block.append(img).append(inputBox);
    return block;
}