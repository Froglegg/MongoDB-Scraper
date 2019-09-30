// When you click the create Note button 
$(document).on("click", "#createNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    $(`#note[data-id=${thisId}]`).show();
    // Change the id to save note
    $(this).attr("id", "saveNote");
    $(this).text("Save Note");
});

// When you click the savenote button
$(document).on("click", "#saveNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var bodyInput = $("#bodyInput").val();
    var titleInput = $("#titleInput").val();
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/api/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleInput").val(),
                // Value taken from note textarea
                body: $("#bodyInput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // hide note taker, revert button id, add text into note area 
            $(`#noteTaker[data-id=${thisId}]`).hide();
            $(this).attr("id", "createNote");
            $(`#noteAreaTitle[data-id=${thisId}]`).text(titleInput);
            $(`#noteAreaBody[data-id=${thisId}]`).text(bodyInput);
        });
});

// When you click the Save Article button 
$(document).on("click", "#saveArticle", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/api/articles/save/" + thisId,
            data: {
                // Value taken from title input
                saved: true
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $(this).css("pointer-events", "none");
            $(this).text("Saved!");
        });
});