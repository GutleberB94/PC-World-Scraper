var express = require("express");

var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Require all models
var db = require("../models");

router.get("/", (req, res) => {

    res.render("index")
})

// A GET route for scraping the PC-World website
router.get("/scrape", (req, res) => {


    axios.get("https://www.pcworld.com/news/").then(response => {

        let $ = cheerio.load(response.data);

        let articles = $(".landing-listing")

        $(".excerpt-text").each(function (i, element) {
            // Save an empty result object
            var result = {};

            result.headline = $(this)
            .children('.crawl-headline')
            .text();

            result.summary = $(this)
            .children('.crawl-summary')
            .text();

            result.url = $(this)
            .children('.crawl-headline')
            .attr("href")

            console.log("URL " + result.url)
            console.log("Headline " + result.headline)
            console.log("summary " + result.summary)

            db.Article.create(result)
            .then((dbArticle) => {
                console.log(dbArticle);
            })
            .catch((err) => {
                console.log(err);
            })

        });
        // Send a message to the client
        res.send("Scrape Complete");
    });
});


// Export routes for server.js to use
module.exports = router;