$.getJSON("/api/articles", (data) => {

    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "<br />"+ data[i].url + "</p>");
      }
})