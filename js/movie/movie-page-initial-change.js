$(document).ready(function() {
    //check the name of movie in localStorage to load the page
    var movie_id = localStorage.getItem('movie_id');
    var movie_name = localStorage.getItem('movie_name');
    //check the if user is admin
    var user_type = localStorage.getItem('user_type');
    //send movie name through ajax
    var sendData = [{
        "movie_id": movie_id,
        "movie_name": movie_name
    }]
    console.log(sendData);
    //for testing -----------------
    // var data = [{
    //         "movie_name": "spiderman",
    //         "release_date": "2019-02-23",
    //         "duration": 110,
    //         "off_date": "2020-01-01",
    //         "category": "Action",
    //         "director": "xizi",
    //         "rate": 50,
    //         "img_url": "../img/spiderMan-small.jpg"
    //     },
    //     {
    //         "path": [
    //             "../img/spiderMan-small.jpg",
    //             "../img/spiderMan-small.jpg",
    //             "../img/spiderMan-small.jpg",
    //             "../img/spiderMan-small.jpg",
    //             "../img/spiderMan-small.jpg"
    //         ]
    //     }
    // ];
    // return movie information
    $.ajax({
        type: "post",
        url: "external/movie_api/MoviePage_Initial.php",
        data: {"sendData":JSON.stringify(sendData)},
        success: function(data) {
            data = JSON.parse(data);
            //this data should contain all the information about this image in json format;
            var movie_id = data[0].id;
            var movie_name = data[0].name;
            var release_date = data[0].release_date;
            var duration = data[0].duration;
            var off_date = data[0].off_date;
            var category = data[0].type_name;
            var director = data[0].director;
            var rate = data[0].rating;
            var senior_price = data[0].senior_price;
            var adult_price = data[0].adult_price;
            var child_price = data[0].child_price;
            var img_url = "./uploads/" + data[0].img_url // assume return image url is absolute path
                // this data should contain image path for stage pictures
            var stage_img = data[0].stage_image;
            //next is to apply these information on the page
            //change the left image in the information body
            $(".left").attr("src", img_url);
            //add movie id to the title span
            $("#movie-title").attr("value", movie_id);
            //get all span element first
            var span_elements = $(".movie-info").find("span");
            //change movie's name
            span_elements[0].innerHTML = movie_name;
            //change release date
            span_elements[1].innerHTML = release_date;
            //change duration
            span_elements[2].innerHTML = duration;
            //change off_date
            span_elements[3].innerHTML = off_date;
            //change category
            span_elements[4].innerHTML = category;
            //change director
            span_elements[5].innerHTML = director;
            //change rate
            span_elements[6].innerHTML = rate + "%";
            //change price for ticket
            $("#senior-price").text(senior_price);
            $("#adult-price").text(adult_price);
            $("#child-price").text(child_price);
            //iterate stage image to attach
            for (var i = 0; i < stage_img.length; i++) {
                $("#photo .nav").append(
                    '<li class="nav-item"><a class="nav-link" href="#"><img class="movie-photo" src="./uploads/' + stage_img[i].image_name + '"></a></li>'
                )
            }

            //check if user type is regular user, hide edit; otherwise, hide buy ticket
            if (user_type == 0) {
                $(".movie-info-btn").hide();
                $(".admin-edit").show();
            } else if (user_type == 1) {
                $(".movie-info-btn").show();
                $(".admin-edit").hide();
            } else {
                $(".movie-info-btn").show();
                $(".admin-edit").hide();
            }
        },
        error: function() {}
    });


    // this is just for testing
    // var movie_name = data[0].movie_name;
    // var release_date = data[0].release_date;
    // var duration = data[0].duration;
    // var off_date = data[0].off_date;
    // var category = data[0].category;
    // var director = data[0].director;
    // var rate = data[0].rate;
    // var img_url = data[0].img_url // assume return image url is absolute path
    //     // this data should contain image path for stage pictures
    // var stage_img = data[1].path;
    // //next is to apply these information on the page
    // //change the left image in the information body
    // $(".left").attr("src", img_url);

    // //get all span element first
    // var span_elements = $(".movie-info").find("span");
    // //change movie's name
    // span_elements[0].innerHTML = movie_name;
    // //change release date
    // span_elements[1].innerHTML = release_date;
    // //change duration
    // span_elements[2].innerHTML = duration;
    // //change off_date
    // span_elements[3].innerHTML = off_date;
    // //change category
    // span_elements[4].innerHTML = category;
    // //change director
    // span_elements[5].innerHTML = director;
    // //change rate
    // span_elements[6].innerHTML = rate + "%";

    // //iterate stage image to attach
    // for (var i = 0; i < stage_img.length; i++) {
    //     $("#photo ul").append(
    //         '<li class="nav-item"><a class="nav-link active" href="#"><img class="movie-photo" src="' + stage_img[i] + '"></a></li>'
    //     )
    // }
    // if (user_type == 0) {
    //     $(".movie-info-btn").hide();
    //     $(".admin-edit").show();
    // } else if (user_type == 1) {
    //     $(".movie-info-btn").show();
    //     $(".admin-edit").hide();
    // } else {
    //     $(".movie-info-btn").show();
    //     $(".admin-edit").hide();
    // }
})