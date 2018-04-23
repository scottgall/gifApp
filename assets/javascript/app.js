$(function() {

var gifArr = ["Kanye West", "Jay Z", "J. Cole", "Drake"];
var offset = 0;
var current = "";


function displayGif(search) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + offset;

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
        console.log(response)
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='item'>");
            gifDiv.attr("id", "img" + (offset + i));

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("still", results[i].images.fixed_height_still.url);
            image.attr("animate", results[i].images.fixed_height.url);
            image.attr("state", "still");
            image.addClass("img");

            var favButton = $("<button>").text("fav");
            favButton.addClass("fav");
            favButton.val(offset + i);

            gifDiv.prepend(p);
            gifDiv.prepend(image);
            gifDiv.prepend(favButton);

            $("#gifSection").prepend(gifDiv);

            offset += 10;
        }
        
    
    });
} 

$(document.body).on("click", ".img", function() {

    var state = $(this).attr("state");
    console.log(state);

    if (state === "still") {
        var animateUrl = $(this).attr("animate");
        $(this).attr("src", animateUrl);
        $(this).attr("state", "animate");
    } else if (state === "animate") {
        var stillUrl = $(this).attr("still");
        $(this).attr("src", stillUrl);
        $(this).attr("state", "still");
    }
});

$(document.body).on("click", ".fav", function() {
    var i = $(this).val();
    $("#img" + i).clone().appendTo("#favSection");
});
    
// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonSection").empty();

    // Loops through the array of movies
    for (var i = 0; i < gifArr.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data", gifArr[i]);
        // Provided the initial button text
        a.text(gifArr[i]);
        // Added the button to the buttons-view div
        $("#buttonSection").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-button").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var button = $("#button-input").val().trim();
    $("#button-input").val('');

    // The movie from the textbox is then added to our array
    gifArr.push(button);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", function() {
    $("#gifSection").empty();
    offset = 0;
    displayGif($(this).attr("data"));
    current = $(this).attr("data");
});

$("#addMore").on("click", function() {
    displayGif(current);
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

});