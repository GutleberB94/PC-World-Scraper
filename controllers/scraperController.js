var express = require("express");

var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Require all models
//var db = require("./models");

router.get("/", (req, res) => {

    res.render("index")
})

// A GET route for scraping the echoJS website
router.get("/scrape", function (req, res) {

    axios.get("https://www.pcworld.com/news/").then(response => {

        var $ = cheerio.load(response.data);

        let articles = $(".landing-listing")

        console.log(articles.children.html())

        $("excerpts p").each(function(i, element) {
            // Save an empty result object
            var result = {};

        });
        // Send a message to the client
        res.send("Scrape Complete");
    });
});


// Export routes for server.js to use
module.exports = router;