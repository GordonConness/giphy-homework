var topics = ["German Sherperd","Weiner Dog","Newfoundland","Golden Retriever","Pug"]

function display() {
    var topics = $(this).attr("data-name");
    var query = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=NdUWPxxRgRJ2VIj4ePyzF2csiixs8G2X";

    $.ajax({url: query, method: "GET"}).done(function(response) {
        $(".gif").empty();

        for (let i=0; i < response.data.length; i++) {
            var gifDiv =$('<div class="gifDiv"');
            gifDiv.addClass("gifDiv");
            var rating = response.data[i].rating;
            rating.addClass("rating");
            var animated = response.data[i].images.fixed_height.url;
            animated.addClass("animated");
            var still = response.data[i].images.fixed_height_still.url;
            still.addClass("still");
            var gif = $('<img class="gifImage">');

            gif.attr('src','still')
            gif.attr('data-still', 'still')
            gif.attr('data-animate', 'animated');
            gif.attr('data-state','still');

            gifDiv.append(rating);
            gifDiv.prepend(gif);
            $('gifHere').prepend(gifDiv);
            
        }
    })
};

$('gifHere').on("click",".gifImage", function() {

});
