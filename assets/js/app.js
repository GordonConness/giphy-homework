$(document).ready(function() {

var topics = ["German Sherperd","Weiner Dog","Newfoundland","Golden Retriever","Pug"];
var dog;

function renderButtons() {
    $(".button").empty();
    for (let i=0; i < topics.length; i++) {
      let addButton = $('<button>');
      addButton.addClass("dogs");
      addButton.attr("data-name", topics[i]);
      addButton.text(topics[i]);
  
      $(".button").append(addButton);
    }
    $(".dogs").on("click", function () {
        dog = $(this).attr("data-name");
        display()
    })

    }
  
  
  $(".add-gif").on("click", function(event){
      event.preventDefault();
      var gifs = $(".gif-name").val().trim();
      topics.push(gifs);
      $(".gif-name").val("");
      renderButtons();
  });
  renderButtons();

function display() {
    var query = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&limit=10&rating=g&api_key=Y9GKQbgmCdbHfTHgL9d779rpOqggkkHU";

    $.ajax({url: query, method: "GET"}).then(function(response) {
        console.log(response);
        for (let i=0; i < response.data.length; i++) {
            var gifDiv =$('<div>');
            gifDiv.addClass("gifDiv");
            var rating = response.data[i].rating;
            var p = $("<p>")
            p.text("rating" + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var gif = $('<img>');
            gif.addClass("gifImage");

            gif.attr('src', still);
            gif.attr('data-still', still);
            gif.attr('data-animate', animated);
            gif.attr('data-state','still');

            gifDiv.append(rating);
            gifDiv.prepend(gif);
            $('.gifHere').prepend(gifDiv);
        }
    })
};

$(".gifImage").on("click", function() {

    var state = $(this).attr('data-state');
    
    if (state == 'still') {
        $(this).attr('src', $(this).data('data-animated'));
        $(this).attr('data-state', 'animated');}
    else {
        $(this).attr('src', $(this).data('data-still'));
        $(this).attr('data-state', 'still');
    }
});

$(document).on("click", "dogs", display);

});
