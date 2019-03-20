var topics = ["hockey", "music", "ice cream", "pizza", "puppies", "sleeping", "fitness"];

renderButtons();

function renderButtons() {
  $("#buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button class='btn-primary'>");

    a.addClass("newGIF");

    a.attr("data-GIF", topics[i]);

    a.text(topics[i]);

    $("#buttons").append(a);
  }
};

$(document).ready(function () {
  $("#buttons").on("click", ".newGIF", function () {
    var newGIF = $(this).attr("data-GIF");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      newGIF + "&api_key=R8SWqmQ7gOHNVXJrb1FXEf7jKgw2QAxd&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .done(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='gifContent'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var GIPHY = $("<img>");
          GIPHY.attr("class", "gif");
          GIPHY.attr("src", results[i].images.fixed_height_still.url);
          GIPHY.attr("data-still", results[i].images.fixed_height_still.url);
          GIPHY.attr("data-animate", results[i].images.fixed_height.url);
          GIPHY.attr("data-state", "still");
          gifDiv.append(GIPHY);
          gifDiv.append(p);
          $("#gifsDisplay").prepend(gifDiv);
        }
      });
  });

  $('.btn-primary').on('click', function(){
    $("gifContent").remove();
});

  $(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  });

  $("#GiphyAdder").on("click", function () {
    var newGIF = $("#addGiphy").val();

    if (newGIF !== "") {
      topics.push(newGIF);
      renderButtons();
    };
  });
});