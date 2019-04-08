var topics = ["Michael Jordan", "Steve Urkel", "Deion Sanders", "AC Slater", "X-Men", "Ken Griffey Jr.", "Corey Matthews", "Friends", "Seinfeld"];

// Creates the buttons
$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        $("#topic-buttons").append("<button type='button' onclick='findGifs(\"" + topics[i] + "\")' class='topics' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
});

// Outputs gifs based on the topic that was clicked
function topicClicked() {
    var userInput = $('#topic-input').val();
    findGifs(userInput);
}

// Creates a new topic when the user enters it and clicks submit
function newTopic() {
    var userInput = $('#topic-input').val();

    if (userInput) {
        $('#topic-buttons').append("<button type='button' onclick='findGifs(\"" + userInput + "\")' class='topics' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function reset() {
    $('#topic-buttons').empty();
}
// Finds the GIF via searching the API
function findGifs(gifTopic) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifTopic + '&api_key=NL6DAUDxGSQ6ilQmD6V1libUyiIDmyhD&limit=10',
        type: 'GET',
    })
        .done(function (response) {
            showGif(response);
        })
}


// Shows the GIFs
function showGif(response) {
    $('#gifs').empty();
    for (var i = 0; i < response.data.length; i++) {

        if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {

        var rating = "<div id='ratings'> Rating:  " + (response.data[i].rating) + "<br> </div>";
        var image = rating + '<br> <img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-stop=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-play=" ' + response.data[i].images.fixed_height.url + '" data-state="stop" class="playImage" style= "width:260px; height:240px">';

        image = '<div class="col-md-6">' + image + "</div>";
        $('#gifs').append(image);
        }

    }

    // Stops and plays the GIFs
    $('.playImage').on('click', function () {
        var stopPlay = $(this).attr('data-state');

        if (stopPlay == 'stop') {
            $(this).attr('src', $(this).attr("data-play"));
            $(this).attr('data-state', 'play');
        } else {
            $(this).attr('src', $(this).attr("data-stop"));
            $(this).attr('data-state', 'stop');
        }

    });
}