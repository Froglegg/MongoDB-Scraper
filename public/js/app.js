$(document).on("click", ".addNoteButton", function() {
  // Grab the id associated with the article from the submit button
  let thisId = $(this).attr("data-id");

  // show the noteTaker with the same data id
  $(`.noteTaker[data-id=${thisId}]`).show();

  // Switch out class and text for button
  $(this).attr("class", "saveNoteButton");
  $(this).text("Save Note");
});

// When you click the savenote button
$(document).on("click", ".saveNoteButton", function() {
  // Grab the id associated with the article from the submit button
  let thisId = $(this).attr("data-id");
  let bodyInput = $(`.bodyInput[data-id=${thisId}]`).val();
  let titleInput = $(`.titleInput[data-id=${thisId}]`).val();
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/api/articles/" + thisId,
    data: {
      // Value taken from title input
      title: titleInput,
      // Value taken from note textarea
      body: bodyInput
    }
  })
    // With that done
    .then(function(data) {
      // hide note taker, revert button class and text, add text into note area
      $(`.noteTaker[data-id=${thisId}]`).hide();
      $(this).attr("class", "addNoteButton");
      $(`.noteAreaTitle[data-id=${thisId}]`).text(titleInput);
      $(`.noteAreaBody[data-id=${thisId}]`).text(bodyInput);
    });
});

// When you click the Save Article button
$(document).on("click", ".saveButton", function() {
  console.log("clicked");
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
      $(`.saveButton[data-id=${thisId}]`).css("pointer-events", "none");
      $(`.saveButton[data-id=${thisId}]`).text("Saved!");
    });
});
