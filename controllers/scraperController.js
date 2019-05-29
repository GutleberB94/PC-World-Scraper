var express = require("express");
var mongoose = require("mongoose");
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
                .text()
                .replace(/\s\s+/g, '');

            result.summary = $(this)
                .children('.crawl-summary')
                .text()
                .replace(/\s\s+/g, '');

            result.url = $(this)
                .children('.crawl-headline')             // does not grab the url for some reason
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

// get all articles route
router.get("/api/articles", (req, res) => {
    db.Article.find({})
        .then((dbArticle) => {
            res.json(dbArticle);
        })
        .catch((err) => {
            res.json(err);
        });
});


// route to get specific artilce with comments
router.get("/api/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
        .populate("comment")
        .then((dbArticle) => {
            res.json(dbArticle);
        })
        .catch((err) => {
            res.json(err);
        });
});

// route to update an articles comment
router.post("/api/articles/:id", (req, res) => {
    db.Comment.create(req.body)
        .then((dbComment) => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        })
        .then((dbArticle) => {
            res.json(dbArticle);
        })
        .catch((err) => {
            res.json(err);
        });
})


// Export routes for server.js to use
module.exports = router;