
    var firedButton;
    var animals = ["Narwhal", "Wolf", "Dinosaur", "Unicorn"];
    var queryURL
    $(".container2").hide();

    $("#submit").on("click", function () {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        var keyword = $("#input").val().trim();
        animals.push(keyword);
        renderButtons();
    });
    renderButtons();

    $("#moreGifs").on("click", function () {
        $("#gifs-appear-here").empty();
        console.log(firedButton);
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            firedButton + "&api_key=dc6zaTOxFJmzC&limit=10& offset=20";
        runAjax();
    });

    $(document).on("click", ".animalButton", function () {
        firedButton = $(this).attr("data-animal");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            firedButton + "&api_key=dc6zaTOxFJmzC&limit=10";
        $("#gifs-appear-here").empty();
        runAjax();
        $(".container2").show();

    });
    function runAjax() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class='display'>");
                var rating = $("<p>" + "Rating: " + results[i].rating + "</p>");
                var animalImage = $("<img class='gif' data-state='still'>");
                var animalImageMove = results[i].images.fixed_height.url;
                var animalImageStill = results[i].images.fixed_height_still.url;
                animalImage.attr('src', animalImageStill);
                animalImage.attr('data-animate', animalImageMove);
                animalImage.attr("data-still", animalImageStill);
                $(animalDiv).append(rating);
                $(animalDiv).append(animalImage);
                $("#gifs-appear-here").append(animalDiv);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    };
    function renderButtons() {
        // (this is necessary otherwise we will have repeat buttons)
        $("#addnewbuttons").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
            var newButton = $("<button type='button'>");
            newButton.attr("data-animal", animals[i]);

            newButton.addClass("btn btn-danger animalButton");
            newButton.text(animals[i]);
            // Adding the button to the HTML
            $("#addnewbuttons").append(newButton);
        }
    }
