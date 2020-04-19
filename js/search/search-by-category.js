$(document).ready(function() {
    //once category is clicked. return corresponding movie list
    $(".movie-search-link").on("click", function() {
        //get selected movie type
        var category = $(this).text();
        // $.ajax({
        //     type: "POST",
        //     url: ".......",
        //     data: { "type": category },
        //     success: function(data) {
        //          pagination(data);
        //          $(".pagination").on("click", "li", function() {
        //          display(data, $(this).text()); 
        //     },
        //     error: function() {
        //         console.log("none");
        //     }
        // });

        //testing
        var data = [{
                "movie-name": "spider",
                "url": "img/warCraft-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/doctorStrange-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            },
            {
                "movie-name": "spider",
                "url": "img/spiderMan-small.jpg"
            }
        ];
        pagination(data);
        $(".pagination").on("click", "li", function() {
            display(data, $(this).text());
        });
    })
})