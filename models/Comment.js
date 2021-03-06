const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    title: String,
    body: String
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment