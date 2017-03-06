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
      
});

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