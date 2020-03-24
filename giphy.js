
// create an array with initial values of buttons I want to be displayed by default
var topic = ["Harry Potter", "Hermione Granger", "Ron Weasley"];

// function to query the gif website whenever a button is clicked on the page.
function displayGif() {

    var character = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&limit=10" + "&rating=g" + "&apikey=DEmjiTN7d8LF22QWBRFgQZ277D9hik3T";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data

        for (var i = 0; results.length; i++) {

            //on page load, the image loaded will be still

            var imageURL = response.data[i].images.fixed_height_still.url;
            
            var animateImgURL = response.data[i].images.fixed_height.url;
            
            var stillURL = response.data[i].images.fixed_height_still.url;
            
            var newLine = $("<p>");

            var newLineImg = $("<p>");

            var gifImage = $("<img>");
            gifImage.attr({ "src": imageURL, "data-animate": animateImgURL, "data-still": stillURL, "data-state": "still", "class": "gif" });

            newLine.append("Rating: " + response.data[i].rating);
            newLineImg.append(gifImage);

            $(".results").prepend(newLine);
            $(".results").prepend(newLineImg);
        }

    });
}

// create a function to create the buttons for the values in the object topic

function createButtons() {

    $("#char-buttons").empty();

    for (var i = 0; i < topic.length; i++) {
        var button = $("<button>");
        button.attr({ "class": "gif-button", "value": topic[i] });
        console.log(button);
        button.text(topic[i]);
        $("#char-buttons").append(button);
    }

}
createButtons();


// Created a function to create a button when the user searches for something
$(".search-btn").on("click", function (event) {
    event.preventDefault();
    //$(".image-results").empty(); I was trying to clear the page of every gif

    var charSearch = $("#char-input").val().trim();
    topic.push(charSearch);
    createButtons();

});

// start the click event listener - pull gifs - whenever any of the buttons are clicked
$(document).on("click", ".gif-button", displayGif);

// whenever any image is clicked change it's status
$(document).on("click", ".gif", function (event) {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

