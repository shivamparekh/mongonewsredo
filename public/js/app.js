$.getJSON("/articles", function(data) {

  for (var i = 0; i < data.length; i++) {

    $("#articles").append("<p data-id='" + 
      data[i]._id + "'>" + 
      data[i].title + "<br />" + 
      data[i].link + "</p>");

  }
});


// when the user clicks th grabbed p tag

$(document).on("click", "p", function() {

  $("#comments").empty();

  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article

  $.ajax({

    method: "GET",
    url: "/article/" + thisId

  })

    .done(function(data) {

      console.log(data);

      // The title of the article

      $("#comments").append("<h2>" + data.title + "</h2>");

      $("#comments").append("<input id='titleinput' name='title' >");

      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");

      $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      $("#comments").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      if (data.comments) {

        $("#titleinput").val(data.note.title);

        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button

$(document).on("click", "#savecomment", function() {

  var thisId = $(this).attr("data-id");

  $.ajax({

    method: "POST",
    url: "/articlee/" + thisId,
    data: {

      title: $("#titleinput").val(),
     
      body: $("#bodyinput").val()

    }
  })

    .done(function(data) {
 
      console.log(data);

      $("#comments").empty();

    });

  $("#titleinput").val("");

  $("#bodyinput").val("");

});

$(document).on("click", "#deletecomment", function() {

  var thisId = $(this).attr("data-id");

  $.ajax({

    method: "POST",
    url: "/article/" + thisId,
    data: {
   
      title: $("#titleinput").val(),
  
      body: $("#bodyinput").val()
    }
  })

    .done(function(data) {

      console.log(data);

      $("#comments").empty();

    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
  
});