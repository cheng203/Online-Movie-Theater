function pagination(data) {
    $(".pagination").empty();
    $(".movie-list-body").empty();
    var dataL = data.length; //length of data received
    var numItem = 3; //number of item display in each page
    var pageNum = 0;
    var displayData= data;

    if (dataL % numItem == 0) {
        pageNum = dataL / numItem;
    } else {
        pageNum = parseInt(dataL / numItem) + 1;
    }
    // if need more than one page to display result, then add pre first. Next will be added at the end
    if (data.length > 3) {
        $(".pagination").append(
            '<li class="page-item prev-item"><a class="page-link" href="#" value = "prev">Previous</a></li>'
        );
    }
    for (var i = 0; i < pageNum; i++) {
        if (i == 0) {
            $(".pagination").append(
                '<li class="page-item active"><a class="page-link" href="#" value = ' + (i + 1) + '>' + (i + 1) + '</a></li>'
            );
        } else {
            $(".pagination").append(
                '<li class="page-item"><a class="page-link" href="#" value = "' + (i + 1) + '">' + (i + 1) + '</a></li>'
            );
        }

    }
    if (data.length > 3) {
        $(".pagination").append(
            '<li class="page-item next-item"><a class="page-link" href="#" value= "next">Next</a></li>'
        );
    }
    var text = parseInt($(".pagination").find(".active").text()) - 1;
    var numLength = numItem * text + 3 > dataL ? dataL : numItem * text + 3;
    for (var i = numItem * text; i < numLength; i++) {
        $(".movie-list-body").append(
            '<li class=" clearfix movie-list-body-li">' +
            '<div style="float: left;">' +
            '<img style="width: 344px" src="./uploads/' + data[i].url + '">' +
            '<button class="btn btn-light value="' + data[i].name + '" alt="' + data[i].movie_id + '">Go to Movie</button>' +
            '</div>' +
            '</li>'
        )
    }
    $(".page-item").on("click", function() {
        var text = $(this).text();
        display(displayData, text);
    })

}

function display(data, text) {
    //if index == prev
    if (text == "Previous") {
        text = parseInt($(".pagination").find(".active").text()) - 1;
        if (text <= 0) {
            return;
        } else {
            // used to add active class to selected one
            $(".pagination .active").removeClass("active");
            $(".pagination .page-item").filter(function() {
                if ($(this).text() == text) {
                    return $(this);
                }
            }).addClass("active");
            addPicture(data, text);
        }
    } else if (text == "Next") {
        text = parseInt($(".pagination").find(".active").text()) + 1;
        var prev_index = $(".pagination").find(".next-item").prev().text();
        if (text > prev_index) {
            return;
        } else {
            // used to add active class to selected one
            $(".pagination .active").removeClass("active");
            $(".pagination .page-item").filter(function() {
                if ($(this).text() == text) {
                    return $(this);
                }
            }).addClass("active");
            addPicture(data, text);
        }
    } else {
        // used to add active class to selected one
        $(".pagination .active").removeClass("active");
        $(".pagination .page-item").filter(function() {
            if ($(this).text() == text) {
                return $(this);
            }
        }).addClass("active");
        addPicture(data, text);
    }
}

function addPicture(data, text) {
    $(".movie-list-body").empty();
    text = text - 1;
    var dataL = data.length; //length of data received
    var numItem = 3; //number of item display in each page
    var numLength = numItem * text + 3 > dataL ? dataL : numItem * text + 3;
    for (var i = numItem * text; i < numLength; i++) {
        $(".movie-list-body").append(
            '<li class=" clearfix movie-list-body-li">' +
            '<div style="float: left;">' +
            '<img style="width: 344px" src="./uploads/' + data[i].url + '">' +
            '<button class="btn btn-light go-to-movie" alt = "' + data[i].name + '" value="' + data[i].movie_id + '">Go to Movie</button>' +
            '</div>' +
            '</li>'
        )
    }

    $(".go-to-movie").on("click", function() {
        var movie_id = $(this).attr("value");
        var movie_name = $(this).attr("alt");
        localStorage.setItem("movie_id", movie_id);
        localStorage.setItem("movie_name", movie_name);
        window.location.href = "./movie.html";
    })
}