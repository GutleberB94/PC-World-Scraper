const mongoose = require("mongoose");

const Schmea = mongoose.Schema;

let ArticleSchema = new Schema({


    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: false
    },

    comment: {
        type: Schema.types.ObjectId,
        ref: "Comment"
    }

});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Artcile